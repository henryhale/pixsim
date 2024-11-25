import { $, screen } from "../common"
import DisplayUnit from "../core"
import { initButtons } from "./btns"

const display = new DisplayUnit($('#img-gen')!, {
	size: 15,
	active: true,
	controls: true
})

// load default screen
display.import(screen)

// extras
$('#extras')!.append(...initButtons(display))