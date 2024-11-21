<div align=center>

<img width=45 src='./public/favicon.svg'>

# PixSim

A pixel-based led matrix display simulator

![](./public/media/showcase.png)

</div>

## Overview

PixSim, _**pix**el **sim**ulator_ is an educational LED Matrix simulation project that tends to explore
how display systems like monitors/screens work.
A monitor or the screen on my digital watch is composed of a grid of small LEDs representing pixels.

### Objectives

The main objective of this project is to illustrate how monitors/screens work by simulating their display mechanism, chip, and logic. 

Specifically, the objectives for this simulation are;

To implement
- [x] [Display Unit](./docs/display-unit.md) - A grid of tiny monochromatic pixels (say black and white) - bitmap
- [x] [Custom Assembly-like Language](./docs/language.md) for graphics or pixel manipulation like drawing lines, shapes, and more
	- [x] [Instruction Set](./docs/isa.md) - a standard for which the display unit operates and communicates 
	- [x] [Virtual Chip](./docs/virtual-chip.md) - to simulate a cpu that sends video signals to the display unit
- [x] [Character Encoding](./docs/character-encoding.md) - characters for our display unit
- [x] [Font Editor](./docs/font-editor.md) - create a font containing all every character in the character set
- [x] [Image Generator](./docs/image-generator.md) - convert the underlying bitmap into an pixelated image
The scope of this project lies in simulating how the monitor/screen works. More technical details about logic circuits, display chip or wiring are not included.
- [ ] Character display encoder and decoder - transform binary data into pixel data and the render/draw characters

## Live Demo

- [Full Demo :rocket:](https://henryhale.github.io/pixsim/)

## Documentation

To learn more about the implementation details, check out the [documentation](./docs/index.md).

## Original README

<details>
<summary>View contents</summary>

#### The Idea

- I am planning on working on a led matirx screen simulator/emulator. 
- I want to learn about the monitor display circuit, it's chip and logic.
- I plan on developing a grid of many tiny coloured pixels (say black and white), character set, font, character display encoder/decoder to draw characters on the screen.
- Plus a pixel or field shader/filler to fill a group of pixels. Pixels will be tiny bit easily distinguishable with a human eye.
- I want to finally write a blog post/article about it so that others can see and learn how screens/display systems work at a low level.
- I don't know if it'll be too much but I consider creating a custom instructions set and assembly like language that compiles to binary data, say one command per line.
- Each line will represent what signal bits sent to the display screen via a cable.
- In fact, I need to develop and simulate a chip to read our compiled code line by line per clock signal then send the bits to our display screen emulator that receives them and displays whats requested. 

I know my idea is vague or wiggly. I am trying to formulate it in a better way.

#### Todo
- LED Matrix Simulator(grid of pixels)
- Character Display(character set, font creator, character renderer)
- Display Controller(instruction set, assembler, virtual chip)
- Documentation
- Other(shareable/downloadable pixelated images, animations, games like maze) -->

</details>

## License

&copy; 2024-present [Henry Hale](https://github.com/henryhale).

Release under [MIT License](https://github.com/henryhale/pixsim/blob/master/LICENSE.txt)
