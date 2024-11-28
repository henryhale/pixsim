import { Font } from "../font/type";
import Penta from "../font/Penta.font.json"
import { $, h } from "../common";
import { getFontFile } from "../common/file";

const fonts: Map<string, Font> = new Map()

fonts.set('Penta', Penta)

let currentFont = 'Penta'

export function getCurrentFont(): Font {
	return fonts.get(currentFont) || Penta
}

function updateFontList(el: HTMLSelectElement) {
	el.innerHTML = ''
	for (const font of fonts.values()) {
		const option = h<HTMLOptionElement>('option', font.name + ` (${font.author})`)
		option.value = font.name
		el.append(option)
	}
}

export function initFontSelector() {
	const fontSelector = $<HTMLSelectElement>('#font-style')
	if (fontSelector) {
		updateFontList(fontSelector)
		fontSelector.onchange = () => {
			currentFont = fontSelector.value
		}
	}

	const fontUploader = $<HTMLButtonElement>('#font-upload')
	if (fontUploader) {
		fontUploader.onclick = async () => {
			await getFontFile()
				.then(font => {
					fonts.set(font.name, font)
					currentFont = font.name
					if (fontSelector) {
						updateFontList(fontSelector)
						fontSelector.click()
					}
				})
				.catch(console.error)
		}
	}
}
