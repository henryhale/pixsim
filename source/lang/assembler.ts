import { int, tobin } from "../common";
import { ALIAS, COMMENT_ID, IFormat, INSTRUCTIONS } from "./lang";
import { expandMacros, isMacro } from "./macros";
import { tokenize } from "./tokenize";

function parse(line: string = ""): (string | null)[] {
	// ignore comments
	line = line.split(COMMENT_ID)[0].trim();
	if (!line) return [null, null];

	// split into tokens(words)
	const tokens = tokenize(line);
	let instruction = tokens[0].toUpperCase();
	const args = tokens.slice(1);
	
	// check for alias
	if (ALIAS[instruction]) {
		const [i, ...list] = tokenize(ALIAS[instruction])
		args.unshift(...list)
		instruction = i
	}

	// check if instruction exists
	const config = INSTRUCTIONS[instruction];
	if (!config) {
		return [null, `unknown instruction: ${instruction}`];
	}

	// construct binary representation
	let bin = config.opcode;
	switch (config.format) {
		case IFormat.SIMPLE:
			bin += "00000000";
			break;
		case IFormat.VALUE:
			const value = int(args[0]);
			bin += tobin(value, 8);
			break;
		default:
			break;
	}

	return [bin, null]
}

export type AResult = [string[] | null, string | null];

// convert assembly code into machine code
export function assemble(code: string): AResult {
	let error: string | null = null;
	const binarycode: string[] = [];

	const lines = code.split("\n");

	// parse line by line, break on error
	for (const [pos, line] of lines.entries()) {
		// macros check & expansion
		if (isMacro(line)) {
			lines.splice(pos + 1, 0, ...expandMacros(line))
			continue
		}

		const [bin, err] = parse(line);
		if (err) {
			error = err;
			break;
		}
		if (bin) binarycode.push(bin);
	}

	return [error ? null : binarycode, error];
}
