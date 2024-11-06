export function assemble(code) {
	const binarycode = []
	const lines = code.split('\n')

	for (const line of lines) {
		const [bits, error] = parseLine(line.trim())
		if (error == null) {
			binarycode.push(bits)
		} else {
			throw new Error(error)
		}
	}

	return binarycode
}

function parseLine(line = "") {
	
}