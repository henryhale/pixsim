import { h } from "./dom"

export function downloadBlob(filename: string, blob: Blob) {
	const url = URL.createObjectURL(blob)
	try {
		const a = h<HTMLAnchorElement>('a')
		a.href = url
		a.target = '_blank'
		a.download = filename
		document.body.append(a)
		a.click()
		document.body.removeChild(a)
	} catch (e) {
		console.error(e)
	} finally {
		setTimeout(() => URL.revokeObjectURL(url))
	}
}