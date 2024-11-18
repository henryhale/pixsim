import DisplayUnit from "../core"
import { $, createUUID, downloadBlob, h } from "../common"
import { ICharset, charset } from "./charset"
import { Font } from "./type"
import Penta from "./Penta.font.json"

const display = new DisplayUnit($('#root')!, {
	rows: 5,
	cols: 7,
	size: 16,
	active: true,
	controls: true
})

const font = new Map()
let cbin: string
const el = {
	save: $('#save')!,
	charset: $('#charset')!,
	char: $('#char')!,
	fontName: $<HTMLInputElement>('#fontName')!,
	fontAuthor: $<HTMLInputElement>('#fontAuthor')!,
	export: $('#export')!,
	import: $('#import')!,
	preview: $('#preview')!,
	previewArea: $('#previewArea')!,
}

function initCharset(set: ICharset[]) {
	el.charset.innerHTML = ''
	for (const x of set) {
		const c = x.char.replace(' ', '&nbsp;')
		const btn = h('button', c)
		btn.dataset.bin = x.bin
		btn.dataset.char = x.char
		btn.onclick = () => {
			cbin = btn.dataset.bin!
			el.char.textContent = btn.dataset.char!.replace(' ', 'SPACE')
			if (font.has(btn.dataset.bin)) {
				display.import(font.get(btn.dataset.bin))
			}
			window.scrollTo(0, 0)
		}
		if (x.char === ' ') btn.click()
		el.charset.append(btn)
	}
}

function loadFont(importedFont: Font) {
	const { name = '', author = '', codes = {} } = importedFont
	font.clear()
	el.fontName.value = name 
	el.fontAuthor.value = author
	charset.forEach(c => {
		if (codes[c.bin]) {
			const bitmap = codes[c.bin]
			font.set(c.bin, bitmap)
		}
	})
}

el.save.onclick = () => {
	if (!cbin) return
	const s = display.export()
	font.set(cbin, s)
}

el.export.onclick = () => {
	const name = el.fontName.value || createUUID()
	const author = el.fontAuthor.value || 'anonymous'
	const fontData: Font = {
		name,
		author,
		date: new Date().toDateString(),
		codes: [...font.entries()].reduce((x,c) => {
			x[c[0]] = c[1]
			return x
		}, {} as Record<string, string>)
	}
	const contents = JSON.stringify(fontData)
	downloadBlob(name + '.font.json', new Blob([contents], { type: "application/json" }))
}

el.import.onclick = () => {
	const inputfile = h<HTMLInputElement>('input')
	inputfile.type = 'file'
	inputfile.accept = 'application/json'
	inputfile.onchange = (ev: Event) => {
		const file = (ev.target as any).files[0]
		const reader = new FileReader()
		reader.onload = () => {
			try {
				const font = JSON.parse(reader.result as string) as Font
				loadFont(font)
			} catch (error) {
				console.error('invalid font file', error)
			}
		}
		reader.readAsText(file, 'ascii')
	}
	inputfile.click()
}

el.preview.onclick = () => {
	el.previewArea.innerHTML = ''
	el.previewArea.classList.add('characters')
	const views: HTMLElement[] = []
	for(const x of charset) {
		const box = h('div', `<div>${x.char.replace(' ', 'SPACE')}</div>`)
		if (font.has(x.bin)) {
			const d = new DisplayUnit(box, {
				size: 10,
				active: false,
				controls: false
			})
			d.import(font.get(x.bin))
		} else {
			box.append(h('div', '<i>not found</i>'))
		}
		views.push(box)
	}
	el.previewArea.append(...views)
}

// initialize character set
initCharset(charset)

// load default font - Penta
loadFont(Penta)
