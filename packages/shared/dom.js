export function h(tag, html) {
	const el = document.createElement(tag)
	if (html) el.innerHTML = html
	return el
}

export function $(sel) {
	return document.querySelector(sel)
}