import { int, range } from "../common"
import { tokenize } from "./tokenize"
import { bresenham } from "./helpers"


const MACRO_ID = '@'

export type IMacros = Record<string, (...args: number[]) => string[]>

export function isMacro(line: string): boolean {
	return line.startsWith(MACRO_ID)
}

export function expandMacros(line: string): string[] {
	const args = tokenize(line.slice(1))
	const macro = (args.shift() || '').toUpperCase()
	if (macros[macro]) {
		return macros[macro](...args.map(x => int(x)))
	}
	return []
}

export const macros: IMacros = {
	CLEARRECT: (x, y, w, h) => {
		const result: string[] = []
		for (const j of range(h)) {
			result.push(`MOVY ${y+j}`)
			for(const i of range(w)) {
				result.push(`MOVX ${x+i}`, 'SET 0')
			}
		}
		return result
	},
	FILLRECT: (x, y, w, h) => {
		const result: string[] = []
		for (const j of range(h)) {
			result.push(`MOVY ${y+j}`)
			for(const i of range(w)) {
				result.push(`MOVX ${x+i}`, 'SET 1')
			}
		}
		return result
	},
	STROKERECT: (x, y, w, h) => {
		const result: string[] = []
		for (const j of range(h)) {
			result.push(`MOVY ${y+j}`)
			for(const i of range(w)) {
				if (i == 0 || i == w - 1 || j == 0 || j == h - 1) {
					result.push(`MOVX ${x+i}`, 'SET 1')
				}
			}
		}
		return result
	},
	DRAWLINE: (x0, y0, x1, y1) => {
		const result: string[] = []
		const points = bresenham(x0, y0, x1, y1)
		for (const [x,y] of points) {
			result.push(`MOVX ${x}`, `MOVY ${y}`, 'SET 1')
		}
		return result
	}
}
