# PixSim | Docs

## Overview

The details of the entire simulation as well as the implementation of each
component are described in this documentation.

It begins with the virtualization of a display unit like a monitor/screen
containing a grid of pixels. Then we design an assembly-like language (including
syntax & semantics, mnemonics, instruction format) to enable us manipulate those
pixels easily, say a single pixel or group of pixels in a specific area. Based
on the assembly language, the instruction set architecture(ISA) is designed to
specify which instructions will be supported, how operands will be formatted,
and how control flow will be managed. Finally, the display unit's chip, that
will execute each instruction in the ISA, is designed and tested using test
programs written in our assembly-like language.

> [!NOTE] Each component of this simulation uses web technologies: HTML, CSS,
> JavaScript/TypeScript and primarily designed for desktop use. This allows for
> easy and quick access for everyone on any platform using a web browser. It
> implies that the limitations(like performance) of the simulation are tightly
> bounded by browser's abilities.

## Table of Contents

1. [The Display Unit](./display-unit.md)
2. [Pixel Manipulation Language](./language.md)
3. [Instruction Set Architecture](./isa.md)
4. [Virtual Chip](./virtual-chip.md)
5. [Character Encoding](./charset.md)
6. [Application: Font Editor](./font-editor.md)
7. [Application: Image Generator](./image-generator.md)
8. Character Encoder & Decoder
9. Character Rendering
10. Application: Text Editor

## Background

In this section, a description of the relationship of all the components
involved is discussed.

Suppose that you are typing a command in your terminal/notepad. Every time you
press a key this is what happens behind the scenes;

1. **key detection**: the keyboard registers the physical action and generates a
   unique electrical signal corresponding to that key.
2. **key scan**: the keyboard's microcontroller scans the key matrix to identify
   which key has been pressed, converting it into a keycode.
3. **hardware interrupt**: the keyboard sends an interrupt signal to the
   processor (CPU). This interrupt alerts the CPU that new input is available.
4. **interrupt handling**: the CPU temporarily halts its current operations and
   jumps to the interrupt handler, a specific routine designed to manage
   keyboard input.
5. **reading keycode**: the interrupt handler reads the keycode from the
   keyboard's buffer. Each key corresponds to a unique binary number (scan
   code).
6. **character translation**: the operating system (OS) takes the keycode and
   translates it into a character using the current character set (e.g. ASCII,
   UTF-8).
    - for example, pressing the 'A' key might correspond to the keycode that
      translates to the binary number `01000001` in ASCII.
7. **accumulator(data register)**: the OS stores the translated binary
   representation of the character in the accumulator, preparing it to be sent
   to the appropriate program (your terminal/notepad in this case).
8. **interrupt return**: The OS then forwards the character to the application
   (your terminal). This often involves a system call where the OS communicates
   with the terminal application.
9. **reading the input character**: The terminal application receives the
   character from the OS. It retrieves the character from the accumulator and
   processes it, which may involve updating the display buffer.
10. **displaying the character**: the terminal application updates the screen by
    rendering the character in the appropriate font and position based on the
    current cursor location. This might involve converting to pixel data for
    rendering.
11. **refreshing the display**: the display is refreshed to show the new
    character. The terminal may redraw the entire screen or just the part that
    changed, depending on its implementation.

This entire process occurs in a matter of milliseconds, making it feel
instantaneous to you. Each step involves intricate communication between the
keyboard, CPU, OS, and application, ensuring that your input is accurately
captured and displayed.
