import { $, h } from "../common"
import DisplayUnit from "../core"
import { generateSVG, downloadSVG } from "./svg"
import { generatePNG, downloadPNG } from "./png"

const display = new DisplayUnit($('#img-gen')!, {
	cols: 5,
	rows: 5,
	size: 50,
	active: true,
	controls: true
})

// extra
const btnsvg = h('button', 'download svg')
btnsvg.setAttribute('type', 'button')
btnsvg.onclick = () => {
	const svg = generateSVG(display)
	downloadSVG(svg)
}

const btnpng = h('button', 'download png')
btnpng.setAttribute('type', 'button')
btnpng.onclick = async () => {
	const png = await generatePNG(display)
	downloadPNG(png)
}

$('#extras')!.append(btnsvg, btnpng)