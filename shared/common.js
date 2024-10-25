export function inBound(x, min, max) {
	return x >= min && x < max
}

export function limit(x, min, max) {
	x = parseInt('' + x, 10)
	return Math.max(min, Math.min(x, max))
}

export function* range(last, first = 0, step = 1) {
	for (let i = first; i < last; i += step) {
		yield i
	}
}

