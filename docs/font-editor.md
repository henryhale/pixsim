# PixSim | Font Editor

## Overview

The font editor is a tool designed for creating and managing bitmap fonts for the [display simulator](./display-unit.md) basing on it's [character set](./charset.md).

It allows for designing the appearances of the characters and export the graphical representation of each as a bitmap in one single json file.

- Each character is exported as a bitmap containing the details on how it will be rendered. 
- The exported font file contains a JSON string whose keys are correspond to the character's unique id (in binary) from the supported [character set](./charset.md).

The editor provides features to visually edit character bitmaps, manage character sets, and preview the font in real-time. The tool allows exporting fonts in a compact format, including essential metadata like character dimensions and mapping to [character codes](./charset.md#character-codes). This ensures compatibility with the simulator's rendering engine while minimizing file size. Additionally, the editor supports importing previously exported fonts for further modifications or updates, enabling iterative font design and refinement.

> Technically, computer font files are typically in binary format. They contain information necessary to render and display typefaces on screens or print for example;
> - font name (e.g. "Times New Roman")
> - font style (e.g. "Bold" or "Italic" or "Regular")
> - font version
> - author/designer & copyright info
> - font metrics (spacing, kerning, and more)
> - glyph outlines (vector shapes or bitmaps)
> - hinting (for rendering at small sizes)

## Implementation

The font editor's source code under [source/font/](../source/font/) and [font.html](../font.html).

## Live Demo

- [Font Editor :rocket:](https://henryhale.github.io/pixsim/font.html)

## References

- [Font - Wikipedia](https://wikipedia.org/wiki/Font)
- [Font Editor - Wikipedia](https://wikipedia.org/wiki/Font_editor)
- [Computer Font - Wikipedia](https://wikipedia.org/wiki/Computer_font)
- [Font Hinting](https://wikipedia.org/wiki/Font_hinting)
- [Kerning](https://wikipedia.org/wiki/Kerning)