# Font System

## Overview

This modules describes the font system that specifies the nature of PixSim
fonts, font file format and graphical representaion of
[supported characters](./charset.md#character-set). A guide to create a custom
font is included.

## Font Structure

Every character in the [charset](./charset.md#character-set) is represented as a
bitmap. The bitmap describes the graphical representation of a single
character - details on how it will be rendered.

> **Why bitmaps?**
>
> Modern fonts like scalable fonts such as TrueType fonts are stored as
> mathematical vector descriptions. These are eventually transformed into
> bitmaps for rendeing on the screen(toggling on/off pixels).
>
> For simplicity as well as fundamental understanding, bitmaps are prefered
> without further abstractions.

A font file consists of metadata about the font itself as well as glyphs of all
characters in a single `.font.json` file. It contains a JSON string with a
structure corresponding to the default font:
[Penta](https://github.com/henryhale/pixsim/blob/master//source/font/files/Penta.font.json).

```json
{
	"name":"Penta",
	"author":"Henry Hale",
	"date":"Thu Nov 28 2024",
	"codes":{
		"100000":"[[1,0,1],[1,0,1],[1,0,1],[1,0,1],[0,1,0]]",
		...
	}
}
```

Breakdown of the font file schema:

-   `name` - name of the font
-   `author` - name of the author and optionally - website and/or copyright info
-   `date` - the date the font was created or last updated
-   `codes` - an object whose keys correspond to a character's unique binary
    code from the [charset](./charset.md#character-set)

> **NOTE**
>
> Technically, computer font files are typically stored in binary format. They
> contain information necessary to render and display typefaces on screens or
> print. For example;
>
> -   font name (e.g. "Times New Roman")
> -   font style (e.g. "Bold" or "Italic" or "Regular")
> -   font version
> -   author/designer & copyright info
> -   font metrics (spacing, kerning, and more)
> -   glyph outlines (vector shapes or bitmaps)
> -   hinting (for rendering at small sizes)
>
> Unlike modern approaches, focus is directed towards being as minimal or basic
> as possible while illustrating original approaches to real-world font system
> standards or conventions.

## Font Editor

The [font editor application](https://henryhale.github.io/pixsim/app/font.html)
is a tool designed for creating and managing bitmap fonts for the
[display simulator](https://henryhale.github.io/pixsim/app/font.html) basing on
it's [character set](./charset.md).

### Features

-   **Real-time design**: The editor provides features to visually edit
    character bitmaps, manage character sets, and preview the font in real-time.
-   **Export fonts**: The tool allows exporting the designed font in a compact
    format, including essential metadata like character dimensions and mapping
    to [character codes](./charset.md#character-codes). This ensures
    compatibility with the simulator's rendering engine while minimizing file
    size.
-   **Update fonts**: Additionally, the editor supports importing previously
    exported fonts for further modifications or updates, enabling iterative font
    design and refinement.

## Designing a Font

Here's what you need to know before designing a PixSim font using the
[Font Editor](https://henryhale.github.io/pixsim/app/font.html). The following
are some of the important controls;

-   `cols`: represents **the width of a character**. Adjust it accordingly for
    each character. Adding line or character spacing for each character is not
    recommended. The text renderer will take care of that.
-   `rows`: represents **the height of a character**.
    -   Keep this value **constant for all characters**.
    -   Why? For now, it ensures that the line height of the text matches for
        all characters and therefore easy to track and render text on a new
        line.
-   `invert`: switches selected pixels off and vice versa. Be sure that this
    affects the exported font and it's not recommended to change it's default
    state.
-   `reset`: useful for resetting the display before working on a new character.
-   `size`: useful for viewing a character at different scales. This is not
    exported as a part of the font.
-   `theme`: just like `size`, it's not exported; that's for you.

### Default Font

Once the Font Editor is loaded, the default font - **Penta** illustrates the
nature and design of characters. It is 5-pixel bitmap font which means that each
character has a maximum height(rows) of 5 filled pixels. Letter and line spacing
is not included for each character. View font file:
[Penta](https://github.com/henryhale/pixsim/blob/master//source/font/files/Penta.font.json)
by [Henry Hale](https://github.com/henryhale).

### New Font

To design a **new** font with this tool;

1. Select the character to design
2. Adjust the display's properties to appropriate size: mainly `cols`
3. Create a graphical representation of the character by toggling appropriate
   pixels
4. Click `Save` to save the character
5. Repeat steps 1-4 for all characters
6. Under the `Metadata` section, fill in the details
7. To preview and confirm the font, select `Refresh` under `Font Preview`
   section.
8. Select `Export Font` under the `Menu` section to download & save the font
   locally.

### Update Existing Font

To modify an already exported font;

1. Select `Load Font` under the `Menu` section
2. A file access window will popup, locate and select the font file
3. Now, follow the [above steps](#new-font) to modify characters in the font.
4. To preview the font, select `Refresh` under `Font Preview` section.

### Font Usage

To view your exported font in action for example rendering a string or some
text;

1. Head over to
   <a target="_blank" href="https://henryhale.github.io/pixsim/app/index.html">PixSim
   Language playground</a>
2. Under `Assembly Code` section, select `blank` on example dropdown
3. Go to the `Settings` section, select `Add PixSim Font`
4. A file explorer will pop up, locate and select your exported font file
5. Locate and select your font under the dropdown menu adjacent to the
   `Add PixSim Font` button
6. Clear and write the following code in the Assembly code textarea:

    ```asm
    DRAWTEXT 0 0 'HELLO WOLRD!'
    ```

7. Finally, click `Assemble` and then `Run` to execute the code - you should be
   able to see the text rendered using your font.

## Live Demo

-   🚀 [Font Editor](https://henryhale.github.io/pixsim/app/font.html)

## Implementation

View source on GitHub:
[source/font/](https://github.com/henryhale/pixsim/blob/master/source/font/)

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
