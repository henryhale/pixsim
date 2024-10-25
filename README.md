# PixSim

> [!WARNING]
> _work in progress but you are welcome to see what it is_

## Live Demo
[Launch Demo 🚀](https://henryhale.github.io/pixsim/)

## The Idea
- I am planning on working on a led matirx screen simulator/emulator??? 
- I want to learn about the monitor display circuit, chip and logic.
- I plan on developing a grid of many tiny coloured pixels (say black and white), character set, font, character display encoder/decoder to draw characters on the screen.
- Plus a pixel or field shader/filler to fill a group of pixels. Pixels will be tiny bit easily distinguishable with a human eye.
- I want to finally write a blog post/article about it so that others can see and learn how screens/display systems work at a low level.
- I don't know if it'll be too much but I consider creating a custom instructions set and assembly like language that compiles to binary data, say one command per line.
- Each line will represent what signal bits sent to the display screen via a cable.
- In fact, I need to develop and simulate a chip to read our compiled code line by line per clock signal then send the bits to our display screen emulator that receives them and displays whats requested. 

I know my idea is vague or wiggly. I am trying to formulate it in a better way.

## Todo
- LED Matrix Simulator(grid of pixels)
- Character Display(character set, font creator, character renderer)
- Display Controller(instruction set, assembler, virtual chip)
- Documentation
- Other(shareable/downloadable pixelated images, animations, games like maze)