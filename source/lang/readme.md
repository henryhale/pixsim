# PixSim | Lang

## Overview

This document specifies the instruction set architecture of the virtual chip and also defines the constructs of an Assembly-like language limited to pixel manipulation on the display unit. 

## Instruction Set Architecture

Since the low-level language will be compiled into binary (machine) code, a compiled instruction, in big endian order, takes `12` bits where; the first `4` represent the instruction/command and the remaining `8` represent parameters/arguments passed to the instruction. Thus our virtual chip may be a 12-bit chip for our display unit.  

```txt
0000	00000000
command arguments
```

This implies that the maximum number of instructions that can be supported are `2<sup>4</sup> = 16` and `2<sup>8<sup> = 256` for arguments. Consquently, the display unit must have pixel positions ranging from `0` to `255` in both dimenstions (256x256 screen resolution).

| Opcode		| Instruction				| Description					|
|:--------------|:--------------------------|:------------------------------|
| 0000 			| RESET						| Resets all pixels in the grid to `0`|
| 0001 			| IRESET					| Sets all pixels in the grid to `1`|
| 0010 			| INVERT 					| Inverts all pixels in the grid switching `1` to `0` and vice versa|
| 0011 			| SETX <value>				| Sets the x-coordinate of the cursor|
| 0100 			| SETY <value>				| Sets the y-coordinate of the cursor|
| 0101 			| MOVX <value>				| Moves the cursor by `<value>` horizontally|
| 0110 			| MOVY <value>				| Moves the cursor by `<value>` vertically|
| 0111 			| COLOR <0/1>				| Switches the pixel at the cursor's position _on_ - `1` or _off_ - `0`|

This set consists of both simple instructions, since this is a simulation, the hardware implementation details are not specified but rather to be implicitly implemented in the virtual chip.
For example, `COLOR` is a simple instruction that just turns on one(current) pixel.

## The Virtual Chip

The chip simulation is basic and only includes the functionality limited to our objectives.
The main components of the chip inlcude;
- Program Counter
- Registers(memory area - storing cursor's position)
- Flags(like `running`, `signal`)
- Display interface channel
- Program's memory location

The public interface provided by the chip defines;
- `reset`: resets the state of the chip
- `load`: fetches the program to be executed
- `step`: executes the next instruction in the program
- `run`: executes the entire program line by line

## Comments

In this language, comments are identified by lines(or a section of a line) starting with a semicolon `;`.

**Example**:
```
; this is a comment
; another comment
RESET ; reset the display
```

## Aliases

There exists several instructions whose functionality can be referenced by another name or at least easy to understand. Below is a list of aliases;

| Instruction	| Aliases		|
|---------------|---------------|
| `RESET`		| `CLEAR`, `CLR`|

## Macros

Some features such as rendering a character, line or any graphic element requires a bit of sophisticated implementation. Therefore, these have been abstracted using built-in macros that is preprocessed before assembling (the instruction is substituted by a series of small primitive instructions listed above). Think of them as already implemented , reusable functions that do the ~hard~ stuff. 

| Macro						| Description					|
|:--------------------------|:------------------------------|
| FILLRECT <x> <y> <w> <h>	| Draws a filled rectangle defined by the corners (`<x>`, `<y>`) and (`<x>`+`<w>`, `<y>`+`<h>`)|
| STROKERECT <x> <y> <w> <h>| Draws a outlined rectangle defined by the corners (`<x>`, `<y>`) and (`<x>`+`<w>`, `<y>`+`<h>`)|
| ROTATE <value>			| Rotates the bitmap grid by the specified number of degrees (e.g., 90, 180, 270)|

<!-- `FILLRECT` is complex since turns on a group of pixels using loops.  -->

<!-- - `GETQ`: Retrives and stores the state of the current pixel to the accumulator -->
<!-- - `DRAWLINE <x1> <y1> <x2> <y2>`: Draws a line from (`<x1>`, `<y1>`) to (`<x2>`, `<y2>`) using Bresenham's line algorithm. -->
<!-- - `FILLCIRCLE <x> <y> <r>`: Draws a filled circle centered at (`<x>`, `<y>`) with the given radius `<r>`. -->
