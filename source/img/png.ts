import { getDisplayProps } from "./helpers"
import { downloadBlob, range } from "../common"
import type { IDisplayUnit } from "../core"

export async function generatePNG(display: IDisplayUnit) {
	const { size, lines: collapsed, bitmap: bm } = display
	const { fillOn, fillOff, stroke, pixelMargin: pm } = getDisplayProps(display)

	// total canvas width is computed basing on table's border-collapse
	let width = 0, height = 0, border = 0.1 * size
	// don't render yet, enqueue the pixel state
	const renderQueue = []

	for (const y of range(bm.length)) {
		const row = bm[y]
		for (const x of range(row.length)) {
			let px = x * size
			let py = y * size
			const q = pm * size
			let pd = size * (collapsed ? 1 : (1 - pm))
			if (collapsed) px += q
			if (collapsed) py += q
			px += border
			py += border
			pd += border
			if (y == 0) width += pd
			if (x == 0) height += pd
			renderQueue.push({
				px,
				py,
				pw: pd,
				ph: pd, 
				fill: row[x] ? fillOn : fillOff,
				stroke: collapsed ? '' : stroke
			})
		}
	}

	// use offscreen canvas to generate an image
	const canvas = new OffscreenCanvas(width, height)

	// clear canvas
	const ctx = canvas.getContext('2d')!
	ctx.clearRect(0, 0, width, height)
	// render pixels
	for (const p of renderQueue) {
		ctx.save()
		ctx.beginPath()
		ctx.fillStyle = p.fill
		ctx.strokeStyle = p.stroke || p.fill
		ctx.lineWidth = 0.01 * size
		ctx.rect(p.px, p.py, p.pw, p.ph)
		ctx.fill()
		ctx.stroke()
		ctx.restore()
	}

	// generate an image: png, jpg
	const png = await canvas.convertToBlob({ type: 'image/png' })
	// const jpg = canvas.toDataURL('image/jpg')
	
	return png
}

export function downloadPNG(blob: Blob) {
	// document.body.innerHTML += `<img src='${img}' alt='not found' />`
	downloadBlob('pixsim-bitmap.png', blob)
}