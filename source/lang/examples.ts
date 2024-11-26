const code = [
`; program: learn the basics

; comments start with a semicolon

RESET ; clear screen

; example: brick game character

; move cursor to point (30,30)
MOVX 30 
MOVY 30

; turn on pixel - head
SET 1

; from current position,
; move down by 1 unit
; to point (30, 31)
ADDY 1
SET 1

; point (31, 31)
ADDX 1
SET 1

; point (31, 32)
ADDY 1
SET 1

; point (29, 32)
SUBX 2
SET 1

; point (29, 31)
SUBY 1
SET 1

; end character

NOOP ; do nothing
NOOP
INVERT ; invert screen state
NOOP
NOOP

`,
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
