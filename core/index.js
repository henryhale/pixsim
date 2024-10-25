import { $, THEMES, createUUID, h, inBound, limit, range, ref, watch } from "../shared";
import { defineConfig } from "./config";
import { MAX_COLS, MAX_ROWS, MAX_SIZE } from "./consts";

export function createGrid(options) {
	const state = defineConfig(options)
	const grid = {}
	const tid = createUUID()
	const html = {
		container: null,
		table: null,
		error: null,
	}

	if (!state.root) state.root = document.body

	const errMsg = ref(null)

	function $init(reset = false) {
		if (reset) {
			const old = state.root?.querySelector('#' + tid)
			if (reset && old) {
				old.parentElement.removeChild(old)
			}
		}

		const container = h('div')
		html.container = container
		container.id = tid
		container.classList.add('pixsim')
		container.style.setProperty('--pixel-size', state.size.value + 'px')

		const errbox = h('div')
		errbox.classList.add('error')
		html.error = errbox
		container.append(errbox)

		if (state.theme.value) container.classList.add(state.theme.value)

		if (state.controls.value) $initControls()

		setTimeout($initTable)

		state.root.append(container)
	}

	function $toggle(id) {
		setTimeout(() => {
			grid[id].value = !grid[id].value
		})
	}

	function $update(el, id) {
		if (grid[id].value) {
			el.classList.add('on')
		} else {
			el.classList.remove('on')
		}
	}

	function $initTable() {
		const table = h('table')

		for (const y of range(state.rows.value)) {
			const tr = h('tr')
			for (const x of range(state.cols.value)) {
				const td = h('td', '&nbsp;')
				const id = `p${y}-${x}`
				td.setAttribute('id', id)
				td.setAttribute('tabindex', '0')
				td.setAttribute('role', 'button')
				grid[id] = ref(false)
				watch(() => $update(td, id))
				if (state.active.value) {
					td.classList.add('active')
					td.onclick = () => $toggle(id)
					td.onkeydown = (ev) => {
						const key = ev.key
						if (key === 'Enter' || key === ' ') {
							ev.preventDefault()
							return td.click()
						}
						let nextEl = null
						if (key === 'ArrowUp') {
							if (y - 1 == -1) {
								nextEl = `p${state.rows.value - 1}-${x}`
							} else {
								nextEl = `p${y - 1}-${x}`
							}
						}
						if (key === 'ArrowDown') {
							if (y + 1 == state.rows.value) {
								nextEl = `p0-${x}`
							} else {
								nextEl = `p${y + 1}-${x}`
							}
						}
						if (key === 'ArrowLeft') {
							if (x - 1 == -1) {
								nextEl = `p${y}-${state.cols.value - 1}`
							} else {
								nextEl = `p${y}-${x - 1}`
							}
						}
						if (key === 'ArrowRight') {
							if (x + 1 == state.cols.value) {
								nextEl = `p${y}-0`
							} else {
								nextEl = `p${y}-${x + 1}`
							}
						}
						if (nextEl) {
							ev.preventDefault()
							$('#' + nextEl)?.focus()
						}
					}
				}
				tr.append(td)
			}
			table.append(tr)
		}

		const div = h('div')
		div.append(table)
		html.container.append(table)

		watch(() => {
			if (state.collapse.value) {
				table.style.borderCollapse = "collapse";
			} else {
				table.style.borderCollapse = "separate";
			}
		})
	}

	function $initControls() {
		const div = h('div')
		div.classList.add('controls')

		const labelrow = h('label', '<span>Rows:&nbsp;</span>')
		const inputrow = h('input')
		inputrow.setAttribute('type', 'number')
		inputrow.setAttribute('step', '1')
		inputrow.setAttribute('min', '0')
		inputrow.setAttribute('max', '1024')
		inputrow.setAttribute('value', state.rows.value)
		labelrow.append(inputrow)

		const labelcol = h('label', '<span>Cols:&nbsp;</span>')
		const inputcol = h('input')
		inputcol.setAttribute('type', 'number')
		inputcol.setAttribute('step', '1')
		inputcol.setAttribute('min', '1')
		inputcol.setAttribute('max', '1024')
		inputcol.setAttribute('value', state.cols.value)
		labelcol.append(inputcol)

		const labelsize = h('label', '<span>Size:&nbsp;</span>')
		const inputsize = h('input')
		inputsize.setAttribute('type', 'number')
		inputsize.setAttribute('step', '1')
		inputsize.setAttribute('min', '1')
		inputsize.setAttribute('max', '50')
		inputsize.setAttribute('value', state.size.value)
		labelsize.append(inputsize)

		const labeltheme = h('label')
		labeltheme.title = "Select theme"
		const inputtheme = h('select', THEMES.map(x => `<option value="${x}">${x}</option>`).join(''))
		if (state.theme.value) inputtheme.value = state.theme.value
		labeltheme.append(inputtheme)

		const labelcollapse = h('label', '<span>Collapse&nbsp;</span>')
		const inputcollapse = h('input')
		inputcollapse.setAttribute('type', 'checkbox')
		inputcollapse.checked = state.collapse.value
		labelcollapse.append(inputcollapse)

		const btns = h('label')
		const invert = h('button', 'invert')
		invert.setAttribute('type', 'button')
		const clrscr = h('button', 'clrscr')
		clrscr.setAttribute('type', 'button')
		btns.append(invert, h('span', '&nbsp;&nbsp;'), clrscr)

		div.append(labelrow, labelcol, labeltheme, labelsize, labelcollapse, btns)

		html.container.append(div)

		// events
		inputcol.oninput = () => inputcol.value = limit(inputcol.value, 1, MAX_COLS)
		inputcol.onchange = () => state.cols.value = parseInt(inputcol.value, 10)
		inputrow.oninput = () => inputrow.value = limit(inputrow.value, 1, MAX_ROWS)
		inputrow.onchange = () => state.rows.value = parseInt(inputrow.value, 10)
		inputsize.oninput = () => inputsize.value = limit(inputsize.value, 1, MAX_SIZE)
		inputsize.onchange = () => state.size.value = parseInt(inputsize.value, 10)
		inputtheme.onchange = () => state.theme.value = inputtheme.value
		inputcollapse.onchange = () => state.collapse.value = inputcollapse.checked
		clrscr.onclick = () => resetGrid()
		invert.onclick = () => invertGrid()
	}

	function resetGrid(value = false) {
		for (const id of Object.keys(grid)) {
			setTimeout(() => grid[id].value = !!value)
		}
	}

	function invertGrid() {
		for (const id of Object.keys(grid)) {
			setTimeout(() => grid[id].value = !grid[id].value)
		}
	}

	function set(col, row, value) {
		// console.log(col, row, value)
		if (!inBound(col, 0, state.cols.value)) return
		if (!inBound(row, 0, state.rows.value)) return
		const id = `p${row}-${col}`
		grid[id].value = !!value
	}

	function bitmap() {
		const result = []
		for (const y of range(state.rows.value)) {
			const row = []
			for (const x of range(state.cols.value)) {
				const id = `p${y}-${x}`
				row.push(grid[id].value ? 1 : 0)
			}
			result.push(row)
		}
		return result
	}

	function importSavedBitmap(s, resize = false) {
		const values = s.split(',').map(x => x.split('').map(Number))
		const w = values[0].length
		const setvalues = () => {
			for (let y = 0; y < values.length; y++) {
				for (let x = 0; x < w; x++) {
					set(x, y, values[y][x])
				}
			}
		}

		if (resize) {
			state.cols.value = w
			state.rows.value = values.length
			setTimeout(setvalues, 1000);
		} else {
			setvalues()
		}
	}

	watch(() => {
		const m = errMsg.value
		if (m) {
			console.error('pixsim:', m)
			html.error.style.display = 'block'
			html.error.textContent = m
			setTimeout(() => html.error.style.display = 'none', 5000)
		}
	})

	let refreshID = null
	watch(() => {
		const r = state.rows.value
		const c = state.cols.value
		if (Number.isNaN(r) || Number.isNaN(c) || r < 1 || c < 1) {
			errMsg.value = "invalid rows/cols size"
			return
		}
		if (refreshID != null) clearTimeout(refreshID)
		refreshID = setTimeout(() => $init(true), 1000);
	})

	watch(() => {
		const colorTheme = state.theme.value
		if (colorTheme) {
			if (!html.container) return
			for (const c of html.container.classList.values()) {
				if (THEMES.includes(c)) {
					html.container.classList.remove(c)
					break;
				}
			}
			html.container.classList.add(colorTheme)
		}
	})

	watch(() => {
		const size = state.size.value
		if (!inBound(size, 1, 1024)) return 
		if (!html.container) return
		html.container.style.setProperty('--pixel-size', size + 'px')
	})

	return {
		get container() { return html.container },
		get cols() { return state.cols.value },
		get rows() { return state.rows.value },
		get size() { return state.size.value },
		get collapsed() { return state.collapse.value },
		reset: resetGrid,
		bitmap,
		string: () => bitmap().toString(),
		import: importSavedBitmap,
		set,
		invert: invertGrid
	}
}