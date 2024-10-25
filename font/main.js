import "./style.css"

import { createGrid } from "../core"
import { $, h } from "../shared"
import charset from "./lib/charset"

const cols = 16
const rows = 16

const grid = createGrid({
	rows,
	cols,
	size: 16,
	root: $('#root'),
	active: true,
	controls: true
})

let nil
setTimeout(() => {
	nil = grid.string()
}, 1000);

const inputchar = $('input')

const boxes = {}
const font = new Map()

$('#save').onclick = () => {
	const bin = inputchar.dataset.bin
	if (!bin) return
	const s = grid.string()
	font.set(bin, s)
	boxes[bin].import(s, true)
}

const box = $('#charset')
for (const x of charset) {
	const div = h('div', x.char.replace(' ', 'SPACE') + '<br>' + x.bin)
	const g = createGrid({ rows, cols, active: false, root: div })	
	boxes[x.bin] = g
	font.set(x.bin, nil)
	div.onclick = () => {
		inputchar.value = x.char
		inputchar.dataset.bin = x.bin
		grid.reset()
		grid.import(g.string())
		window.scrollTo(0,0)
	}
	box.append(div)
}

$('#export').onclick = () => {
	console.log(JSON.stringify([...font.entries()]))
}

$('#import').onclick = () => {
	console.log('import saved font')
}