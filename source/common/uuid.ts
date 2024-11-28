export function createUUID(): string {
	return 'x' + Math.floor((Math.random() * 9e9)).toString(32)
}