import { $, THEMES, createUUID, h, inBound, int, limit, range } from "../common/index"
import { MAX_COLS, MAX_ROWS, MAX_SIZE, defineConfig, type IConfig, type IOptions } from "./config"

export interface IDisplayUnit {
	bitmap: number[][]
	rows: number
	cols: number
	size: number
	collapsed: boolean
	container: HTMLElement
	set(x: number, y: number, value: boolean): void
	reset(value: boolean): void
	invert(): void
	export(): string
	import(json: string): void
}

type PixelGrid = boolean[][]

function initGrid(rows: number, cols: number): PixelGrid {
	return new Array(rows).fill(null).map(() => new Array(cols).fill(false))
}

function findNextElement(key: string, x: number, y: number, rows: number, cols: number): string | null {
	let id = null
	if (key === 'ArrowUp') {
		if (y - 1 == -1) {
			id = `${rows - 1}-${x}`
		} else {
			id = `${y - 1}-${x}`
		}
	}
	if (key === 'ArrowDown') {
		if (y + 1 == rows) {
			id = `0-${x}`
		} else {
			id = `${y + 1}-${x}`
		}
	}
	if (key === 'ArrowLeft') {
		if (x - 1 == -1) {
			id = `${y}-${cols - 1}`
		} else {
			id = `${y}-${x - 1}`
		}
	}
	if (key === 'ArrowRight') {
		if (x + 1 == cols) {
			id = `${y}-0`
		} else {
			id = `${y}-${x + 1}`
		}
	}

	return id
}

export default class DisplayUnit implements IDisplayUnit {
	private tid: string
	private state: IConfig
	private pixels: PixelGrid
	public container!: HTMLElement
	private table!: HTMLTableElement
	constructor(target: HTMLElement, options: IOptions) {
		this.tid = createUUID()
		this.state = defineConfig(options)
		this.pixels = initGrid(this.state.rows, this.state.cols)
		this.render(target)
	}
	private render(target: HTMLElement) {
		const root = target instanceof HTMLElement ? target : document.body

		const container = h('div')
		const table = h<HTMLTableElement>('table')
		const controls = h('div')

		controls.classList.add('controls')
		container.classList.add('pixsim', this.state.theme)
		container.append(table, controls)
		root.append(container)

		this.container = container
		this.table = table

		this.renderPixels()
		if (this.state.controls) {
			controls.append(...this.initControls())
		}
	}
	private initControls(): HTMLElement[] {
		const labelrow = h('label', '<span>Rows:&nbsp;</span>')
		const inputrow = h<HTMLInputElement>('input')
		inputrow.type = 'number'
		inputrow.step = '1'
		inputrow.min = '0'
		inputrow.max = '1024'
		inputrow.value = '' + this.state.rows
		labelrow.append(inputrow)

		const labelcol = h('label', '<span>Cols:&nbsp;</span>')
		const inputcol = h<HTMLInputElement>('input')
		inputcol.type = 'number'
		inputcol.step = '1'
		inputcol.min = '1'
		inputcol.max = '1024'
		inputcol.value = '' + this.state.cols
		labelcol.append(inputcol)

		const labelsize = h('label', '<span>Size:&nbsp;</span>')
		const inputsize = h<HTMLInputElement>('input')
		inputsize.type = 'number'
		inputsize.step = '1'
		inputsize.min = '1'
		inputsize.max = '50'
		inputsize.value = '' + this.state.size
		labelsize.append(inputsize)

		const labeltheme = h('label')
		labeltheme.title = "Select theme"
		const inputtheme = h<HTMLSelectElement>('select', THEMES.map(x => `<option value="${x}">${x}</option>`).join(''))
		inputtheme.value = this.state.theme
		labeltheme.append(inputtheme)

		const labelcollapse = h('label', '<span>Collapse&nbsp;</span>')
		const inputcollapse = h<HTMLInputElement>('input')
		inputcollapse.type = 'checkbox'
		if (this.state.collapse) inputcollapse.checked = this.state.collapse
		labelcollapse.append(inputcollapse)

		const btns = h('label')
		const invert = h('button', 'invert')
		invert.setAttribute('type', 'button')
		const clrscr = h('button', 'reset')
		clrscr.setAttribute('type', 'button')
		btns.append(invert, h('span', '&nbsp;&nbsp;'), clrscr)

		// events
		inputcol.oninput = () => inputcol.value = limit(int(inputcol.value, this.state.cols), 1, MAX_COLS).toString()
		inputrow.oninput = () => inputrow.value = limit(int(inputrow.value, this.state.rows), 1, MAX_ROWS).toString()

		let refreshID: number | undefined
		const redrawGrid = () => {
			this.pixels = initGrid(this.state.rows, this.state.cols)
			if (refreshID !== undefined) clearTimeout(refreshID)
			refreshID = setTimeout(() => this.renderPixels(), 1000) 
		}

		inputcol.onchange = () => {
			this.state.cols = int(inputcol.value, this.state.cols)
			redrawGrid()
		}
		inputrow.onchange = () => {
			this.state.rows = int(inputrow.value, this.state.rows)
			redrawGrid()
		}

		inputsize.oninput = () => inputsize.value = limit(int(inputsize.value, this.state.size), 1, MAX_SIZE).toString()
		inputsize.onchange = () => {
			const size = int(inputsize.value)
			this.container.style.setProperty('--pixel-size', size + 'px')
			this.state.size = size
		}

		inputtheme.onchange = () => {
			this.container.className = 'pixsim ' + inputtheme.value
			this.state.theme = inputtheme.value
		}

		inputcollapse.onchange = () => {
			this.table.style.borderCollapse = inputcollapse.checked ? "collapse" : "separate"
			this.state.collapse = inputcollapse.checked
		}

		clrscr.onclick = () => this.reset()
		invert.onclick = () => this.invert()

		return [labelcol, labelrow, labeltheme, labelsize, labelcollapse, btns]
	}
	private renderPixels() {
		this.table.innerHTML = ''
		this.table.style.borderCollapse = this.state.collapse ? "collapse" : "separate"
		this.container.style.setProperty('--pixel-size', this.state.size + 'px')
		
		const rows = this.state.rows
		const cols = this.state.cols
		
		for (const y of range(rows)) {
			const tr = h('tr')
			for (const x of range(cols)) {
				const td = h('td', '&nbsp;')
				td.id = `${this.tid}-${y}-${x}`
				tr.append(td)
				this.update(td, this.pixels[y][x])
				if (!this.state.active) continue
				td.setAttribute('tabindex', '0')
				td.setAttribute('role', 'button')
				td.classList.add('active')
				td.onclick = () => {
					setTimeout(() => {
						this.set(x, y, !this.pixels[y][x])
					})
				}
				td.onkeydown = (ev) => {
					const key = ev.key
					if (key === 'Enter' || key === ' ') {
						ev.preventDefault()
						td.click()
					}
					const elid = findNextElement(key, x, y, rows, cols)
					const el = $(`#${this.tid}-${elid}`)
					if (el instanceof HTMLElement) {
						ev.preventDefault()
						el.focus()
					}
				}
			}
			this.table.append(tr)
		}
	}
	private update(pixel: Element, value: boolean) {
		if (value) {
			pixel.classList.add('on')
		} else {
			pixel.classList.remove('on')
		}
	}
	set(x: number, y: number, value: boolean) {
		if (!inBound(x, 0, this.state.cols)) return
		if (!inBound(y, 0, this.state.rows)) return
		value = !!value
		this.pixels[y][x] = value
		const pel = this.table.children[y].children[x]
		if (pel) this.update(pel, value)
	}
	reset(value = false) {
		this.pixels.forEach((row, y) => {
			row.forEach((_, x) => {
				setTimeout(() => this.set(x, y, !!value))
			})
		})
	}
	invert() {
		this.pixels.forEach((row, y) => {
			row.forEach((value, x) => {
				setTimeout(() => this.set(x, y, !value))
			})
		})
	}
	get bitmap() {
		return this.pixels.map(row => row.map(x => x ? 1 : 0))
	}
	export(): string {
		return JSON.stringify(this.bitmap)
	}
	import(json: string) {
		this.pixels = JSON.parse(json)
		this.state.rows = this.pixels.length
		this.state.cols = this.pixels[0].length
		this.renderPixels()
	}
	get rows() {
		return this.state.rows
	}
	get cols() {
		return this.state.cols
	}
	get size() {
		return this.state.size
	}
	get collapsed() {
		return this.state.collapse
	}
}

