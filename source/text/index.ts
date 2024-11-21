import { charsetMap } from "../font/charset";
import { Font } from "../font/type";

export function renderText(text: string, x: number, y: number, font: Font): string[] {
	text = text.toUpperCase()

	const result: string[] = [`MOVX ${x}`, `MOVY ${y}`]
	
	function printCharacter(codes: number[][]) {
		for(const row of codes) {
			for(const col of row) {
				result.push(`SET ${col == 0 ? 0 : 1}`, 'ADDX 1')
			}
			result.push('ADDY 1')
		}
	}

	for (const char of text) {
		const bin = charsetMap.get(char)
		if (bin) {
			const bitmap = JSON.parse(font.codes[bin])
			printCharacter(bitmap)
		} else {
			// print blank space or box or something
			// printCharacter(unknown character)
		}
	}

	return result
}