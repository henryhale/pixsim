import { createUUID, h } from "../common"
import { generateSVG, downloadSVG } from "./svg"
import { downloadImage, generateImageBlob } from "./image"
import { IDisplayUnit } from "../core"

export function initButtons(display: IDisplayUnit): HTMLButtonElement[] {
	return ["svg","png","jpeg","webp"]
		.map(x => {
			const btn = h<HTMLButtonElement>('button', '💾 ' + x.toUpperCase())
			btn.setAttribute('type', 'button')
			
			if (x == "svg") {
				btn.onclick = () => {
					const svg = generateSVG(display)
					downloadSVG(svg)
				}
			} else {
				btn.onclick = async () => {
					const blob = await generateImageBlob(display, x)
					downloadImage(`pixsim-${createUUID()}.${x}`, blob)
				}
			}

			return btn
		})
}