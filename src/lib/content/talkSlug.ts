/**
 * The talk's part of a deep link, e.g. /past-events#2025/advanced-debugging opens that talk's
 * details. Made from the title, so changing a title changes its link.
 */
export function talkSlug(title: string): string {
	const slug = title
		.normalize('NFKD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');
	if (slug.length <= 60) return slug;
	// Keep links readable: cut long titles at the last whole word within 60 characters.
	const cut = slug.slice(0, 61);
	return cut.slice(0, cut.lastIndexOf('-'));
}
