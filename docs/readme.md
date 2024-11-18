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

Table of Contents

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
