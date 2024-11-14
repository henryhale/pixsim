import { getDisplayProps } from "./helpers"
import { downloadBlob, range } from "../common"
import type { IDisplayUnit } from "../core"

export function generateSVG(display: IDisplayUnit) {
	const { size, lines: collapsed, bitmap: bm } = display
	const { fillOn, fillOff, stroke, pixelMargin: pm } = getDisplayProps(display)
	
	// generate svg
	let pixels = '', px = 0, py = 0
	for (const y of range(bm.length)) {
		const row = bm[y]
		for (const x of range(row.length)) {
			px = x * size
			py = y * size
			const q = pm * size
			px = collapsed ? px : (px + q)
			py = collapsed ? py : (py + q)
			const fill = row[x] ? fillOn : fillOff
			const sborder = `stroke="${stroke}" stroke-width="0.5"`
			pixels += `<rect x="${px}" y="${py}" fill="${fill}" width="${size * (collapsed ? 1 : (1 - pm))}" height="${size * (collapsed ? 1 : (1 - pm))}" ${collapsed ? '' : sborder} />`
		}
	}

 return `<svg width="${px + size}" height="${py + size}" xmlns="http://www.w3.org/2000/svg">${pixels}</svg>`
}

export function downloadSVG(svg = "") {
	const blob = new Blob([svg], { type: "image/svg+xml" })
	downloadBlob('pixsim-bitmap.svg', blob)
}