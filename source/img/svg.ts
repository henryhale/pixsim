import { getDisplayProps } from "./helpers"
import { downloadBlob, range } from "../common"
import type { IDisplayUnit } from "../core"

export function generateSVG(display: IDisplayUnit) {
	const  { fillOn, fillOff, stroke, pixelMargin, size, collapsed, bitmap } = getDisplayProps(display)
	
	// generate svg
	let pixels = '', px = 0, py = 0
	const q = pixelMargin * size
	for (const y of range(bitmap.length)) {
		const row = bitmap[y]
		for (const x of range(row.length)) {
			px = x * size
			py = y * size
			if (collapsed) {
				px += q
				py += q
			}
			const fill = row[x] ? fillOn : fillOff
			const sborder = `stroke="${stroke}" stroke-width="1"`
			pixels += `<rect x="${px}" y="${py}" fill="${fill}" width="${size * (collapsed ? (1 - pixelMargin) : 1)}" height="${size * (collapsed ? (1 - pixelMargin) : 1)}" ${collapsed ? sborder : ''} />`
		}
	}

 return `<svg width="${px + size}" height="${py + size}" xmlns="http://www.w3.org/2000/svg">${pixels}</svg>`
}

export function downloadSVG(svg = "") {
	const blob = new Blob([svg], { type: "image/svg+xml" })
	downloadBlob('pixsim-bitmap.svg', blob)
}