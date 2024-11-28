import { Font } from "../font/type"
import { h } from "./dom"

export function getFontFile(): Promise<Font> {
	return new Promise((resolve, reject) => {
		const inputfile = h<HTMLInputElement>('input')
		inputfile.type = 'file'
		inputfile.accept = 'application/json'
		inputfile.onchange = (ev: Event) => {
			const file = (ev.target as any).files[0]
			const reader = new FileReader()
			reader.onload = () => {
				try {
					const data = JSON.parse(reader.result as string) as Font
					resolve(data)
				} catch (error) {
					reject('invalid font file: ' + error)
				}
			}
			reader.readAsText(file, 'ascii')
		}
		inputfile.click()
	})
}