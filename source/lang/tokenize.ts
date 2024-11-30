export function tokenize(s: string): string[] {
	return s.trim().replace(/\s+/g, ' ').split(' ').filter(token => token.length > 0)
}