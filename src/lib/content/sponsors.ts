import { eventYear } from '#lib/eventDetails.ts';

export interface SponsorOption {
	title: string;
	price: string;
	preamble?: string;
	description?: string;
	features?: string[];
	/** Set when this item has already been taken for the current year. */
	claimed?: boolean;
}

export interface SponsorSection {
	heading: string;
	intro?: string;
	options: SponsorOption[];
}

export const sponsorSections: SponsorSection[] = [
	{
		heading: 'Packages',
		options: [
			{
				title: 'Supporter',
				price: '£600',
				features: [
					'Your logo on our website',
					'Your logo on the opening and closing slides',
					"We'll thank you on our social media"
				]
			},
			{
				title: 'Exhibitor',
				price: '£1700',
				preamble: 'Everything in Supporter, plus:',
				features: [
					'A sponsor stand on the day',
					'Custom promotional posts from our social media accounts',
					'Anything else we can do... chat to us!'
				]
			}
		]
	},
	{
		heading: 'Refreshments',
		intro: 'With your company name and logo displayed alongside.',
		options: [
			{ title: 'Breakfast', price: '£250' },
			{ title: 'Morning break', price: '£250' },
			{ title: 'Afternoon break', price: '£250' }
		]
	},
	{
		heading: 'Extras',
		options: [
			{
				title: 'Dedicated speaker slot',
				price: '£300',
				description: "We'll allocate a dedicated slot for your speaker to present a relevant topic."
			},
			{
				title: 'T-shirts',
				price: '£400',
				description:
					"We'll print your company name or logo on our t-shirts, worn by staff and speakers."
			}
		]
	}
];

export const sponsorReasons = [
	{
		title: 'Meet the people you want to hire',
		body: 'Talk to the exact people you want to recruit or sell to.'
	},
	{
		title: 'Love from attendees',
		body: "Everyone appreciates that without sponsors, events like this can't happen."
	},
	{
		title: 'Love from the team',
		body: 'We will go out of our way to praise you before, on, and after the day.'
	}
];

export interface Sponsor {
	name: string;
	href: string;
	/** Filename in static/images/sponsors */
	logo: string;
	tier: 'exhibitor' | 'supporter' | 'refreshments';
}

/**
 * Sponsors confirmed for the current year. Only paying sponsors for this year appear on
 * the site. Add the logo to static/images/sponsors and a new entry here once confirmed.
 */
export const sponsors: Sponsor[] = [];

/**
 * Previous sponsors, kept so they can be reinstated quickly. This list is NOT shown on the site.
 *
 * To feature one again once they've sponsored the current year, move their entry from
 * `sponsorArchive` into `sponsors` above (their logo is already in static/images/sponsors/).
 */
export const sponsorArchive: Sponsor[] = [
	{ name: 'SECCL', href: 'https://seccl.tech/', logo: 'seccl.png', tier: 'exhibitor' },
	{
		name: 'Rock Solid Knowledge',
		href: 'https://www.rocksolidknowledge.com/',
		logo: 'rocksolid.png',
		tier: 'exhibitor'
	},
	{
		name: 'UK Hydrographic Office',
		href: 'https://www.gov.uk/government/organisations/uk-hydrographic-office',
		logo: 'UKHO.png',
		tier: 'exhibitor'
	},
	{ name: 'ClearBank', href: 'https://clear.bank/', logo: 'ClearBank logo.png', tier: 'exhibitor' },
	{
		name: 'iO Associates',
		href: 'https://www.ioassociates.co.uk/',
		logo: 'io.png',
		tier: 'exhibitor'
	},
	{
		name: 'Howden',
		href: 'https://www.howdengroup.com/uk-en',
		logo: 'howden.png',
		tier: 'exhibitor'
	},
	{ name: 'Umbraco CMS', href: 'https://umbraco.com/', logo: 'umbraco.png', tier: 'exhibitor' },
	{
		name: 'NDC Conferences',
		href: 'https://ndcconferences.com/',
		logo: 'ndc.png',
		tier: 'supporter'
	},
	{
		name: 'Flagstone',
		href: 'https://www.flagstoneim.com/',
		logo: 'flagstone.png',
		tier: 'supporter'
	},
	{
		name: 'JetBrains',
		href: 'https://www.jetbrains.com/',
		logo: 'jetbrains.png',
		tier: 'supporter'
	},
	{
		name: 'Avanade',
		href: 'https://www.avanade.com/en-gb',
		logo: 'avanade.png',
		tier: 'refreshments'
	},
	{
		name: 'ALD Automotive',
		href: 'https://www.aldautomotive.com/',
		logo: 'ald.png',
		tier: 'refreshments'
	},
	{
		name: 'Elastic Mint',
		href: 'https://www.elasticmint.com/',
		logo: 'elasticmint.png',
		tier: 'refreshments'
	},
	{ name: 'BJSS', href: 'https://www.bjss.com/', logo: 'bjss.jpg', tier: 'refreshments' },
	{
		name: 'Just Eat Takeaway.com',
		href: 'https://careers.justeattakeaway.com/global/en/c/tech-product-jobs',
		logo: 'justeat.png',
		tier: 'refreshments'
	},
	{ name: 'dxw', href: 'https://www.dxw.com/', logo: 'dxw.png', tier: 'refreshments' }
];

/** Links to sponsors carry tracking parameters so they can see traffic from DDDSW. */
export function sponsorUrl(href: string, year: number): string {
	const params = new URLSearchParams({
		ref: 'ddd-south-west',
		utm_source: 'ddd-south-west',
		utm_medium: 'sponsorship',
		utm_campaign: String(year)
	}).toString();
	return href.includes('?') ? `${href}&${params}` : `${href}?${params}`;
}

export function bossEmail(
	contact: string,
	sponsorsUrl: string,
	year: number = eventYear
): { subject: string; body: string } {
	return {
		subject: `Sponsoring DDD South West ${year}`,
		body: `Hi,

I'd love for us to sponsor DDD South West, a free, volunteer-run conference for software developers in the South West.

Why it's worth it:
- It puts us in front of the developers we'd like to hire.
- Our own team gets great talks and new ideas, and attendance is free.
- The event is funded entirely by sponsors, so it only happens with companies like us backing it.

You can see the sponsorship packages here: ${sponsorsUrl}

Or you can reach the organisers at ${contact}.

Could we talk about it this week?

Thanks!`
	};
}
