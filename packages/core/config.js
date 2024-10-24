import { ref } from "../shared"

const defaultOptions = {
	root: document.body,

	// reactive values 
	rows: 0,
	cols: 0,
	size: 10,
	active: false,
	controls: false,
	collapse: true,
	theme: "default"
}

export function defineConfig(options = {}) {
	const result = {}
	let val
	for (const [key,value] of Object.entries(defaultOptions)) {
		if (Object.prototype.hasOwnProperty.call(options, key)) {
			val = options[key]
		} else {
			val = value
		}
		switch (typeof value) {
			case 'boolean':
				result[key] = ref(!!val)
				break;
			case 'number':
				result[key] = ref(Number(val))
				break;
			case 'string':
				result[key] = ref(String(val))
				break;
			default:
				result[key] = val
				break;
		}
	}
	return result
}