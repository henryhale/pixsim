# Instruction Set Architecture

## Overview

This module specifies the instruction set architecture of the
[virtual chip](./chip.md) that comprises of a minimal set of simple
instructions.

## Instruction Format

The [low-level language](./language.md) will be compiled into binary (machine)
code. A compiled instruction, in
[big endian](https://wikipedia.org/wiki/Endianness) order, takes `12` bits
where; the first `4` represent the instruction and the remaining `8` represent
argument(immediate value) passed to the instruction. Thus our virtual chip may
be a 12-bit chip for our display unit.

| **Op Code** | **Operand(Immediate Value)** |
| ----------- | ---------------------------- |
| 0000        | 00000000                     |

This implies that the maximum number of instructions that can be supported are
2<sup>4</sup> = `16` and 2<sup>8</sup> = `256` for arguments. Consquently, the
display unit must have pixel positions ranging from `0` to `255` in both
dimenstions (256x256 screen resolution).

## Instruction Set

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

| **Opcode** | **Mnemonic** |
| :--------- | :----------- |
| 0000       | NOP          |
| 0001       | RESET        |
| 0010       | IRESET       |
| 0011       | INVERT       |
| 0100       | SET          |
| 0101       | MOVX         |
| 0110       | MOVY         |
| 0111       | ADDX         |
| 1000       | ADDY         |
| 1001       | SUBX         |
| 1010       | SUBY         |
| 1011       | -            |
| 1100       | -            |
| 1101       | -            |
| 1110       | -            |
| 1111       | -            |

This set consists of simple instructions and since this is a simulation, the
hardware implementation details are not specified but rather to be implicitly
implemented in the [virtual chip](./chip.md). For example, `SET` is a simple
instruction that just turns on/off one(current) pixel.

> [!IMPORTANT]
>
> The usage and description of each instruction are defined
> [here](./language.md#instructions).

## References

-   [Instruction Set Architecture - Wikipedia](https://wikipedia.org/wiki/Instruction_set_architecture)
