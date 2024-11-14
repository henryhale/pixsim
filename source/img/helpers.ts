import type { IDisplayUnit } from "../core"

export function getCSSVar(el: HTMLElement, p: string): string {
	return getComputedStyle(el).getPropertyValue(p).trim()
}

export function getDisplayProps(display: IDisplayUnit) {
	// get theme colors: on & off
	const fillOn = getCSSVar(display.container, '--pixel-on')
	const fillOff = getCSSVar(display.container, '--pixel-off')
	const stroke = getCSSVar(display.container, '--pixel-border')

	const pixelMargin = 0.1

	const size = display.size
	const collapsed = display.lines
	const bitmap = display.bitmap

	return { fillOn, fillOff, stroke, pixelMargin, size, collapsed, bitmap }
}
