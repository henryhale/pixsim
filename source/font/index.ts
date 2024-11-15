import DisplayUnit, { type IDisplayUnit } from "../core"
import { $, createUUID, downloadBlob, h } from "../common"
import { ICharset, charset } from "./charset"

const display = new DisplayUnit($('#root')!, {
	rows: 5,
	cols: 7,
	size: 16,
	active: true,
	controls: true
})

const font = new Map()
let cbin: string

$('#save')!.onclick = () => {
	if (!cbin) return
	const s = display.export()
	font.set(cbin, s)
}

const box = $('#charset')!
initCharset(charset)

function initCharset(set: ICharset[]) {
	box.innerHTML = ''
	for (const x of set) {
		const c = x.char.replace(' ', '&nbsp;')
		const btn = h('button', c)
		btn.dataset.bin = x.bin
		btn.dataset.char = x.char
		btn.onclick = () => {
			cbin = btn.dataset.bin!
			$('#char')!.textContent = btn.dataset.char!.replace(' ', 'SPACE')
			if (font.has(btn.dataset.bin)) {
				display.import(font.get(btn.dataset.bin))
			}
			window.scrollTo(0, 0)
		}
		if (x.char === ' ') btn.click()
		box.append(btn)
	}
}

$('#export')!.onclick = () => {
	const name = $<HTMLInputElement>('#fontname')!.value || createUUID()
	const author = $<HTMLInputElement>('#fontauthor')!.value || 'anonymous'
	const contents = JSON.stringify({
		name,
		author,
		date: new Date().toDateString(),
		codes: [...font.entries()].reduce((x,c) => {
			x[c[0]] = c[1]
			return x
		}, {} as Record<string, string>)
	})
	downloadBlob(name + '.font.json', new Blob([contents], { type: "application/json" }))
}

$('#import')!.onclick = () => {
	const inputfile = h<HTMLInputElement>('input')
	inputfile.type = 'file'
	inputfile.accept = 'application/json'
	inputfile.onchange = (ev: Event) => {
		const file = (ev.target as any).files[0]
		const reader = new FileReader()
		reader.onload = () => {
			try {
				const {name, author, codes} = JSON.parse(reader.result as string)
				font.clear()
				$<HTMLInputElement>('#fontname')!.value = name 
				$<HTMLInputElement>('#fontauthor')!.value = author
				charset.forEach(c => {
					if (codes[c.bin]) {
						const bitmap = codes[c.bin]
						font.set(c.bin, bitmap)
					}
				})
			} catch (error) {
				console.error('invalid font file', error)
			}
		}
		reader.readAsText(file, 'ascii')
	}
	inputfile.click()
}