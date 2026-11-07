import { describe, expect, it } from 'vitest';
import { homeStructuredData, jsonLd, knownRoutes, sitemapUrls, sitemapXml } from './seo.ts';
import { placeholderProgramme, type Programme } from './sessionize.ts';

/** Every page route in the app, e.g. `/code-of-conduct/internal`. */
const pageRoutes = Object.keys(import.meta.glob('/src/routes/**/+page.svelte')).map(
	(file) => file.replace('/src/routes', '').replace(/\/\+page\.svelte$/, '') || '/'
);

const publishedProgramme: Programme = {
	...placeholderProgramme,
	isPlaceholder: false,
	sessions: [{ id: '1' } as Programme['sessions'][number]]
};

describe('sitemap', () => {
	it('knows about every page, so none is left out by accident', () => {
		expect([...knownRoutes].sort()).toEqual([...pageRoutes].sort());
	});

	it('lists the same absolute URLs as the canonical links: apex host, no trailing slash', () => {
		const urls = sitemapUrls(publishedProgramme);
		expect(urls).toContain('https://dddsouthwest.com/');
		expect(urls).toContain('https://dddsouthwest.com/venue');
		for (const url of urls) expect(url).toMatch(/^https:\/\/dddsouthwest\.com(\/|(\/[a-z-]+)+)$/);
	});

	it('leaves out the programme pages until the programme is published', () => {
		expect(sitemapUrls(placeholderProgramme)).not.toContain('https://dddsouthwest.com/schedule');
		expect(sitemapUrls(publishedProgramme)).toContain('https://dddsouthwest.com/schedule');
	});

	it('keeps the programme pages listed while Sessionize is unreachable', () => {
		const urls = sitemapUrls({ ...placeholderProgramme, isUnavailable: true });
		expect(urls).toContain('https://dddsouthwest.com/schedule');
		expect(urls).toContain('https://dddsouthwest.com/speakers');
	});

	it('lists each programme page by its own content', () => {
		const urls = sitemapUrls(publishedProgramme);
		expect(urls).toContain('https://dddsouthwest.com/schedule');
		expect(urls).not.toContain('https://dddsouthwest.com/speakers');

		const withSpeakers = sitemapUrls({
			...publishedProgramme,
			speakers: [{ id: 's' } as Programme['speakers'][number]]
		});
		expect(withSpeakers).toContain('https://dddsouthwest.com/speakers');
	});

	it('never lists the unlisted pages', () => {
		expect(sitemapUrls(publishedProgramme)).not.toContain(
			'https://dddsouthwest.com/code-of-conduct/internal'
		);
	});

	it('renders a sitemaps.org urlset', () => {
		expect(sitemapXml(['https://dddsouthwest.com/venue'])).toContain(
			'<url><loc>https://dddsouthwest.com/venue</loc></url>'
		);
	});
});

describe('structured data', () => {
	it('describes the organisation, the site and the event', () => {
		const graph = (homeStructuredData() as { '@graph': { '@type': string }[] })['@graph'];
		expect(graph.map((node) => node['@type'])).toEqual(['Organization', 'WebSite', 'Event']);
	});

	it('cannot close its script tag early', () => {
		expect(jsonLd({ text: '</script><script>' })).not.toContain('</script>');
	});
});
