const uuids = new Set<string>()

export function createUUID(): string {
	const uuid = () => 't' + Math.floor((Math.random() * 9e9)).toString(32)
	let id
	do {
		id = uuid()
	} while (uuids.has(id))
	uuids.add(id)
	return id
}