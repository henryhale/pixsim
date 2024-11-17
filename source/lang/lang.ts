export enum IFormat {
	SIMPLE,
	VALUE
}

export type Instruction = {
	opcode: string
	format: IFormat
}

export const INSTRUCTIONS: Record<string, Instruction> = {
	NOOP: { opcode: '0000', format: IFormat.SIMPLE },
	RESET: { opcode: '0001', format: IFormat.SIMPLE },
	IRESET: { opcode: '0010', format: IFormat.SIMPLE },
	INVERT: { opcode: '0011', format: IFormat.SIMPLE },
	SET: { opcode: '0100', format: IFormat.VALUE },
	MOVX: { opcode: '0101', format: IFormat.VALUE },
	MOVY: { opcode: '0110', format: IFormat.VALUE },
	ADDX: { opcode: '0111', format: IFormat.VALUE },
	ADDY: { opcode: '1000', format: IFormat.VALUE },
	SUBX: { opcode: '1001', format: IFormat.VALUE },
	SUBY: { opcode: '1010', format: IFormat.VALUE },
}

export const ALIAS: Record<string, string> = {
	CLEAR: 'RESET',
	CLR: 'RESET',
}

export const COMMENT_ID = ';'
