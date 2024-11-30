# 👾 PixSim | Text Rendering

## Overview

This module is limited to how render characters of the [charset](./charset.md)
to the [display unit](./display-unit.md).

Before rendering starts, the following are required/needed in memory (for the
simulation);

-   Current Font (bitmap font)
-   Position (point from which the text is rendered)
-   Text data (string of characters to render)

> In the modern systems, other parameters maybe supplied for example;
>
> -   text width
> -   text alignment
> -   bold / italics / emphasized
> -   text color
> -   text wrap
> -   text underline
> -   ...and many more These are left out of the simulation for simplicity.

The rendering process takes the following steps;

-   move the specified initial position
-   for each character in the text:
    -   get character's bitmap from font
    -   for each row:
        -   sequentially traverse columnssetting `on` or `off` depending on
            column value(0/1)

The text rendering engine is actually ~~naively~~ implemented as a builtin
macros for this simulation. It actually processes the parameters are runtime,
generates binary code for rendering characters.

Example:

```
; print a character - 'A'
; from point (10, 12)

@DRAWTEXT 10 12 'A'

; print a string - 'HELLO!'
; from point (10, 20)

@DRAWTEXT 10 20 'HELLO!'
```

## Implementation

The source code for text rendering is located under
[source/text folder](../source/text/).

## Live Demo

-   [Example: Text Macros :rocket:](<https://henryhale.github.io/pixsim/lang.html?c=%7B%22code%22:%22;%20program:%20macros(text)%5Cn%5Cn;%20macro%20statements%20begin%20with%20'@'%20sign%5Cn%5Cn;%20text%20macros%20with%20examples%5Cn%5CnRESET%20;%20clear%20screen%5Cn%5Cn;%20print%20a%20character%20from%20pixsim%20charset%5Cn;%20from%20point%20(10,%2012)%5Cn;%20character%20-%20A%5Cn@DRAWTEXT%2010%2012%20'A'%5Cn%5Cn;%20print%20a%20string%5Cn;%20from%20point%20(10,%2020)%5Cn@DRAWTEXT%2010%2020%20'HELLO!'%5Cn%5Cn%22,%22rows%22:64,%22cols%22:64,%22size%22:6%7D>)

## References

-   [Font rasterization - Wikipedia](https://wikipedia.org/wiki/Font_rasterization)
