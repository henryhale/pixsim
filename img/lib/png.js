import { getGridProps, downloadBlob } from "./helpers"
import { range } from "../../shared"

export async function generatePNG(grid) {
	const { size, collapsed, fillOn, fillOff, stroke, bitmap: bm, pixelMargin: pm } = getGridProps(grid)

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
			console.log(px,py,pd,width,height)
			renderQueue.push({
				px,
				py,
				pw: pd,
				ph: pd, 
				fill: row[x] ? fillOn : fillOff,
				stroke: collapsed ? false : stroke
			})
		}
	}

	console.log('width: ', width, 'height: ', height)

	// use offscreen canvas to generate an image
	const canvas = new OffscreenCanvas(width, height)

	// clear canvas
	const ctx = canvas.getContext('2d')
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

export function downloadPNG(blob) {
	// document.body.innerHTML += `<img src='${img}' alt='not found' />`
	downloadBlob('pixsim-bitmap.png', blob)
}