export const MIN_SIZE = 1
export const MAX_SIZE = 50
export const MAX_ROWS = 255
export const MAX_COLS = 255

const defaultOptions = {
	rows: 0,
	cols: 0,
	size: 10,
	active: false,
	controls: false,
	lines: true,
	theme: "default",
	maxrows: MAX_ROWS,
	maxcols: MAX_COLS,
	maxsize: MAX_SIZE,
}

export type IConfig = typeof defaultOptions
export type IOptions = Partial<IConfig & { [k: string]: string | number | boolean }>

export function defineConfig(options: IOptions = {}): IConfig {
	const result: IOptions = {}
	let val
	for (const [key, value] of Object.entries(defaultOptions)) {
		if (Object.prototype.hasOwnProperty.call(options, key)) {
			val = options[key]
		} else {
			val = value
		}
		result[key] = val
	}
	return result as IConfig
}
