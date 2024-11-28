import { int, range } from "../common"
import { tokenize } from "./tokenize"
import { bresenhamArc, bresenhamLine } from "./helpers"
import { renderText } from "../text"


const MACRO_ID = '@'

export type IMacros = Record<string, (...args: string[]) => string[]>

export function isMacro(line: string): boolean {
	return line.startsWith(MACRO_ID)
}

export function expandMacros(line: string): string[] {
	const args = tokenize(line.slice(1))
	const macro = (args.shift() || '').toUpperCase()
	if (macros[macro]) {
		return macros[macro](...args)
	}
	return []
}

export const macros: IMacros = {
	CLEARRECT: (...args) => {
		const [ x, y, w, h ] = args.map(int)
		const result: string[] = []
		for (const j of range(h)) {
			result.push(`MOVY ${y+j}`)
			for(const i of range(w)) {
				result.push(`MOVX ${x+i}`, 'SET 0')
			}
		}
		return result
	},
	FILLRECT: (...args) => {
		const [ x, y, w, h ] = args.map(int)
		const result: string[] = []
		for (const j of range(h)) {
			result.push(`MOVY ${y+j}`)
			for(const i of range(w)) {
				result.push(`MOVX ${x+i}`, 'SET 1')
			}
		}
		return result
	},
	STROKERECT: (...args) => {
		const [ x, y, w, h ] = args.map(int)
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
	DRAWLINE: (...args) => {
		const [ x0, y0, x1, y1 ] = args.map(int)
		const result: string[] = []
		const points = bresenhamLine(x0, y0, x1, y1)
		for (const [x,y] of points) {
			result.push(`MOVX ${x}`, `MOVY ${y}`, 'SET 1')
		}
		return result
	},
	STROKEARC: (...args) => {
		const [ cx, cy, r, startAngle, endAngle ] = args.map(int)
		const result: string[] = []
		const points = bresenhamArc(cx, cy, r, startAngle, endAngle)
		for (const [x,y] of points) {
			result.push(`MOVX ${x}`, `MOVY ${y}`, 'SET 1')
		}
		return result
	},
	DRAWTEXT: (...args) => {
		const result: string[] = []
		const regex = /^(\d+)\s(\d+)\s(['"])(.*?)\3$/
		const match = regex.exec(args.join(' '))
		if (match) {
			const x = int(match[1])
			const y = int(match[2])
			const text = match[4]
			result.push(...renderText(x, y, text))
		} else {
			// console.log("no match found");
		}
		return result
	}
}
