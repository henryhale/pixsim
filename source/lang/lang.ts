export enum IFormat {
	SIMPLE,
	VALUE,
	ARRAY
}

export type Instruction = {
	opcode: string
	format: IFormat
}

export const INSTRUCTIONS: Record<string, Instruction> = {
	RESET: { opcode: '0000', format: IFormat.SIMPLE },
	IRESET: { opcode: '0001', format: IFormat.SIMPLE },
	INVERT: { opcode: '0010', format: IFormat.SIMPLE },
	SETX: { opcode: '0011', format: IFormat.VALUE },
	SETY: { opcode: '0100', format: IFormat.VALUE },
	MOVX: { opcode: '0101', format: IFormat.VALUE },
	MOVY: { opcode: '0110', format: IFormat.VALUE },
	COLOR: { opcode: '0111', format: IFormat.VALUE },
}

export const ALIAS: Record<string, string> = {
	CLEAR: 'RESET',
	CLR: 'RESET',
}

export const COMMENT_ID = ';'

// TODO: add macros support
