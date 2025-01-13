# Display System

## Overview

Display devices like screens, projectors and more output information visually.
This simulation is focused on monitors/screens - just like the one on your
mobile phone.

Fundamentally, screens are made up of a grid of thousands of tiny
[Light Emitting Diodes (LED)](https://wikipedia.org/wiki/LED_display). Think of
it as a table of many cells where each cell is tiny that you can't distinctly
identify one with a naked eye; you may use your phone's camera - zooming in on a
specific area on the desktop monitor or a microscope can do just fine.

## LED Matrix

This module basically simulates a simple screen providing a customizable
interface with a grid of pixels.

The following conventions will be utilized:

-   the top-left is (0,0) such that pixel coordinates increase in the right and
    down directions (e.g. that the pixel at (7,4) is directly above the pixel at
    (7,5))
-   the pixel centers have integer coordinates.

### Features

-   Initializing a grid of pixels
-   Manipulation of pixel one at a time (toggling on/off)
-   Customization: size and color/theme of the pixels
-   Keyboard navigation when active;
    -   Arrow keys - for navigation: <kbd>UP</kbd>, <kbd>DOWN</kbd>,
        <kbd>LEFT</kbd>, <kbd>RIGHT</kbd>
    -   <kbd>Space</kbd> or <kbd>Enter</kbd> - toggle a pixel's state

## Display API

### Static Elements

The display's interface consists of the following;

-   `rows`: number of rows (height of the display)
-   `cols`: number of columns/pixels per row (width of the display)

To create a new display unit, the dimensions (cols & rows) are required.

Other features included for personalization:

-   `size`: the dimensions of the square-shaped pixel
-   `grid`: whether or not to show gaps between each pixel
-   `theme`: specifies the color scheme of the pixels, default is black(off) and
    white(on)

### Actions

Think of these as commands that the display unit can handle;

-   `set(x,y,state)`: manipulate a pixel at a specified location
-   `reset()`: turns off/on all the pixels on the display
-   `invert()`: toggles the state of each pixel to the opposite state

The display unit is the core components in this simulation. Other components do
their work and direct the output to this module.

## Display Rendering

All display operations are synchronous. When the state of a pixel is changed, an
update to re-render the state of the pixel is triggered immediately thereafter.
For a batch of pixels, it is handled as a sequence or queue updating one by one
until the end.

## Usage Guide

Here is how to use the
[display unit](https://henryhale.github.io/pixsim/app/display.html);

-   Select one pixel
-   Click or use <kbd>Space</kbd> or <kbd>Enter</kbd> to toggle a pixel's state
-   **PRO**: Use arrow keys: <kbd>UP</kbd>, <kbd>DOWN</kbd>, <kbd>LEFT</kbd>,
    <kbd>RIGHT</kbd> for quick navigation

## Implementation

View source on GitHub:
[source/core/](https://github.com/henryhale/pixsim/blob/master/source/core/)

## References

-   [LED Display - Wikipedia](https://wikipedia.org/wiki/LED_display)
