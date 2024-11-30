# 👾 PixSim | Font Editor

## Overview

The font editor is a tool designed for creating and managing bitmap fonts for
the [display simulator](./display-unit.md) basing on it's
[character set](./charset.md).

It allows for designing glyphs, say the appearances of the characters, and
export the graphical representation of each as a bitmap in one single
`*.font.json` file.

> Glyphs are the visual representations of the characters.

-   Each character is exported as a bitmap containing the details on how it will
    be rendered.
-   The exported font file contains a JSON string whose keys are correspond to
    the character's unique id (in binary) from the supported
    [character set](./charset.md).

> Why bitmaps? 
>
> Modern fonts like scalable fonts such as TrueType fonts are
> stored as mathematical vector descriptions. These are eventually transformed
> into bitmaps for rendeing on the screen(toggling on/off pixels).

The editor provides features to visually edit character bitmaps, manage
character sets, and preview the font in real-time. The tool allows exporting
fonts in a compact format, including essential metadata like character
dimensions and mapping to [character codes](./charset.md#character-codes). This
ensures compatibility with the simulator's rendering engine while minimizing
file size. Additionally, the editor supports importing previously exported fonts
for further modifications or updates, enabling iterative font design and
refinement.

> Technically, computer font files are typically stored in binary format. They
> contain information necessary to render and display typefaces on screens or
> print for example;
>
> -   font name (e.g. "Times New Roman")
> -   font style (e.g. "Bold" or "Italic" or "Regular")
> -   font version
> -   author/designer & copyright info
> -   font metrics (spacing, kerning, and more)
> -   glyph outlines (vector shapes or bitmaps)
> -   hinting (for rendering at small sizes)
>
> With the Font Editor, focus is directed towards being as basic/minimal as
> possible while illustrating the would-be approach for real-world
> use/standards/convention.

## Designing a Font

Here's what you need to know before designing a PixSim font using the
[Font Editor](https://henryhale.github.io/pixsim/font.html). The following are
some of the important controls;

-   `cols`: represents **the width of a character**. Adjust it accordingly for
    each character. Adding line or character spacing for each character is not
    recommended. The text renderer will take care of that.
-   `rows`: represents **the height of a character**. **Keep this value constant
    for all characters**. Why? For now, it ensures that the line height of the
    text matches for all characters and therefore easy to track and render text
    on a new line.
-   `invert`: switches selected pixels off and vice versa. Be sure that this
    affects the exported font and it's not recommended to change it's default
    state.
-   `reset`: useful for resetting the display before working on a new character
-   `size`: useful for viewing a character at different scales. This is not
    exported as a part of the font.
-   Theming: just like `size`, it's not exported; that's for you

### Default Font

Once the Font Editor is loaded, the default font - **Penta** illustrates the
nature and design of characters. It is 5-pixel bitmap font which means that each
character has a maximum height of 5 filled pixels. Letter and line spacing is
not included for each character. View font file:
[Penta](../source/font/Penta.font.json)

### New Font

To design a **new** font with this tool;

1. Select the character to design
2. Adjust the display's properties to appropriate size: mainly `cols`
3. Create a graphical representation of the character by toggling on appropriate
   pixels
4. Click `Save` to save the character
5. Repeat steps 1-4 for all characters
6. Under the `Metadata` section, fill in the details
7. Select `Export Font` under the `Menu` section to download & save the font
   locally.

### Update Existing Font

To modify an already exported font;

1. Select `Load Font` under the `Menu` section
2. A file access window will popup, locate and select the font file
3. Now, follow the [above steps](#new-font) to modify characters in the font
4. To preview the font, select `Refresh` under `Font Preview` section.

## Implementation

The font editor's source code under [source/font/](../source/font/) and
[font.html](../font.html).

## Live Demo

-   [Font Editor :rocket:](https://henryhale.github.io/pixsim/font.html)

## References

-   [Glyph - Wikipedia](https://wikipedia.org/wiki/Glyph)
-   [Font - Wikipedia](https://wikipedia.org/wiki/Font)
-   [Font Editor - Wikipedia](https://wikipedia.org/wiki/Font_editor)
-   [Computer Font - Wikipedia](https://wikipedia.org/wiki/Computer_font)
-   [Font rasterization - Wikipedia](https://wikipedia.org/wiki/Font_rasterization)
-   [Font Hinting - Wikipedia](https://wikipedia.org/wiki/Font_hinting)
-   [Kerning - Wikipedia](https://wikipedia.org/wiki/Kerning)
-   [Bitmap, pixel, screen fonts - Dafont](https://www.dafont.com/bitmap.php)
-   [Tiny5 Font - GitHub](https://github.com/Gissio/font_tiny5)
