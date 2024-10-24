# Guide

### 1. Basic Manipulations
- `SETX <value>`: Sets the x-coordinate of the cursor.
- `SETY <value>`: Sets the y-coordinate of the cursor.
- `MOVX <value>`: Moves the cursor by `<value>` horizontally.
- `MOVY <value>`: Moves the cursor by `<value>` vertically.
- `COLOR <0/1>`: Switches the pixel at the cursor's position _on_ - `1` or _off_ - `0`
<!-- - `GETQ`: Retrives and stores the state of the current pixel to the accumulator -->

### 2. Inverting and Resetting
- `INVERT`: Inverts all pixels in the grid switching `1` to `0` and vice versa.
- `RESET`: Resets all pixels in the grid to `0`.
- `IRESET`: Sets all pixels in the grid to `1`.

### 3. Drawing Functions
<!-- - `DRAWLINE <x1> <y1> <x2> <y2>`: Draws a line from (`<x1>`, `<y1>`) to (`<x2>`, `<y2>`) using Bresenham's line algorithm. -->
- `FILLRECT <x> <y> <w> <h>`: Draws a filled rectangle defined by the corners (`<x>`, `<y>`) and (`<x>`+`<w>`, `<y>`+`<h>`).
- `STROKERECT <x> <y> <w> <h>`: Draws a outlined rectangle defined by the corners (`<x>`, `<y>`) and (`<x>`+`<w>`, `<y>`+`<h>`).
<!-- - `FILLCIRCLE <x> <y> <r>`: Draws a filled circle centered at (`<x>`, `<y>`) with the given radius `<r>`. -->

### 4. Transformations
- `ROTATE <value>`: Rotates the bitmap grid by the specified number of degrees (e.g., 90, 180, 270).
