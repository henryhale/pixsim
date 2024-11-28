import { tobin } from "../common"

const characters = ' 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ.:,;()*!?<>/|[]=+-_{}#$^"\'`'

export type ICharset = {
	bin: string
	char: string
}

export const charset: ICharset[] = []

export const charToBin: Map<string, string> = new Map()

for (let i = 0; i < characters.length; i++) {
	const char = characters[i]
	const bin = tobin(i, 6)
	charToBin.set(char, bin)
	charset.push({
		char,
		bin: tobin(i, 6)
	})
}
