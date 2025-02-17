import { VirtualChip } from "../chip"
import { $, h, int, limit, url } from "../common"
import DisplayUnit from "../core"
import { initButtons } from "../img/btns"
import { assemble } from "./assembler"
import { snippetMap, snippets } from "./examples"
import { initFontSelector } from "../text/font"

// init configuration 
const config = {
	code: '',
	rows: 64,
	cols: 64,
	size: 6,
}

try {
	const c = url.decode()
	config.code = c.code
	config.rows = int(c.rows, config.rows)
	config.cols = int(c.cols, config.cols)
	config.size = int(c.size, config.size)
} catch (error) {
	// never throw
}

const el = {
	display: $('#display')!,
	run: $('#run')!,
	step: $('#step')!,
	reset: $('#reset')!,
	machinecode: $('#machinecode')!,
	assemble: $('#assemble')!,
	sharebtn: $('#share')!,
	export: $('#export')!,
	examples: $<HTMLSelectElement>('#examples')!,
	textarea: $<HTMLTextAreaElement>('textarea')!,
	speed: $<HTMLInputElement>('#speed')!
}

const display = new DisplayUnit($('#display')!, {
	rows: config.rows,
	cols: config.cols,
	size: config.size,
	controls: true,
	lines: false
})

const chip = new VirtualChip(display, -1)

// track executed line using program counter
let prevExecutedLine: string | undefined

// activate controls
el.speed.onchange = () => {
	chip.speed = limit(int(el.speed.value, chip.speed), -1, 100)
}

el.run.onclick = () => {
	el.display.focus()
	chip.run()
}

el.step.onclick = () => chip.step()

el.reset.onclick = () => {
	chip.reset()
	display.reset()
	el.machinecode.innerHTML = '<i>assemble to view machine code</i>'
}

el.textarea.onkeydown = (ev) => {
	if (ev.key.toLowerCase() === 's' && ev.ctrlKey) {
		ev.preventDefault()
	}
}

el.assemble.onclick = () => {
	const code = el.textarea.value
	const [binary, err] = assemble(code)
	if (err) {
		el.machinecode.innerHTML = `error: ${err}` 
		return
	}
	if (!binary) return
	el.machinecode.innerHTML = binary.map((line, i) => {
		// tag every machine code line for tracking
		return `<div id='mc-${i}'>${line.slice(0,4)}&nbsp;&nbsp;${line.slice(4)}</div>`
	}).join('')
	chip.load(binary)
}

// update executed line for every tick
chip.onTick(pc => {
	if (prevExecutedLine) {
		$(prevExecutedLine)?.classList.remove('executed')
	}
	prevExecutedLine = `#mc-${pc}`
	const element = $(prevExecutedLine)
	if (element) {
		element.classList.add('executed')
		const child = el.machinecode.children[0]
		if (child && pc != 0) {
			setTimeout(() => {
				el.machinecode.scrollBy(0, child.scrollHeight)
			})
		}
	}

})

el.sharebtn.onclick = async () => {
	el.sharebtn.setAttribute('disabled', 'true')
	const link = url.encode({
		code: el.textarea.value,
		rows: display.rows,
		cols: display.cols,
		size: display.size
	})
	try {
		await window.navigator.clipboard.writeText(link)
		el.sharebtn.textContent = 'Copied!'
		setTimeout(() => {
			el.sharebtn.textContent = 'Copy Link to Clipboard'
		}, 1000)
	} catch (error) {
		console.error(error)		
	} finally {
		el.sharebtn.removeAttribute('disabled')
	}
}

// add export options
el.export.append(...initButtons(display))

// add code examples
snippets.forEach((s) => {
	const option = h<HTMLOptionElement>('option', s.title)
	option.value = s.id.toString()
	el.examples.append(option)
})
el.examples.onchange = () => {
	el.textarea.value = snippetMap.get(el.examples.value)!
}

// activate font selector
initFontSelector()

// load default/shared code
config.code = config.code || `; program: brick game character

RESET ; clear screen

; draw character
MOVX 30
MOVY 30
SET 1

ADDY 1
SET 1

ADDX 1
SET 1

ADDY 1
SET 1

SUBX 2
SET 1

SUBY 1
SET 1
; end character

NOOP
NOOP
INVERT
NOOP
NOOP

; end of program`

// set default code
el.textarea.value = config.code

// auto run after 1s
setTimeout(() => {
	el.assemble.click()
	el.run.click()
}, 1000);
