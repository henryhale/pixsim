import { int } from "../common";
import { IDisplayUnit } from "../core";

export interface Chip {
	speed: number;
	reset(): void;
	load(program: string[]): void;
	step(): boolean;
	run(): void;
}

export class VirtualChip implements Chip {
	private display: IDisplayUnit
	private pc: number
	private program: string[]
	private running: boolean
	private signal?: number
	private registers: Record<string, number>
	public 	speed: number;

	constructor(display: IDisplayUnit, speed: number) {
		this.speed = speed
		this.display = display
		this.pc = 0
		this.program = []
		this.running = false
		this.registers = {
			// cursor coordinates (cx, cy)
			cx: 0,
			cy: 0
		}
	}

	reset(): void {
		clearTimeout(this.signal)
		this.signal = undefined
		this.pc = 0
		this.running = false
	}

	load(program: string[]): void {
		this.program = program
		this.reset()
	}

	step(): boolean {
		return this.executeNextInstruction()
	}

	private executeNextInstruction(): boolean {
		// check for end of program
		if (this.pc >= this.program.length) {
			this.running = false
			return false
		}

		const instruction = this.program[this.pc]
		const opcode = instruction.slice(0, 4)
		const arg = instruction.slice(4)

		this.execute(opcode, parseInt(arg, 2))
	
		this.pc++
		return true
	}

	private execute(opcode: string, arg: number): void {
		console.log(opcode, arg)
		switch (opcode) {
			case '0000':
				this.display.reset(false)
				break;
			
			case '0001':
				this.display.reset(true)
				break;
			
			case '0010':
				this.display.invert()
				break;
			
			case '0011':
				this.registers.cx = arg
				break;
			
			case '0100':
				this.registers.cy = arg
				break;
			
			case '0101':
				this.registers.cx += arg
				break;
			
			case '0110':
				this.registers.cy += arg
				break;
			
			case '0111':
				this.display.set(this.registers.cx, this.registers.cy, arg > 0)
				break;
	
			default:
				break;
		}
	}

	run(): void {
		this.running = true
		const exec = () => {
			if (this.running && this.step()) {
				this.signal = setTimeout(exec, int(this.speed))
			}
		}
		exec()
	}
}

