import { eventYear } from '#lib/eventDetails.ts';

export interface SponsorSlot {
	name: string;
	price: string;
	/** Set when this slot has already been taken for the current year. */
	claimed?: boolean;
}

export interface SponsorOption {
	title: string;
	/** Omit when the option is priced per slot instead. */
	price?: string;
	preamble?: string;
	description?: string;
	features?: string[];
	/** Separately priced choices within one card, such as the meals. */
	slots?: SponsorSlot[];
	/** Shown beside the price, for example how many of this option are available. */
	availability?: string;
	/** Draws the card with an orange outline so the main packages stand out. */
	featured?: boolean;
	/** Set when this item has already been taken for the current year. */
	claimed?: boolean;
}

export interface SponsorSection {
	heading: string;
	intro?: string;
	options: SponsorOption[];
}

const inSupporter = 'Everything in Supporter, plus:';

export const sponsorSections: SponsorSection[] = [
	{
		heading: 'Ways to sponsor',
		intro:
			"Here's what you can get involved with, and what you get in return. Add a speaker slot or t-shirts to any package. Not sure what suits you? Drop us a line and we'll help you choose.",
		options: [
			{
				title: 'Friend',
				price: '£200',
				features: ['Your name and link on our sponsors page', 'Thanks in a group social media post']
			},
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
				title: 'Food and drink partner',
				preamble: inSupporter,
				features: ['Your name and logo alongside the one you choose'],
				slots: [
					{ name: 'Breakfast', price: '£750' },
					{ name: 'Morning break', price: '£750' },
					{ name: 'Afternoon break', price: '£750' },
					{ name: 'Lunch', price: '£1,000' }
				]
			},
			{
				title: 'Prize draw partner',
				price: '£750',
				preamble: inSupporter,
				// Draft: the benefit still to be agreed.
				features: ['Your name announced with the prizes']
			},
			{
				title: 'Speaker dinner partner',
				price: '£1,500',
				preamble: inSupporter,
				// Draft: the benefit still to be agreed.
				features: ['Thanks at the speaker dinner']
			},
			{
				title: 'Exhibitor',
				price: '£1,700',
				featured: true,
				preamble: inSupporter,
				features: [
					'A sponsor stand on the day',
					'Custom promotional posts from our social media accounts',
					'Anything else we can do... chat to us!'
				]
			},
			{
				title: 'Room partner',
				price: '£2,500',
				availability: '4 available',
				featured: true,
				preamble: 'Everything in Exhibitor, plus:',
				features: [
					'Your marketing material in your room',
					"Your logo on that room's slide between sessions",
					'Thanks from the room host'
				]
			},
			{
				title: 'Dedicated speaker slot',
				price: '£300',
				description: "We'll allocate a dedicated slot for your speaker to present a relevant topic."
			},
			{
				title: 'T-shirt partner',
				price: '£400',
				description:
					"We'll print your company name or logo on our t-shirts, worn by staff and speakers."
			}
		]
	}
];

/**
 * Seat milestones, shown without any money figures. `reached` is the label once a milestone is
 * secured. Raise `seatMilestonesReached` as each one is: those are shown as done and the next one
 * is highlighted. Set `seatProgressToNext` to fill part of the line towards the next milestone.
 */
export const seatMilestones = [
	{ seats: 150, reached: 'Venue secured' },
	{ seats: 250, reached: 'Reached' },
	{ seats: 330, reached: 'Reached' },
	{ seats: 400, reached: 'Full house' }
];
export const seatMilestonesReached = 0;
/** How far along the line to the next milestone we are, from 0 to 100 (percent). */
export const seatProgressToNext = 0;

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
