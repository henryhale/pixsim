function tobin(d, len) {
	const bits = []
	while(d > 0) {
		let r = d % 2
		bits.unshift(r)
		d = Math.floor(d / 2)
	}
	return bits.join('').padStart(len, '0')
}

const all = ' 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ.:,;()*!?<>/|[]=+-_{}#$^"`\''

const set = []

for (let i = 0; i < all.length; i++) {
	set.push({
		bin: tobin(i, 6),
		dec: i,
		char: all[i]
	})
}

export default set
