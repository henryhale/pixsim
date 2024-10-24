let subscriber

export function watch(fn) {
	try {
		subscriber = fn
		fn()
	} finally {
		subscriber = null
	}
}

export function ref(val) {
	const subs = new Set()
	return {
		get value() {
			if (subscriber) subs.add(subscriber)
			return val
		},
		set value(n) {
			val = n
			setTimeout(() => subs.forEach(s => s()))
		}
	}
}