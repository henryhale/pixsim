# Pixel Manipulation Language

## Overview

This module specifies the syntax and semantics of an Assembly-like language
limited to pixel manipulation on the [display unit](./display.md). The langauge
will be a human-readable way of representing machine instructions for the
display's [chip](./chip.md).

## Instructions

The language is ought to be simple and direct. Supported instructions are listed
below illustrating how they should be written and a description of what each
does is provided.

What you should know:

-   The state of the pixel can be;
    -   `on` -> `1`
    -   `off` -> `0`
-   Manipulation of the pixels uses an abstract cursor consisting of two
    coordinates, _x_ and _y_ stored in
    [internal registers](./chip.md#internal-registers) of the chip.

| **Instruction** | **Description**                                                          |
| :-------------- | :----------------------------------------------------------------------- |
| `NOOP`          | Performs no operations, useful for delays/timing                         |
| `RESET`         | Resets all pixels in the grid to `0`                                     |
| `IRESET`        | Sets all pixels in the grid to `1`                                       |
| `INVERT`        | Inverts all pixels in the grid switching every `1` to `0` and vice versa |
| `SET <0/1>`     | Switches the pixel at the cursor's position to either `1` or `0`         |
| `MOVX <value>`  | Stores `<value>` as the x-coordinate of the cursor                       |
| `MOVY <value>`  | Stores `<value>` as the y-coordinate of the cursor                       |
| `ADDX <value>`  | Adds `<value>` to the cursor's x-coordinate                              |
| `ADDY <value>`  | Adds `<value>` to the cursor's y-coordinate                              |
| `SUBX <value>`  | Subtracts `<value>` from the cursor's x-coordinate                       |
| `SUBY <value>`  | Subtracts `<value>` from the cursor's y-coordinate                       |

According to the list above, there are two types of instructions;

-   `SIMPLE`: a simple instruction accept no arguments
-   `VALUE`: value instructions accept one and only one argument. The argument
    must be of `INTEGER` type.

> For a full list of instructions, instruction format and available opcodes,
> check out the [instruction set architecture](./isa.md).

## Comments

In this language, comments are identified by lines(or a section of a line)
starting with a semicolon `;`.

**Example**:

```asm
; this is a comment
; another comment
RESET ; inline comment
```

## Aliases

There exists several instructions whose functionality can be referenced by
another name or at least easy to understand. Below is a list of aliases;

| **Instruction** | **Aliases**    |
| --------------- | -------------- |
| `RESET`         | `CLEAR`, `CLR` |

## Macros

Some features such as rendering a character, line or any graphic element
requires a bit of sophisticated implementation. Therefore, these have been
abstracted using built-in macros that is preprocessed before assembling: so the
instruction is substituted by a series of small
[primitive instructions](#instructions) listed above. Think of them as already
implemented, reusable functions that do the ~hard~ stuff built on top of
[supported instructions](#instructions).

To distinguish builtin macros from instructions, the `@` sign is prefix as an
identifier of every macro statement.

|     | **Macro**                                           | **Description**                                                                                                          |
| :-: | :-------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------- |
| ✅  | @DRAWTEXT <x\> <y\> <text\>                         | Renders the `<text`> string starting from position (`<x>`, `<y>`)                                                        |
| ✅  | @DRAWLINE <x1\> <y1\> <x2\> <y2\>                   | Draws a line from (`<x0>`, `<y0>`) to (`<x1>`, `<y1>`) using Bresenham's line algorithm                                  |
| ✅  | @CLEARRECT <x\> <y\> <w\> <h\>                      | Draws a filled rectangle defined by the corners (`<x>`, `<y>`) and (`<x>`+`<w>`, `<y>`+`<h>`)                            |
| ✅  | @STROKERECT <x\> <y\> <w\> <h\>                     | Resets/clears the area in the rectangle defined by the corners (`<x>`, `<y>`) and (`<x>`+`<w>`, `<y>`+`<h>`)             |
| ✅  | @FILLRECT <x\> <y\> <w\> <h\>                       | Draws a filled rectangle defined by the corners (`<x>`, `<y>`) and (`<x>`+`<w>`, `<y>`+`<h>`)                            |
| ✅  | @STROKEARC <x\> <y\> <r\> <startAngle\> <endAngle\> | Draws an outlined arc centered at (`<x>`, `<y>`) with the given radius `<r>` from `<startAngle>` deg to `<endAngle>` deg |
| ⬜️ | @FILLARC <x\> <y\> <r\> <startAngle\> <endAngle\>   | Draws a filled arc centered at (`<x>`, `<y>`) with the given radius `<r>` from `<startAngle>` deg to `<endAngle>` deg    |

## Writing Programs

Writing programs is a breeze. In section, you'll find a recommend program
structure and example programs.

For every new program, a brief comment with the title or name of the program
should be appear on the first line followed by a blank line. It helps you or
others(when you share) understand what the program is about. For example a
simple `hello world` program would have

```asm
; program: hello world

```

A short description of the program is optional but also be added to give more
details

```asm
; program: hello world
; desc: print 'HELLO WORLD!' on the screen
```

For the rest of the program, group instructions doing the same thing together
followed by a blank line. For example: clear screen and then print hello world

```asm
; program: hello world

; clear screen
RESET

; print string from point (4,4)
@DRAWTEXT 4 4 'HELLO WORLD!'
```

## Live Demo

-   🚀 [Playground](https://henryhale.github.io/pixsim/app/index.html)

## Implementation

View source on GitHub:
[source/lang/](https://github.com/henryhale/pixsim/blob/master/source/lang/)

## References

-   [Assembly Language - Wikipedia](https://wikipedia.org/wiki/Assembly_language)
-   [Instruction Set Architecture - Wikipedia](https://wikipedia.org/wiki/Instruction_set_architecture)
-   [Macro (computer science) - Wikipedia](<https://wikipedia.org/wiki/Macro_(computer_science)>)
-   [Bresenham's Line Algorithm - Wikipedia](https://wikipedia.org/wiki/Bresenham%27s_line_algorithm)
-   [Midpoint Circle Algorithrm - Wikipedia](https://en.wikipedia.org/wiki/Midpoint_circle_algorithm)
-   [Midpoint Circle Algorithm in several programming languages - Rosetta Code](https://rosettacode.org/wiki/Bitmap/Midpoint_circle_algorithm)
