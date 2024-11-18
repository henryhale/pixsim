// Bresenham's Line Algorithm
// -    https://wikipedia.org/wiki/Bresenham%27s_line_algorithm
export function bresenhamLine(x0: number, y0: number, x1: number, y1: number): number[][] {
	// array to store the points on the line
    const points: number[][] = []
	// difference in x
    let dx = Math.abs(x1 - x0)
	// difference in y
    let dy = Math.abs(y1 - y0)
	// step in x direction
    let sx = (x0 < x1) ? 1 : -1
	// step in y direction
    let sy = (y0 < y1) ? 1 : -1
	// initial error term
    let err = dx - dy

    while (true) {
		// add the current point to the array
        points.push([x0, y0])

		// if we've reached the destination point, stop
        if (x0 === x1 && y0 === y1) break

        // calculate the error term and adjust the coordinates
        let e2 = 2 * err

        if (e2 > -dy) {
            err -= dy
            x0 += sx
        }
        if (e2 < dx) {
            err += dx
            y0 += sy
        }
    }

    return points
}

// Midpoint Circle Algorithrm: an extension of Bresenham's line algorithm
// -    https://en.wikipedia.org/wiki/Midpoint_circle_algorithm
// -    https://rosettacode.org/wiki/Bitmap/Midpoint_circle_algorithm
// Customized for drawing arcs
export function bresenhamArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number): number[][] {
    const points: number[][] = []

    // normalize angles to be within [0, 360]
    startAngle = (startAngle % 360 + 360) % 360
    if (endAngle !== 360) endAngle = (endAngle % 360 + 360) % 360

    // handle crossing 360 degrees (start > end case)
    const crosses360 = startAngle > endAngle

    function addPoint(x: number, y: number) {
        // all points in 8 octants
        const expectedPoints = [
            [+x, +y],
            [-x, +y],
            [+x, -y],
            [-x, -y],
            [+y, +x],
            [-y, +x],
            [+y, -x],
            [-y, -x],
        ]

        // determine what point to plot
        for (const point of expectedPoints) {
            const [px, py] = point
            // calculate the angle of the current point (x, y) in radians, and convert to degrees
            let angle = Math.atan2(py, px) * (180 / Math.PI)
            // normalize angle to [0, 360)
            angle = (angle + 360) % 360

            // check if the angle is within the range
            if (crosses360) {
                // handle cases where the angle range crosses 360 (e.g., startAngle = 350, endAngle = 10)
                if (angle >= startAngle || angle <= endAngle) {
                    points.push([cx + px, cy + py])
                }
            } else {
                if (startAngle <= angle && angle <= endAngle) {
                    points.push([cx + px, cy + py])
                }
            }
        }
    }

    // initialize decision parameter
    let p = 3 - 2 * r 

    // start at the top of the circle (0, r)
    let dx = 0
    let dy = r

    while (dx <= dy) {
        addPoint(dx, dy)

        if (p <= 0) {
            p = p + 4 * dx + 6
        } else {
            p = p + 4 * (dx - dy) + 10
            dy--
        }

        dx++
    }

    return points
}
