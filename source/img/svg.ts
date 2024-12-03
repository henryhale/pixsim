import { getDisplayProps } from "./helpers"
import { createUUID, downloadBlob, range } from "../common"
import type { IDisplayUnit } from "../core"

export function generateSVG(display: IDisplayUnit) {
	const { fillOn, fillOff, stroke, pixelMargin, size, collapsed, bitmap } = getDisplayProps(display)

	let pixels = '', px = 0, py = 0
	const pd = size * (collapsed ? (1 - pixelMargin) : 1), q = pixelMargin * size
	for (const y of range(bitmap.length)) {
		const row = bitmap[y]
		for (const x of range(row.length)) {
			px = x * size
			py = y * size
			if (collapsed) {
				px += q
				py += q
			}
			const fill = row[x] ? `fill="${fillOn}"` : ''
			const border = collapsed ? `stroke="${stroke}" stroke-width="1"` : ''
			pixels += `<rect x="${px}" y="${py}" ${fill} ${border} />`
		}
	}

	const style = `<style>rect { width: ${pd}px; height: ${pd}px; }</style>`
	
	const svg = `<svg width="${px + size}" height="${py + size}" fill="${fillOff}" xmlns="http://www.w3.org/2000/svg">${style}${pixels}</svg>`

	return svg.replace(/\s+/g, ' ')
}

export function downloadSVG(svg = "") {
	const blob = new Blob([svg], { type: "image/svg+xml" })
	downloadBlob(`pixsim-${createUUID()}.svg`, blob)
}