export const eventYear = 2027;

export const sessionizeJsonApiUrl = ''; //'https://sessionize.com/api/v2/5mpx9tl7';
export const sessionizePublicCallForPapersUrl = `https://sessionize.com/ddd-south-west-${eventYear}/`;

export const showSponsors = true;

/** Package prices are kept in the content but hidden publicly. */
export const showSponsorPrices = false;

export const votingUrl = ''; //	'https://docs.google.com/forms/d/e/1FAIpQLSdI__OzLl1DEsJ3vzIfRadW4mkyv1XJz-so5H85Shcni5Gd_A/viewform';
export const ticketTailorUrl = ''; //'https://buytickets.at/dddsouthwest/2148747/r/dddsw-website';
export const pocketdddUrl = `https://pocket${eventYear}.dddsouthwest.com`;

export const event = {
	name: 'Developer! Developer! Developer! South West',
	shortName: 'DDDSW',
	tagline: 'A friendly, community-run conference for software developers',
	year: eventYear,
	/** Leave a field null until announced: the site shows "To be confirmed". */
	venue: {
		name: 'Sloane Robinson Building',
		city: 'Bristol',
		address:
			'University of Bristol, Temple Quarter Enterprise Campus, Cattle Market Road, Bristol, BS1 6AZ',
		venuesUrl:
			'https://www.bristol.ac.uk/venues/meetings/temple-quarter-enterprise-campus-the-sloane-robinson/'
	} as {
		name: string | null;
		city: string | null;
		address?: string;
		venuesUrl?: string;
	},
	contactEmail: 'management@dddsouthwest.com',
	sponsorshipEmail: 'sponsorship@dddsouthwest.com',
	/** Public address of the site, used where we need a full link. No trailing slash. */
	siteUrl: 'https://dddsouthwest.com'
};

export const social = {
	bluesky: 'https://bsky.app/profile/dddsouthwest.com',
	linkedIn: 'https://www.linkedin.com/company/ddd-south-west/'
} as const;

export const links = {
	/** Registration URL for free tickets (DDDSW is free). Empty shows a "not available yet" state. */
	tickets: ticketTailorUrl,
	callForPapers: sessionizePublicCallForPapersUrl,
	/** Session voting form URL. Empty until voting opens. */
	voting: votingUrl
};
