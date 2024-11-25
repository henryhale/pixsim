export function createUUID(): string {
	return Math.floor((Math.random() * 9e9)).toString(32)
}