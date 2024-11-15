# PixSim | Charset

## Overview

This module defines the characters that will be supported on our display. For this part, focus will be on drawn to implementing the basic characters only.

Suppose that we want to display text on the display;
- how do we uniquely identify each character signal and then manipulate pixels to create a visual illustration of the character itself?

Well, this is where fonts come into play. But first, we need to list all characters we expect and tag them.

## Charset

The character set will contain the following characters;
- Space ( )
- Numbers (0-9)
- Letters (A-Z)
- Special symbols (.:,;()*!?<>/|[]=+-_{}#$^"'`)

The size of this character set is 64. This is small but perfect.
Because;
- it takes 6 bits for values ranging between 0 - 63
- all essential characters included
- all 64 slots occupied

## Character Codes

Each character in the charset is assigned a unique number so that it can be identified and the correct graphical representation renderer.

| Decimal	| Binary	| Character |
|-----------|-----------|-----------|
| 0			| 000000	| SPACE		|
| 1			| 000001	| 0			|
| 2			| 000010	| 1			|
| 3			| 000011	| 2			|
| 4			| 000100	| 3			|
| 5			| 000101	| 4			|
| 6			| 000110	| 5			|
| 7			| 000111	| 6			|
| 8			| 001000	| 7			|
| 9			| 001001	| 8			|
| 10		| 001010	| 9			|
| 11		| 001011	| A			|
| 12		| 001100	| B			|
| 13		| 001101	| C			|
| 14		| 001110	| D			|
| 15		| 001111	| E			|
| 16		| 010000	| F			|
| 17		| 010001	| G			|
| 18		| 010010	| H			|
| 19		| 010011	| I			|
| 20		| 010100	| J			|
| 21		| 010101	| K			|
| 22		| 010110	| L			|
| 23		| 010111	| M			|
| 24		| 011000	| N			|
| 25		| 011001	| O			|
| 26		| 011010	| P			|
| 27		| 011011	| Q			|
| 28		| 011100	| R			|
| 29		| 011101	| S			|
| 30		| 011110	| T			|
| 31		| 011111	| U			|
| 32		| 100000	| V			|
| 33		| 100001	| W			|
| 34		| 100010	| X			|
| 35		| 100011	| Y			|
| 36		| 100100	| Z			|
| 37		| 100101	| .			|
| 38		| 100110	| :			|
| 39		| 100111	| ,			|
| 40		| 101000	| ;			|
| 41		| 101001	| (			|
| 42		| 101010	| )			|
| 43		| 101011	| *			|
| 44		| 101100	| !			|
| 45		| 101101	| ?			|
| 46		| 101110	| <			|
| 47		| 101111	| >			|
| 48		| 110000	| /			|
| 49		| 110001	| |			|
| 50		| 110010	| [			|
| 51		| 110011	| ]			|
| 52		| 110100	| =			|
| 53		| 110101	| +			|
| 54		| 110110	| -			|
| 55		| 110111	| _			|
| 56		| 111000	| {			|
| 57		| 111001	| }			|
| 58		| 111010	| #			|
| 59		| 111011	| $			|
| 60		| 111100	| ^			|
| 61		| 111101	| "			|
| 62		| 111110	| '			|
| 63		| 111111	| `			|

## References

- [Character Encoding - Wikipedia](https://wikipedia.org/wiki/Character_encoding)
