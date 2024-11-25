const code = [
`; program: blank

`,
`; program: emoji

RESET

; head
@STROKEARC 31 31 20 0 360

; eyes
@STROKEARC 26 28 1 0 360
@STROKEARC 36 28 1 0 360

; mouth
@STROKEARC 31 34 5 0 180 

`,
`; program: cube

RESET

@STROKERECT 20 20 20 20
@STROKERECT 30 30 20 20

@DRAWLINE 20 20 30 30
@DRAWLINE 40 40 49 49
@DRAWLINE 40 20 49 30
@DRAWLINE 20 40 30 49

`
]

export const snippetMap: Map<string, string> = new Map()

type Snippet = {
	id: string
	title: string
}

export const snippets: Snippet[] = []

code.forEach((x,i) => {
	const [header,] = x.split('\n')
	const [,title] = header.split(':')
	snippetMap.set(i.toString(), x)
	snippets.push({
		id: i.toString(),
		title: title.trim(),
	})
})
