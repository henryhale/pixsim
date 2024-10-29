export function int(value: string | number, fallback = 0) {
	const x = parseInt(`${value}`)
	return Number.isNaN(x) ? fallback : x
}

export function inBound(x: number, min: number, max: number): boolean {
	return x >= min && x < max
}

export function limit(x: number, min: number, max: number): number {
	x = parseInt('' + x, 10)
	return Math.max(min, Math.min(x, max))
}

export function* range(last: number, first = 0, step = 1) {
	for (let i = first; i < last; i += step) {
		yield i
	}
}

export function tobin(d: number, len = 0): string {
	const bits = []
	while(d > 0) {
		let r = d % 2
		bits.unshift(r)
		d = Math.floor(d / 2)
	}
	return bits.join('').padStart(len, '0')
}
