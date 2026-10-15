export const eventYear = 2027;
export const eventYearTwoDigit = eventYear - 2000;

export const sessionizeJsonApiUrl = ''; //'https://sessionize.com/api/v2/5mpx9tl7';
export const sessionizeEmbeddedCodeApiUrl = ''; //'https://sessionize.com/api/v2/rp6vdsbs';
export const sessionizePublicCallForPapersUrl = `https://sessionize.com/ddd-south-west-${eventYear}/`;

export const showSponsors = true;

export const votingUrl = ''; //	'https://docs.google.com/forms/d/e/1FAIpQLSdI__OzLl1DEsJ3vzIfRadW4mkyv1XJz-so5H85Shcni5Gd_A/viewform';
export const ticketTailorUrl = ''; //'https://buytickets.at/dddsouthwest/2148747/r/dddsw-website';
export const pocketdddUrl = `https://pocket${eventYear}.dddsouthwest.com`;

export const event = {
	name: 'Developer! Developer! Developer! South West',
	shortName: 'DDDSW',
	tagline: 'A friendly, community-run conference for software developers',
	year: eventYear,
	contactEmail: 'management@dddsouthwest.com',
	sponsorshipEmail: 'sponsorship@dddsouthwest.com',
	/** Public address of the site, used where we need a full link. No trailing slash. */
	siteUrl: 'https://dddsouthwest.com'
};

export const social = {
	bluesky: 'https://bsky.app/profile/dddsouthwest.com',
	linkedIn: 'https://www.linkedin.com/company/ddd-south-west/'
} as const;
