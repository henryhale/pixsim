import DisplayUnit, { type IDisplayUnit } from "../core"
import { $, createUUID, downloadBlob, h } from "../common"
import { ICharset, charset } from "./charset"

const cols = 8
const rows = 16

const display = new DisplayUnit($('#root')!, {
	rows,
	cols,
	size: 16,
	active: true,
	controls: true
})

let nil = display.export()
let cbin: string

const boxes: { [key: string]: IDisplayUnit } = {}
const font = new Map()

$('#save')!.onclick = () => {
	if (!cbin) return
	const s = display.export()
	font.set(cbin, s)
	boxes[cbin].import(s)
}

const box = $('#charset')!
initCharset(charset)

function initCharset(set: ICharset[]) {
	box.innerHTML = ''
	for (const x of set) {
		const div = h('div', x.char.replace(' ', 'SPACE') + '<br>' + x.bin)
		const d = new DisplayUnit(div, { rows, cols })
		boxes[x.bin] = d
		if (font.has(x.bin)) {
			d.import(font.get(x.bin))
		} else {
			font.set(x.bin, nil)
		}
		div.onclick = () => {
			cbin = x.bin
			$<HTMLInputElement>('#char')!.textContent = x.char.replace(' ', 'SPACE') || x.bin
			display.import(d.export())
			window.scrollTo(0, 0)
		}
		if (x.char === ' ') div.click()
		box.append(div)
	}
}

$('#export')!.onclick = () => {
	const filename = window.prompt('Enter filename: ', 'my') || createUUID()
	const contents = JSON.stringify([...font.entries()])
	downloadBlob(filename + '.font.json', new Blob([contents], { type: "application/json" }))
}

$('#import')!.onclick = () => {
	const inputfile = h<HTMLInputElement>('input')
	inputfile.type = 'file'
	inputfile.accept = 'application/json'
	inputfile.onchange = (ev: Event) => {
		const file = (ev.target as any).files[0]
		const reader = new FileReader()
		reader.onload = () => {
			const contents = JSON.parse(reader.result as string)
			font.clear()
			const entries: ICharset[] = []
			for (const [bin, bitmap] of contents) {
				font.set(bin, bitmap)
				entries.push({
					bin,
					char: ''
				})
			}
			initCharset(entries)
		}
		reader.readAsText(file, 'ascii')
	}
	inputfile.click()
}