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
`; program: macros(graphics)

; macro statements begin with '@' sign

; graphics macros with examples

RESET ; clear screen

; drawing a line
; from point (10,40) to (50,60)
@DRAWLINE 10 40 50 60

; draw an outlined rectangle
; from point (40,4)
; width = 10, height = 20
@STROKERECT 40 4 10 20

; draw a filled rectangle
; from point (1,2)
; width = 25, height = 20
@FILLRECT 1 2 25 20

; clear a rectangular area of
; the filled rectangle above
; from point (4,5)
; width - 10
; height - 15
@CLEARRECT 4 5 10 15

; draw an outlined arc(sector)
; center (20, 25)
; radius = 10
; angle range (0 deg to 180 deg)
@STROKEARC 20 25 10 0 180

`,
`; program: macros(text)

; macro statements begin with '@' sign

; text macros with examples

RESET ; clear screen

; print a character from pixsim charset
; from point (10, 12)
; character - A
@DRAWTEXT 10 12 'A'

; print a string
; from point (10, 20)
@DRAWTEXT 10 20 'HELLO!'

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
