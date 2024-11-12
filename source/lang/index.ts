import { VirtualChip } from "../chip"
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

const sharebtn = $('#share')!
sharebtn.onclick = async () => {
	sharebtn.setAttribute('disabled', 'true')
	const code = textarea.value
	const link = window.location.origin + window.location.pathname + '?c=' + encodeURI(code)
	try {
		console.log(link)
		await window.navigator.clipboard.writeText(link)
		sharebtn.textContent = 'Copied!'
		setTimeout(() => {
			sharebtn.textContent = 'Copy Link to Clipboard'
		}, 1000)
	} catch (error) {
		console.error(error)		
	} finally {
		sharebtn.removeAttribute('disabled')
	}
}

const params = new URLSearchParams(window.location.search)
const code = decodeURI(params.get('c') || '')

textarea.value = code || `; example program

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
SETY 21
COLOR 1
SETX 21
COLOR 1
; end character

INVERT
INVERT
INVERT
; end of program`

if (code) {
	$('#assemble')!.click()
	$('#run')!.click()
} 