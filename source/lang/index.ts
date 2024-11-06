import { VirtualChip } from "./chip"
import { $ } from "../common"
import DisplayUnit from "../core"
import { assemble } from "./assembler"

const display = new DisplayUnit($('#display')!, {
	rows: 64,
	cols: 64,
	size: 6,
	theme: 'dracula'
	// controls: true
})

const chip = new VirtualChip(display, 100)

// activate controls
$('#run')!.onclick = () => chip.run()

$('#step')!.onclick = () => chip.step()

$('#reset')!.onclick = () => {
	chip.reset()
	display.reset()
}

const textarea = $<HTMLTextAreaElement>('textarea')!

$('#assemble')!.onclick = () => {
	const code = textarea.value
	const [binary, err] = assemble(code)
	const box = $('#machinecode')! 
	if (err) {
		box.innerHTML = `error: ${err}` 
		return
	}
	if (!binary) return
	box!.innerHTML = binary.map(line => line.slice(0,4) + '&nbsp;&nbsp;' + line.slice(4) + '<br>').join('')
	chip.load(binary)
}

textarea.value = `
; demo program
RESET ; clear screen
; draw character
SETX 20
SETY 19
COLOR 1
SETY 20
COLOR 1
SETX 21
COLOR 1
SETX 19
COLOR 1
; end character

INVERT
INVERT
INVERT
; end of program`