export function h<T extends HTMLElement>(tag: string, html?: string): T {
	const el = document.createElement(tag)
	if (html) el.innerHTML = html
	return el as T
}

export function $<T extends HTMLElement>(sel: string): T | null {
	return document.querySelector(sel)
}