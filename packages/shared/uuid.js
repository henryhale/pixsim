const uuids = new Set()

export function createUUID() {
	const uuid = () => 't' + Math.floor((Math.random() * 9e9)).toString(32)
	let id
	do {
		id = uuid()
	} while (uuids.has(id))
	uuids.add(id)
	return id
}