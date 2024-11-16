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
> 
> With the Font editor, focus is directed towards being as basic/minimal as possible while illustrating would-be approach for real-world use/standards/convention.

## Designing a Font

### New Font

To design a **new** font with this tool;
1. select the character to design
2. adjust the display's properties to appropriate size: `cols` & `rows`
3. create a graphical representation of the character by toggling on appropriate pixels
4. Under the `Menu` section, select `Save Character` to save the character
5. Repeat steps 1-4 for all characters
6. Under the `Metadata` section, fill in the details
7. Select `Export Font` under the `Menu` section to download & save the font locally.

### Update Existing Font
 
To modify an already exported font;
1. Select `Load Font` under the menu section
2. A file access window will popup, locate and select the font file
3. Now, follow the [above steps](#new-font) to modify characters in the font 

## Implementation

The font editor's source code under [source/font/](../source/font/) and [font.html](../font.html).

## Live Demo

- [Font Editor :rocket:](https://henryhale.github.io/pixsim/font.html)

## References

- [Font - Wikipedia](https://wikipedia.org/wiki/Font)
- [Font Editor - Wikipedia](https://wikipedia.org/wiki/Font_editor)
- [Computer Font - Wikipedia](https://wikipedia.org/wiki/Computer_font)
- [Font Hinting - Wikipedia](https://wikipedia.org/wiki/Font_hinting)
- [Kerning - Wikipedia](https://wikipedia.org/wiki/Kerning)
- [Bitmap, pixel, screen fonts - Dafont](https://www.dafont.com/bitmap.php)
- [Tiny5 Font - GitHub](https://github.com/Gissio/font_tiny5)