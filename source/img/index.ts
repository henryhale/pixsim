import { $, createUUID, h } from "../common"
import DisplayUnit from "../core"
import { generateSVG, downloadSVG } from "./svg"
import { downloadImage, generateImageBlob } from "./image"

const display = new DisplayUnit($('#img-gen')!, {
	cols: 5,
	rows: 5,
	size: 50,
	active: true,
	controls: true
})

// extras
const btnsvg = h('button', 'SVG')
btnsvg.setAttribute('type', 'button')
btnsvg.onclick = () => {
	const svg = generateSVG(display)
	downloadSVG(svg)
}

const btns = ["png","jpeg","webp"].map(x => {
	const btn = h('button', x.toUpperCase())
	btn.setAttribute('type', 'button')
	btn.onclick = async () => {
		const blob = await generateImageBlob(display, x)
		downloadImage(`pixsim-${createUUID()}.${x}`, blob)
	}
	return btn
})

$('#extras')!.append(btnsvg, ...btns)