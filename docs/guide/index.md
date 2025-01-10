# What is PixSim?

PixSim, **pix**el **sim**ulator, is an educational
[LED Matrix](https://wikipedia.org/wiki/LED_display) simulation project that
tends to explore how display systems like monitors/screens work. For instance, a
desktop monitor or the screen on a digital watch, is composed of a grid of small
LEDs representing [pixels](https://wikipedia.org/wiki/Pixel). That's the basis
of this project; taking you through the origins/evolution from just a grid of
pixels to modern fields/usage like basic [computer graphics](), fonts and
[text rendering](https://wikipedia.org/wiki/Font_rasterization).

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

::: warning COMPATIBILITY NOTE 
This simulator requires a modern browser with
JavaScript enabled. Each component of this simulation uses web technologies:
HTML, CSS, JavaScript/TypeScript and primarily designed for desktop use. This
allows for easy and quick access for everyone on any platform using a web
browser. It implies that some limitations(like performance) of the simulation
are tightly bounded by the browser's abilities.
:::

## Objectives

The main objective of this project is to illustrate how monitors/screens work by
simulating their display mechanism, chip, and logic.

Specifically, the objectives for this simulation are;

To implement

1. ✅ [Display System](./display.md)
    - A grid of tiny monochromatic pixels (say black and white) - bitmap
2. ✅ [Instruction Set Architecture](./isa.md)
    - A standard for which the display unit operates and communicates
3. ✅ [Assembly Language](./language.md)
    - A compiled language for graphics or pixel manipulation like drawing lines,
      shapes, and more
4. ✅ [Virtual Chip](./chip.md)
    - Simulate a chip that executes and sends video signals to the display unit
5. ✅ [Character encoding](./charset.md)
    - Specify characters for the display unit
6. ✅ [Font System](./font.md)
    - Character rendering - transform binary data into pixel data and then
      render/draw characters
    - Font editor - create a font containing all every character in the
      character set

## Live Demo

-   Try it yourself: 🚀 [Launch](../demo/index.md)

## Support the Project

If you find this project helpful, please consider:
- Starring the repository on [GitHub](https://github.com/henryhale/pixsim)
- [Contributing](https://github.com/henryhale/pixsim) code or documentation
- Sharing with others

## License

Release under
[MIT License](https://github.com/henryhale/pixsim/blob/master/LICENSE.txt).

Copyright &copy; 2024-present [Henry Hale](https://github.com/henryhale).
