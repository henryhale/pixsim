# PixSim | Charset

## Overview

This module defines the characters that will be supported on our display. For
this part, focus will be on drawn to implementing the basic characters only.

Suppose that we want to display text on the display;

-   how do we uniquely identify each character signal and then manipulate pixels
    to create a visual illustration of the character (glyph) itself?

Well, this is where fonts come into play. But first, we need to list all
characters to support and tag them.

## Charset

The character set will contain the following characters;

-   Space
-   Letters - uppercase (A-Z)
-   Digits (0-9)
-   Special Symbols (.:,;()\*!?<>/|[]=+-\_{}#$^"'`)

The size of this character set is 64. This is small but perfect. Because;

-   it takes 6 bits for values ranging between 0 - 63
-   all essential characters included: alphabetic, numeric, and punctuation
    marks
-   all 64 slots occupied

## Character Codes

Each character in the charset is assigned a unique number so that it can be
identified and the correct graphical representation rendered.

| **Code (Decimal)** | **Code (Hex)** | **Code (Binary)** | **Character** | **Description**         |
| ------------------ | -------------- | ----------------- | ------------- | ----------------------- | ------------------- |
| 0                  | 0x00           | 000000            | Space         | Whitespace (space)      |
| 1                  | 0x01           | 000001            | A             | Uppercase A             |
| 2                  | 0x02           | 000010            | B             | Uppercase B             |
| 3                  | 0x03           | 000011            | C             | Uppercase C             |
| 4                  | 0x04           | 000100            | D             | Uppercase D             |
| 5                  | 0x05           | 000101            | E             | Uppercase E             |
| 6                  | 0x06           | 000110            | F             | Uppercase F             |
| 7                  | 0x07           | 000111            | G             | Uppercase G             |
| 8                  | 0x08           | 001000            | H             | Uppercase H             |
| 9                  | 0x09           | 001001            | I             | Uppercase I             |
| 10                 | 0x0A           | 001010            | J             | Uppercase J             |
| 11                 | 0x0B           | 001011            | K             | Uppercase K             |
| 12                 | 0x0C           | 001100            | L             | Uppercase L             |
| 13                 | 0x0D           | 001101            | M             | Uppercase M             |
| 14                 | 0x0E           | 001110            | N             | Uppercase N             |
| 15                 | 0x0F           | 001111            | O             | Uppercase O             |
| 16                 | 0x10           | 010000            | P             | Uppercase P             |
| 17                 | 0x11           | 010001            | Q             | Uppercase Q             |
| 18                 | 0x12           | 010010            | R             | Uppercase R             |
| 19                 | 0x13           | 010011            | S             | Uppercase S             |
| 20                 | 0x14           | 010100            | T             | Uppercase T             |
| 21                 | 0x15           | 010101            | U             | Uppercase U             |
| 22                 | 0x16           | 010110            | V             | Uppercase V             |
| 23                 | 0x17           | 010111            | W             | Uppercase W             |
| 24                 | 0x18           | 011000            | X             | Uppercase X             |
| 25                 | 0x19           | 011001            | Y             | Uppercase Y             |
| 26                 | 0x1A           | 011010            | Z             | Uppercase Z             |
| 27                 | 0x1B           | 011011            | 0             | Digit 0                 |
| 28                 | 0x1C           | 011100            | 1             | Digit 1                 |
| 29                 | 0x1D           | 011101            | 2             | Digit 2                 |
| 30                 | 0x1E           | 011110            | 3             | Digit 3                 |
| 31                 | 0x1F           | 011111            | 4             | Digit 4                 |
| 32                 | 0x20           | 100000            | 5             | Digit 5                 |
| 33                 | 0x21           | 100001            | 6             | Digit 6                 |
| 34                 | 0x22           | 100010            | 7             | Digit 7                 |
| 35                 | 0x23           | 100011            | 8             | Digit 8                 |
| 36                 | 0x24           | 100100            | 9             | Digit 9                 |
| 37                 | 0x25           | 100101            | .             | Period                  |
| 38                 | 0x26           | 100110            | :             | Colon                   |
| 39                 | 0x27           | 100111            | ,             | Comma                   |
| 40                 | 0x28           | 101000            | ;             | Semicolon               |
| 41                 | 0x29           | 101001            | (             | Left parenthesis        |
| 42                 | 0x2A           | 101010            | )             | Right parenthesis       |
| 43                 | 0x2B           | 101011            | \*            | Asterisk                |
| 44                 | 0x2C           | 101100            | !             | Exclamation mark        |
| 45                 | 0x2D           | 101101            | ?             | Question mark           |
| 46                 | 0x2E           | 101110            | <             | Less-than sign          |
| 47                 | 0x2F           | 101111            | >             | Greater-than sign       |
| 48                 | 0x30           | 110000            | /             | Slash/Forward Slash     |
| 49                 | 0x31           | 110001            |               |                         | Pipe (vertical bar) |
| 50                 | 0x32           | 110010            | [             | Left square bracket     |
| 51                 | 0x33           | 110011            | ]             | Right square bracket    |
| 52                 | 0x34           | 110100            | =             | Equals sign             |
| 53                 | 0x35           | 110101            | +             | Plus sign               |
| 54                 | 0x36           | 110110            | -             | Hyphen/Minus sign       |
| 55                 | 0x37           | 110111            | \_            | Underscore              |
| 56                 | 0x38           | 111000            | {             | Left brace              |
| 57                 | 0x39           | 111001            | }             | Right brace             |
| 58                 | 0x3A           | 111010            | #             | Hash/Pound sign         |
| 59                 | 0x3B           | 111011            | $             | Dollar sign             |
| 60                 | 0x3C           | 111100            | ^             | Caret (circumflex)      |
| 61                 | 0x3D           | 111101            | "             | Double quote            |
| 62                 | 0x3E           | 111110            | '             | Single quote            |
| 63                 | 0x3F           | 111111            | `             | Backtick (grave accent) |

## References

-   [Character Encoding - Wikipedia](https://wikipedia.org/wiki/Character_encoding)
-   [ASCII - Wikipedia](https://wikipedia.org/wiki/ASCII)
