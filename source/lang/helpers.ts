// https://wikipedia.org/wiki/Bresenham%27s_line_algorithm
export function bresenham(x0: number, y0: number, x1: number, y1: number): number[][] {
	// array to store the points on the line
    const points = []; 
	// difference in x
    let dx = Math.abs(x1 - x0); 
	// difference in y
    let dy = Math.abs(y1 - y0); 
	// step in x direction
    let sx = (x0 < x1) ? 1 : -1; 
	// step in y direction
    let sy = (y0 < y1) ? 1 : -1; 
	// initial error term
    let err = dx - dy;

    while (true) {
		// add the current point to the array
        points.push([x0, y0]);

		// if we've reached the destination point, stop
        if (x0 === x1 && y0 === y1) break;

        // calculate the error term and adjust the coordinates
        let e2 = 2 * err;

        if (e2 > -dy) {
            err -= dy;
            x0 += sx;
        }
        if (e2 < dx) {
            err += dx;
            y0 += sy;
        }
    }

    return points;
}
