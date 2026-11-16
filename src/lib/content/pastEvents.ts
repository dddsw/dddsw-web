export { talkSlug } from './talkSlug.ts';

export interface Talk {
	speaker: string;
	title: string;
	/** The session abstract, as accepted on Sessionize. Shown behind a "More info" button. */
	description?: string;
	/** Keys into `pastSpeakers`, for the speakers' photos and bios. */
	speakerIds?: string[];
	/**
	 * What the speakers said they did at the time, by id, where it's not what their profile in
	 * `pastSpeakers` says (that's from the most recent year they spoke, and people change jobs).
	 */
	speakerTaglines?: Record<string, string>;
}

export interface CommitteeMember {
	name: string;
	role?: string;
}

export interface SpeakerProfile {
	name: string;
	tagline: string;
}

export interface Sponsor {
	name: string;
	/** Their website, where we know a working one. */
	url?: string;
}

export interface PastEvent {
	year: number;
	title: string;
	/** ISO date (YYYY-MM-DD), or YYYY-MM when only the month is known. */
	date?: string;
	venue?: string;
	summary: string;
	/** Caveat about how complete or reliable the details are. */
	note?: string;
	/** Photos from the day (files under static/). Add them here and a gallery appears on the event's tab. */
	photos?: Photo[];
	/** Last archived copy of the event's website before it was replaced for the next year. */
	archiveUrl?: string;
	/** The event's logo, relative to src/lib/assets/images. When missing, the page shows our cow as a placeholder. */
	logo?: string;
	sponsors?: Sponsor[];
	committee?: CommitteeMember[];
	/** Speakers with a short bio, for years where we don't have talk titles. */
	speakers?: SpeakerProfile[];
	/** From src/lib/content/past/talks/<year>.json. */
	talks?: Talk[];
	url?: string;
}

export interface Photo {
	/** Relative to src/lib/assets/images. */
	src: string;
	alt: string;
}

/**
 * Each year's talks, from src/lib/content/past/talks/<year>.json: Sessionize (2023 onwards) or
 * archived copies of the old site. They're data files so they can be imported, not hand-edited.
 */
const talksFiles = import.meta.glob<Talk[]>('./past/talks/*.json', {
	eager: true,
	import: 'default'
});

/** The talks for each year, by year. */
export const talksByYear: Record<number, Talk[]> = Object.fromEntries(
	Object.entries(talksFiles).map(([path, talks]) => [
		Number(path.match(/(\d{4})\.json$/)![1]),
		talks
	])
);

/**
 * One entry per previous conference (newest first): what we know about each year. Its talks are
 * added from the data files above.
 */
const events: Omit<PastEvent, 'talks'>[] = [
	{
		year: 2026,
		title: 'DDD South West 2026',
		archiveUrl: 'https://web.archive.org/web/20260828223637/https://dddsouthwest.com/',
		sponsors: [
			{ name: 'Seccl', url: 'https://seccl.tech/' },
			{ name: 'Rock Solid Knowledge', url: 'https://www.rocksolidknowledge.com/' },
			{
				name: 'UK Hydrographic Office',
				url: 'https://www.gov.uk/government/organisations/uk-hydrographic-office'
			},
			{ name: 'ClearBank', url: 'https://clear.bank/' },
			{ name: 'Umbraco', url: 'https://umbraco.com/' },
			{ name: 'NDC Conferences', url: 'https://ndcconferences.com/' },
			{ name: 'Flagstone', url: 'https://www.flagstoneim.com/' }
		],
		date: '2026-05-16',
		venue: 'Engine Shed, Station Approach, Temple Meads, Bristol, BS1 6QH',
		committee: [
			{ name: 'Lorraine Pearce' },
			{ name: 'Russell Day' },
			{ name: 'Stuart Lang' },
			{ name: 'Carl Sargunar' },
			{ name: 'Sara Gowen' }
		],
		summary: 'Our last year at Engine Shed.'
	},
	{
		year: 2025,
		title: 'DDD South West 2025',
		archiveUrl: 'https://web.archive.org/web/20251014092017/https://dddsouthwest.com/',
		sponsors: [
			{ name: 'Flagstone', url: 'https://www.flagstoneim.com/' },
			{ name: 'Howdens', url: 'https://www.howdengroup.com/uk-en' },
			{ name: 'iO Associates', url: 'https://www.ioassociates.co.uk/' },
			{ name: 'NDC Conferences', url: 'https://ndcconferences.com/' },
			{ name: 'Umbraco', url: 'https://umbraco.com/' },
			{
				name: 'UK Hydrographic Office',
				url: 'https://www.gov.uk/government/organisations/uk-hydrographic-office'
			}
		],
		date: '2025-04-26',
		venue: 'Engine Shed, Station Approach, Temple Meads, Bristol, BS1 6QH',
		committee: [
			{ name: 'Lorraine Pearce' },
			{ name: 'Russell Day' },
			{ name: 'Stuart Lang' },
			{ name: 'Carl Sargunar' },
			{ name: 'Sara Gowen' }
		],
		summary: 'Back at Engine Shed, with exhibitors and supporters.'
	},
	{
		year: 2024,
		title: 'DDD South West 2024',
		archiveUrl: 'https://web.archive.org/web/20241006092157/https://dddsouthwest.com/',
		photos: [
			{
				src: 'past/2024-1.jpg',
				alt: 'Attendees chatting around sponsor stands in the exhibition area.'
			},
			{
				src: 'past/2024-4.jpg',
				alt: 'A speaker presenting to the audience in Track 1, with attendees on orange tiered seating.'
			},
			{
				src: 'past/2024-3.jpg',
				alt: 'A crew member introducing a session to a packed room.'
			},
			{
				src: 'past/2024-2.jpg',
				alt: 'A smiling, full audience on tiered seating waiting for a talk.'
			},
			{
				src: 'past/2024-6.jpg',
				alt: 'Attendees queuing for the lunch buffet.'
			},
			{
				src: 'past/2024-5.jpg',
				alt: 'Attendees listening to a session in a wood-panelled room.'
			},
			{
				src: 'past/2024-7.jpg',
				alt: 'A panel of speakers wearing DDDSW t-shirts and lanyards on stage.'
			}
		],
		sponsors: [
			{ name: 'BJSS', url: 'https://www.bjss.com/' },
			{ name: 'dxw', url: 'https://www.dxw.com/' },
			{ name: 'Elastic Mint', url: 'https://www.elasticmint.com/' },
			{ name: 'iO Associates', url: 'https://www.ioassociates.co.uk/' },
			{
				name: 'Just Eat Takeaway.com',
				url: 'https://careers.justeattakeaway.com/global/en/c/tech-product-jobs'
			},
			{ name: 'Rock Solid Knowledge', url: 'https://www.rocksolidknowledge.com/' },
			{ name: 'Seccl', url: 'https://seccl.tech/' },
			{
				name: 'UK Hydrographic Office',
				url: 'https://www.gov.uk/government/organisations/uk-hydrographic-office'
			}
		],
		date: '2024-04-27',
		venue: 'Engine Shed, Station Approach, Temple Meads, Bristol, BS1 6QH',
		committee: [
			{ name: 'Lorraine Pearce' },
			{ name: 'Hannah Price' },
			{ name: 'Russell Day' },
			{ name: 'Stuart Lang' },
			{ name: 'Carl Sargunar' },
			{ name: 'Sara Gowen' }
		],
		summary: 'Our third year at Engine Shed.'
	},
	{
		year: 2023,
		title: 'DDD South West 2023',
		archiveUrl: 'https://web.archive.org/web/20231129110122/https://dddsouthwest.com/',
		sponsors: [
			{ name: 'ALD Automotive', url: 'https://www.aldautomotive.com/' },
			{ name: 'Avanade', url: 'https://www.avanade.com/en-gb' },
			{ name: 'BJSS', url: 'https://www.bjss.com/' },
			{ name: 'Elastic Mint', url: 'https://www.elasticmint.com/' },
			{ name: 'iO Associates', url: 'https://www.ioassociates.co.uk/' },
			{
				name: 'Just Eat Takeaway.com',
				url: 'https://careers.justeattakeaway.com/global/en/c/tech-product-jobs'
			},
			{ name: 'Rock Solid Knowledge', url: 'https://www.rocksolidknowledge.com/' },
			{ name: 'Seccl', url: 'https://seccl.tech/' },
			{
				name: 'UK Hydrographic Office',
				url: 'https://www.gov.uk/government/organisations/uk-hydrographic-office'
			}
		],
		date: '2023-04-29',
		venue: 'Engine Shed, Station Approach, Temple Meads, Bristol, BS1 6QH',
		committee: [
			{ name: 'Lorraine Pearce' },
			{ name: 'Martyn Fewtrell' },
			{ name: 'Joseph Woodward' },
			{ name: 'Hannah Price' },
			{ name: 'Russell Day' },
			{ name: 'Stuart Lang' }
		],
		summary: 'A return to Engine Shed on a Saturday in April, after the 2022 event.'
	},
	{
		year: 2022,
		title: 'DDD South West 2022',
		archiveUrl: 'https://web.archive.org/web/20221024054405/https://dddsouthwest.com/',
		sponsors: [
			{ name: 'ALD Automotive', url: 'https://www.aldautomotive.com/' },
			{ name: 'Avanade', url: 'https://www.avanade.com/en-gb' },
			{ name: 'BJSS', url: 'https://www.bjss.com/' },
			{ name: 'ClearBank', url: 'https://clear.bank/' },
			{ name: 'Elastic', url: 'https://www.elastic.co/' },
			{ name: 'Elastic Mint', url: 'https://www.elasticmint.com/' },
			{ name: 'iO Associates', url: 'https://www.ioassociates.co.uk/' },
			{ name: 'Landmark', url: 'https://www.landmark.co.uk/' },
			{ name: 'NDC', url: 'https://ndc-london.com/' },
			{ name: 'Rock Solid Knowledge', url: 'https://www.rocksolidknowledge.com/' },
			{ name: 'Seccl', url: 'https://seccl.tech/' },
			{
				name: 'UK Hydrographic Office',
				url: 'https://www.gov.uk/government/organisations/uk-hydrographic-office'
			},
			{ name: 'Warp', url: 'https://www.warp.co.uk/' }
		],
		committee: [
			{ name: 'Lorraine Pearce' },
			{ name: 'Martyn Fewtrell' },
			{ name: 'Joseph Woodward' },
			{ name: 'Hannah Price' },
			{ name: 'Russell Day' },
			{ name: 'Stuart Lang' }
		],
		date: '2022-06-25',
		venue: 'Engine Shed, Station Approach, Temple Meads, Bristol, BS1 6QH',
		summary:
			'Our first event at Engine Shed, four tracks of talks plus MiniHack sessions and lunchtime lightning talks.',
		note: 'From the draft schedule published before the event, so late changes may not be reflected.'
	},
	{
		year: 2019,
		title: 'DDD South West 2019',
		archiveUrl: 'https://web.archive.org/web/20191206210035/https://dddsouthwest.com/',
		sponsors: [
			{ name: 'ALD Automotive', url: 'https://www.aldautomotive.com/' },
			{ name: 'iO Associates', url: 'https://www.ioassociates.co.uk/' },
			{ name: 'Landmark', url: 'https://www.landmark.co.uk/' },
			{ name: 'NDC London', url: 'https://ndc-london.com/' },
			{ name: 'Scott Logic', url: 'https://www.scottlogic.com/' }
		],
		// Assumed: each was listed on the committee before and after this year.
		committee: [{ name: 'Martyn Fewtrell' }, { name: 'Stuart Lang' }, { name: 'Joseph Woodward' }],
		date: '2019-04-27',
		venue: 'Redcliffe Sixth Form Centre, Redcliff Hill, Bristol BS1 6RB',
		summary: 'Five tracks, including a Women in Technology panel sponsored by Landmark.',
		note: 'From the agenda page as it stood in July 2019.'
	},
	{
		year: 2018,
		title: 'DDD South West 2018',
		archiveUrl: 'https://web.archive.org/web/20180824150431/https://dddsouthwest.com/',
		sponsors: [
			{ name: 'ALD Automotive', url: 'https://www.aldautomotive.com/' },
			{ name: 'Dyson', url: 'https://careers.dyson.com/who-we-are/' },
			{ name: 'endjin', url: 'https://endjin.com/' },
			{ name: 'iO Associates', url: 'https://www.ioassociates.co.uk/' },
			{ name: 'Landmark', url: 'https://www.landmark.co.uk/' },
			{ name: 'NDC London', url: 'https://ndc-london.com/' },
			{ name: 'Scott Logic', url: 'https://www.scottlogic.com/' }
		],
		committee: [
			{ name: 'Rob Bracken' },
			// Martyn Fewtrell, Stuart Lang and Joseph Woodward are assumed: listed before and after this year.
			{ name: 'Martyn Fewtrell' },
			{ name: 'Stuart Lang' },
			{ name: 'Ross Scott' },
			{ name: 'Joseph Woodward' }
		],
		date: '2018-04-21',
		venue: 'Redcliffe Sixth Form Centre, Redcliff Hill, Bristol BS1 6RB',
		summary: 'Held at the Redcliffe Sixth Form Centre.'
	},
	{
		year: 2017,
		title: 'DDD South West 7',
		archiveUrl: 'https://web.archive.org/web/20171223185535/http://www.dddsouthwest.com:80/',
		logo: 'past-logos/2017.webp',
		sponsors: [
			{ name: 'Just Eat', url: 'https://www.just-eat.co.uk/' },
			{ name: 'iO Associates', url: 'https://www.ioassociates.co.uk/' },
			{ name: 'NDC London', url: 'https://ndc-london.com/' },
			{ name: 'Scott Logic', url: 'https://www.scottlogic.com/' },
			{ name: 'Abide Financial' },
			{ name: 'Felinesoft', url: 'https://www.felinesoft.com/' },
			{ name: 'Landmark', url: 'https://www.landmark.co.uk/' },
			{ name: 'Bybox', url: 'https://thinventory.com/' },
			{ name: 'Red Gate', url: 'https://www.red-gate.com/' },
			{ name: 'Ingenium Tutors' }
		],
		committee: [
			{ name: 'Rob Bracken' },
			{ name: 'Martyn Fewtrell' },
			{ name: 'Ross Scott' },
			{ name: 'Juliet Bracken' },
			{ name: 'Joseph Woodward' },
			{ name: 'Stuart Lang' }
		],
		date: '2017-05-06',
		venue: 'Redcliffe Sixth Form Centre, Redcliff Hill, Bristol BS1 6RB',
		summary: 'Four tracks plus a sponsors track.'
	},
	{
		year: 2015,
		title: 'DDD South West 6',
		archiveUrl: 'https://web.archive.org/web/20161209072744/http://www.dddsouthwest.com:80/',
		logo: 'past-logos/2015.webp',
		sponsors: [
			{ name: 'Just Eat', url: 'https://www.just-eat.co.uk/' },
			{ name: 'Equal Experts', url: 'https://www.equalexperts.com/' },
			{ name: 'Mix Radio' },
			{ name: 'NDC', url: 'https://ndc-london.com/' },
			{ name: 'Particular Software', url: 'https://particular.net/' },
			{ name: 'Scott Logic', url: 'https://www.scottlogic.com/' },
			{ name: 'Landmark', url: 'https://www.landmark.co.uk/' },
			{ name: 'Red Gate', url: 'https://www.red-gate.com/' }
		],
		committee: [
			{ name: 'Rob Bracken' },
			{ name: 'Martyn Fewtrell' },
			{ name: 'Ross Scott' },
			{ name: 'Juliet Bracken' }
		],
		date: '2015-04-25',
		venue: 'Redcliffe Sixth Form Centre, Redcliff Hill, Bristol BS1 6RB',
		summary: 'The first year with a sponsors track, where sponsors spoke to attendees directly.'
	},
	{
		year: 2014,
		title: 'DDD South West 5',
		archiveUrl: 'https://web.archive.org/web/20141219082521/http://www.dddsouthwest.com/',
		logo: 'past-logos/2014-south-west-5.webp',
		sponsors: [
			{ name: 'Grey Matter', url: 'https://www.greymatter.com/' },
			{ name: 'Scott Logic', url: 'https://www.scottlogic.com/' },
			{ name: 'Landmark', url: 'https://www.landmark.co.uk/' },
			{ name: 'Red Gate', url: 'https://www.red-gate.com/' },
			{ name: 'Aspose', url: 'https://www.aspose.com/' },
			{ name: 'Nutty About Hosting', url: 'https://www.nuttyabouthosting.co.uk/' },
			{ name: 'Pluralsight', url: 'https://www.pluralsight.com/' }
		],
		committee: [
			{ name: 'Rob Bracken' },
			{ name: 'Martyn Fewtrell' },
			{ name: 'Ross Scott' },
			{ name: 'Juliet Bracken' }
		],
		date: '2014-05-17',
		venue: 'Redcliffe Sixth Form Centre, Redcliff Hill, Bristol BS1 6RB',
		summary:
			"Our first year at St Mary Redcliffe's sixth form centre, ten minutes' walk from Temple Meads."
	},
	{
		year: 2012,
		title: 'DDD South West 4',
		archiveUrl: 'https://web.archive.org/web/20131029074007/http://www.dddsouthwest.com:80/',
		logo: 'past-logos/2012.webp',
		sponsors: [
			{ name: 'University of the West of England (UWE)', url: 'https://www.uwe.ac.uk/' },
			{ name: 'Microsoft', url: 'https://www.microsoft.com/en-gb/' },
			{ name: 'eDevelopment' },
			{ name: 'PlanetRecruit' },
			{ name: 'Grey Matter', url: 'https://www.greymatter.com/' },
			{ name: 'Gibraltar Software', url: 'https://onloupe.com/' },
			{ name: "O'Reilly Media", url: 'https://www.oreilly.com/' },
			{ name: 'Wrox' },
			{ name: 'Pluralsight', url: 'https://www.pluralsight.com/' },
			{ name: 'Syncfusion', url: 'https://www.syncfusion.com/' },
			{ name: 'DevExpress', url: 'https://www.devexpress.com/' },
			{ name: 'TechSmith', url: 'https://www.techsmith.com/' },
			{ name: 'Landmark', url: 'https://www.landmark.co.uk/' },
			{ name: 'ComponentOne', url: 'https://developer.mescius.com/componentone' },
			{ name: 'CODE Magazine', url: 'https://www.codemag.com/' },
			{ name: 'LogicNP', url: 'http://www.ssware.com/' },
			{ name: 'JetBrains', url: 'https://www.jetbrains.com/' },
			{ name: 'Mindscape', url: 'http://www.mindscapehq.com/' },
			{ name: 'Red Gate', url: 'https://www.red-gate.com/' },
			{ name: 'TypeMock', url: 'https://www.typemock.com/' },
			{ name: 'Telerik', url: 'https://www.telerik.com/' }
		],
		committee: [
			{ name: 'Martyn Fewtrell', role: 'Website, onsite registration' },
			{ name: 'Chris Myhill', role: 'Location manager, printing' },
			{ name: 'Ross Scott', role: 'Catering, Friday and Saturday dinners' },
			{ name: 'Rachel Clements', role: 'Speaker and room monitor manager' },
			{ name: 'Rob Bracken', role: 'Balloon debate, getting started' },
			{ name: 'Jose Simas', role: 'Graphics' },
			{ name: 'Guy Smith-Ferrier', role: 'Sponsorship' }
		],
		date: '2012-05-26',
		venue:
			'University of the West of England (UWE), Frenchay Campus, Coldharbour Lane, Bristol BS16 1QY',
		summary: 'Back at UWE, with sessions chosen by public vote.',
		note: "We don't have the full agenda. These are the only talks we know of, sessions that replaced earlier planned ones."
	},
	{
		year: 2011,
		title: 'DDD South West 3',
		archiveUrl: 'https://web.archive.org/web/20110918064256/http://www.dddsouthwest.com/',
		logo: 'past-logos/2011.webp',
		sponsors: [
			{ name: 'University of the West of England (UWE)', url: 'https://www.uwe.ac.uk/' },
			{ name: 'Microsoft', url: 'https://www.microsoft.com/en-gb/' },
			{ name: 'TechSmith', url: 'https://www.techsmith.com/' },
			{ name: 'Apress', url: 'https://www.apress.com/' },
			{ name: 'DevExpress', url: 'https://www.devexpress.com/' },
			{ name: 'JetBrains', url: 'https://www.jetbrains.com/' },
			{ name: 'Pluralsight', url: 'https://www.pluralsight.com/' },
			{ name: 'Coldharbour Systems' },
			{ name: 'Syncfusion', url: 'https://www.syncfusion.com/' },
			{ name: 'TekPub' },
			{ name: 'Telerik', url: 'https://www.telerik.com/' },
			{ name: 'WebTech' },
			{ name: 'Avanade', url: 'https://www.avanade.com/en-gb' },
			{ name: 'PC Talk' },
			{ name: 'eGroup' }
		],
		committee: [
			{ name: 'Martyn Fewtrell', role: 'Registration' },
			{ name: 'Chris Myhill', role: 'Location manager' },
			{ name: 'Ross Scott', role: 'Catering, speaker dinner and geek dinner' },
			{ name: 'Jose Simas', role: 'Graphics, printing and photography' },
			{ name: 'Guy Smith-Ferrier', role: 'Sending too many emails' }
		],
		date: '2011-06-11',
		venue:
			'University of the West of England (UWE), Frenchay Campus, Coldharbour Lane, Bristol BS16 1QY',
		summary:
			'Sessions chosen by public vote, across four tracks plus a Getting Started track. Recordings included talks from Gary Short, Mark Rendle, Phil Collins and Ross Scott ("How I made Pocket DDD").'
	},
	{
		year: 2010,
		title: 'DDD South West 2',
		archiveUrl: 'https://web.archive.org/web/20101230152045/http://www.dddsouthwest.com/',
		logo: 'past-logos/2010.webp',
		sponsors: [
			{ name: 'University of the West of England (UWE)', url: 'https://www.uwe.ac.uk/' },
			{ name: 'Microsoft', url: 'https://www.microsoft.com/en-gb/' },
			{ name: 'Red Gate', url: 'https://www.red-gate.com/' },
			{ name: 'DevExpress', url: 'https://www.devexpress.com/' },
			{ name: 'Black Marble', url: 'https://www.blackmarble.com/' }
		],
		// Assumed: each was listed on the committee before and after this year.
		committee: [
			{ name: 'Martyn Fewtrell' },
			{ name: 'Chris Myhill' },
			{ name: 'Ross Scott' },
			{ name: 'Jose Simas' },
			{ name: 'Guy Smith-Ferrier' }
		],
		date: '2010-06-05',
		venue:
			'University of the West of England (UWE), Frenchay Campus, Coldharbour Lane, Bristol BS16 1QY',
		summary:
			'The first 250 tickets went in five hours, so capacity was raised to 330. Three talk tracks plus an alternative track of discussions, a balloon debate, planning poker and a workshop.'
	},
	{
		year: 2009,
		title: 'DDD South West 1',
		archiveUrl: 'https://web.archive.org/web/20091115110850/http://www.dddsouthwest.com/',
		sponsors: [
			{ name: 'Microsoft', url: 'https://www.microsoft.com/en-gb/' },
			{ name: "Queen's College", url: 'https://www.queenscollege.org.uk/' },
			{ name: 'Telerik', url: 'https://www.telerik.com/' },
			{ name: 'DevExpress', url: 'https://www.devexpress.com/' }
		],
		committee: [
			{ name: 'Martyn Fewtrell', role: 'Location manager' },
			{ name: 'Chris Myhill', role: 'Social networking and registration' },
			{ name: 'Steve Sanderson', role: 'Geek dinner' },
			{ name: 'Ross Scott', role: 'Catering' },
			{ name: 'Jose Simas', role: 'Graphics and printing' },
			{ name: 'Adam Towler', role: 'Alternative track' },
			{ name: 'Guy Smith-Ferrier', role: 'Sending too many emails' }
		],
		date: '2009-05-23',
		venue: "Queen's College, Trull Road, Taunton, Somerset TA1 4QS",
		summary:
			'The very first DDD South West, with three tracks plus an Alternative Track, grok talks and game shows.',
		note: 'The confirmed sessions listed on the archived agenda before the public vote, so the final line-up may differ.'
	}
];

export const pastEvents: PastEvent[] = events.map((event) =>
	talksByYear[event.year] ? { ...event, talks: talksByYear[event.year] } : event
);
