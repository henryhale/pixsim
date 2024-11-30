# 👾 [PixSim](./index.md) | Image Generator

## Overview

A basic and yet powerful application of the display unit's grid of pixels is
image generation. You can design anything toggling specific pixels and then
export the image in SVG or PNG format.

The process involves transforming the pixel states into a bitmap which is then
transformed into squares whose size is equal to an individual pixel's. The
square is colored basing on the current theme. For PNG/JPEG/WEBP, the squares are rendered
on an Offscreen canvas element, transformed into a Blob of type `image/png` or `image/jpeg` or `image/webp` and
finally downloaded. In case of SVG, `<rect>` elements are used to create pixel
representations, then to a blob of type `image/svg+xml` and finally downloaded.

## Implementation

The source code for the image generation tool is located under
[source/img folder](https://github.com/henryhale/pixsim/blob/master/source/img/) and [img.html](https://github.com/henryhale/pixsim/blob/master/img.html).

## Live Demo

-   🚀 [Image Generator](https://henryhale.github.io/pixsim/img.html)

## References

-   [Offscreen Canvas - MDN](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas)
-   [Scalable Vector Graphics - MDN](https://developer.mozilla.org/en-US/docs/Web/SVG)
