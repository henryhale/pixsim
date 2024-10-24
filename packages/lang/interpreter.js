import { inBound, range } from "../shared"

export function interpret(code, context) {
	const { grid } = context

	// initialize state
	const scope = {
		// registers
		reg: {
			x: 0,
			y: 0,
		},
		// user defined variables
		data: {}
	}

	// function mappings
	const fnmap = {
		setx: x => scope.reg.x = x,
		movx: x => scope.reg.x += x,

		sety: y => scope.reg.y = y,
		movy: y => scope.reg.y += y,

		color: v => grid.set(scope.reg.x, scope.reg.y, v),

		invert: () => grid.invert(),
		reset: () => grid.reset(false),
		ireset: () => grid.reset(true),

		fillrect: (x,y,w,h) => {
			for (const dy of range(h)) {
				for (const dx of range(w)) {
					grid.set(x + dx, y + dy, true)
				}
			}
		},
		strokerect: (x,y,w,h) => {
			for (const dy of range(h)) {
				for (const dx of range(w)) {
					const isedge = dy == 0 || dx == 0 || dx + 1 == w || dy + 1 == h
					if (!isedge) continue
					grid.set(x + dx, y + dy, true)
				}
			}
		},

		rotate: (deg) => {
			const rad = Math.PI * deg / 180
			const bitmap = grid.bitmap()
			const width = bitmap[0].length
			const height = bitmap.length
			const cx = width / 2
			const cy = height / 2
			const nxt = new Array(height).fill(null).map(x => new Array(width))
			for (const y of range(height)) {
				for (const x of range(width)) {
					const qx = cx + (x - cx) * Math.cos(rad) - (y - cy) * Math.sin(rad)
					const qy = cy + (x - cx) * Math.sin(rad) + (y - cy) * Math.cos(rad)
					const zx = Math.ceil(qx)
					const zy = Math.ceil(qy)
					if (inBound(zx, 0, width) && inBound(zy, 0, height)) {
						nxt[zy][zx] = grid[y][x]
					}
				}
			}
			const snxt = nxt.toString()
			grid.import(snxt, false)
		}
	}

	// tokenize by newline
	const lines = code.split('\n').map(line => line.trim())

	for (const line of lines) {
		const [fn, ...args] = line.split(' ')
		const cargs = args.map(x => 
		})
	}
	
	function execute({ fn , args}) {
		
	}

	for(const node of nodes) {
		execute(node)
	}
}

