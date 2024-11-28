import { getDisplayProps } from "./helpers"
import { downloadBlob, range } from "../common"
import type { IDisplayUnit } from "../core"

export async function generateImageBlob(display: IDisplayUnit, imageType: string) {
	const { fillOn, fillOff, stroke, pixelMargin, size, collapsed, bitmap } = getDisplayProps(display)

	// total canvas width is computed basing on table's border-collapse
	let border = 0.1 * size, px = 0, py = 0, pd = 0
	const q = pixelMargin * size

	// don't render yet, enqueue the pixel state
	const renderQueue = []

	for (const y of range(bitmap.length)) {
		const row = bitmap[y]
		for (const x of range(row.length)) {
			px = x * size
			py = y * size
			pd = size * (collapsed ? (1 - pixelMargin) : 1)
			if (collapsed) {
				px += q + border
				py += q + border
			}
			renderQueue.push({
				px,
				py,
				pw: pd,
				ph: pd, 
				fill: row[x] ? fillOn : fillOff,
				stroke: collapsed ? stroke : ''
			})
		}
	}

	const width = px + size + (collapsed ? border : 0)
	const height = py + size + (collapsed ? border : 0)

	// use offscreen canvas to generate an image
	const canvas = new OffscreenCanvas(width, height)
	const ctx = canvas.getContext('2d')!
	
	// render pixels
	for (const p of renderQueue) {
		ctx.save()
		ctx.beginPath()
		ctx.fillStyle = p.fill
		ctx.strokeStyle = p.stroke || p.fill
		ctx.lineWidth = 1
		ctx.rect(p.px, p.py, p.pw, p.ph)
		ctx.fill()
		ctx.stroke()
		ctx.restore()
	}

	// generate an image blob: png, jpg, webp
	const image = await canvas.convertToBlob({ type: `image/${imageType}` })
	
	return image
}

export function downloadImage(filename: string, blob: Blob) {
	// document.body.innerHTML += `<img src='${img}' alt='not found' />`
	downloadBlob(filename, blob)
}