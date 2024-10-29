import { tobin } from "../common"

const characters = ' 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ.:,;()*!?<>/|[]=+-_{}#$^"`\''
// const characters = ' 0123456789'

export type ICharset = {
	bin: string
	char: string
}

export const charset: ICharset[] = []

for (let i = 0; i < characters.length; i++) {
	const char = characters[i]
	charset.push({
		char,
		bin: tobin(i, 6)
	})
}
