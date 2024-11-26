const params = new URLSearchParams(window.location.search)

const v0 = {
	encode: (data: any) =>  {
		const text = JSON.stringify(data)
		return window.location.origin + window.location.pathname + '?c=' + encodeURI(text)
	},
	decode: () => {
		const str = decodeURI(params.get('c') || '')
		return JSON.parse(str)
	}
}

export const url = {
	encode: v0.encode,
	decode: v0.decode
}
