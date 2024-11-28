import { charToBin } from "../font/charset"
import { getCurrentFont } from "./font"

export function renderText(x: number, y: number, text: string): string[] {
	text = text.toUpperCase()
	const font = getCurrentFont()
	const result: string[] = []
	let prevX = x
	let prevY = y
	
	function printCharacter(codes: number[][]) {
		result.push(`MOVX ${prevX}`, `MOVY ${prevY}`)
		for(const row of codes) {
			result.push(`MOVX ${prevX}`)
			for(const [i, col] of row.entries()) {
				result.push(`SET ${col == 0 ? 0 : 1}`)
				if (i + 1 < row.length) result.push('ADDX 1')
			}
			result.push(`ADDY 1`)
		}
		prevX += codes[0].length + 1
		prevY = y
	}

	for (const char of text) {
		const bin = charToBin.get(char)
		// todo: incase of unknown character - print blank space or box or something
		const bitmap = JSON.parse(font.codes[bin || '000000'])
		printCharacter(bitmap)
	}

	return result
}