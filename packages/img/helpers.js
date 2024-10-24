import { h } from "../shared"

export const getCSSVar = (el, p) => {
	return getComputedStyle(el).getPropertyValue(p).trim()
}

export function getGridProps(grid) {
	const size = grid.size
	const collapsed = grid.collapsed

	// get theme colors: on & off
	const fillOn = getCSSVar(grid.container, '--pixel-on')
	const fillOff = getCSSVar(grid.container, '--pixel-off')
	const stroke = getCSSVar(grid.container, '--pixel-border')

	const bitmap = grid.bitmap()

	// dimensions
	const width = grid.cols
	const height = grid.rows
	const pixelMargin = 0.15

	return { size, collapsed, fillOn, fillOff, stroke, bitmap, width, height, pixelMargin }
}

export function downloadBlob(filename, blob) {
	const url = URL.createObjectURL(blob)
	try {
		const a = h('a')
		a.href = url
		a.target = '_blank'
		a.download = filename
		document.body.append(a)
		a.click()
		document.body.remove(a)
	} catch (e) {
		console.error(e)
	} finally {
		setTimeout(() => URL.revokeObjectURL(url))
	}
}