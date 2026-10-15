export interface Talk {
	speaker: string;
	title: string;
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
	/** Path to the event's logo under static/. When missing, the page shows our cow as a placeholder. */
	logo?: string;
	sponsors?: Sponsor[];
	committee?: CommitteeMember[];
	/** Speakers with a short bio, for years where we don't have talk titles. */
	speakers?: SpeakerProfile[];
	talks?: Talk[];
	url?: string;
}

export interface Photo {
	src: string;
	alt: string;
}

/** One entry per previous conference (newest first). Talks come from archived copies of the old site. */
export const pastEvents: PastEvent[] = [
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
		summary: 'Our last year at Engine Shed.',
		talks: [
			{ speaker: 'Steven Read', title: 'Architecting for Observability' },
			{ speaker: 'Andrew Clymer', title: 'Passkeys in ASP.NET Core 10' },
			{
				speaker: 'Adrian Banks',
				title: 'Sketchnoting 101: Think, learn, and remember through visual notes'
			},
			{
				speaker: 'Andrew Poole',
				title:
					'Software engineering is dead. Long live Software engineering! Surviving and thriving in the new era'
			},
			{ speaker: 'Rich Woollcott', title: '2026: The Year of the Software Factory' },
			{
				speaker: 'Chaithali Shashikanth Kundapur',
				title: 'Building AI Systems You Can Actually Trust'
			},
			{ speaker: 'Carly Richmond', title: 'Crafting Intelligent Agents with Context Engineering' },
			{ speaker: 'Dan Abel', title: 'The Way of the Tech Lead' },
			{
				speaker: 'Lorraine Pearce',
				title: 'Be the Glue: How small contributions build strong communities'
			},
			{
				speaker: 'Elizabeth Hanson',
				title: 'From question to insight: Using Claude to access data and make smarter decisions.'
			},
			{
				speaker: 'Laura Gates',
				title: 'Grounding AI in Engineering Principles: TDD with Claude Code'
			},
			{
				speaker: 'Samson Nwizugbe',
				title: 'Microsoft Agent Framework: Reliable Agentic Orchestration in .Net'
			},
			{
				speaker: 'Joe Glombek',
				title: 'Developers, Assemble! Community is Your Team’s Superpower'
			},
			{ speaker: 'Kathleen Dollard', title: 'Modern C# (2026 version)' },
			{ speaker: 'Lotte Pitcher', title: 'Open Source Software in the Age of AI' },
			{ speaker: 'Paul Michaels', title: 'Playing With AI Locally' },
			{ speaker: 'Nacho Escrig', title: 'Security in the Model Context Protocol' },
			{ speaker: 'Rachel Breeze', title: 'AI Is Here: PRs Are Dead, Long Live PRs' },
			{
				speaker: 'John Kilmister',
				title: 'From Developer to Architect, The Career Path Nobody Explained'
			},
			{ speaker: 'Kevlin Henney', title: 'Principle Misunderstandings' },
			{ speaker: 'Ross Scott', title: "We're all doomed!" },
			{ speaker: 'Stuart Caborn', title: 'Do We Really Need a New Playbook for AI?' },
			{ speaker: 'Sara Gowen', title: 'Productivity hacks for clutterbrained devs' },
			{
				speaker: 'Marc Denman',
				title: "Protocols, .NET & AI: A developer's guide to the bits worth betting on"
			},
			{
				speaker: 'Marin Niehues',
				title: 'Unf*ck your mind: How to finally build something great again'
			},
			{ speaker: 'Richard Saville', title: 'Beyond open banking: making dumb data smart.' },
			{ speaker: 'Jacqui Read', title: 'Design Patterns for Software Diagramming' },
			{
				speaker: 'Matheus Guimaraes',
				title: 'When Should You Use an Agent? Architectural Trade-offs in Agentic Systems'
			},
			{
				speaker: 'Richard Fennell',
				title: "Why don't people seem to be able to diagnose problems these days?"
			}
		]
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
		summary: 'Back at Engine Shed, with exhibitors and supporters.',
		talks: [
			{ speaker: 'Steve Temple', title: 'Advanced Debugging' },
			{
				speaker: 'Kevin Smith',
				title: 'Fixing Broken Messaging: Pitfalls, Failures, and Solutions'
			},
			{
				speaker: 'Aaron Green',
				title:
					'How to have conversations which improve your teams, your life, and maybe even the world'
			},
			{ speaker: 'Jacqui Read', title: 'Surviving Complexity Through Software Design' },
			{
				speaker: 'James Gaisford',
				title: 'Building with Integrity: Embracing Ethical Web Development'
			},
			{ speaker: 'Steven Read', title: 'Modern Software Architecture Review Best Practices' },
			{ speaker: 'Nurhak Kaya', title: 'Practical Guide to Unlocking Accessibility of Websites' },
			{
				speaker: 'George Bell',
				title: 'What I learnt by attending a Hackathon and mentoring instead of writing code'
			},
			{ speaker: 'Scott James', title: 'AzDO YAML Pipelines; bits and bobs' },
			{
				speaker: 'Danielle Dias',
				title: 'Enhance Your Security Posture with the Power of Threat Modelling'
			},
			{ speaker: 'Anita Squires', title: 'Hidden voices/lost ideas' },
			{
				speaker: 'Roger Barreto',
				title:
					'Unleashing the Power of AI with Semantic Kernel: A Beginner-to-Intermediate Hands-On Guide'
			},
			{ speaker: 'Joe Glombek', title: 'Why am I being such a git about best practices?' },
			{
				speaker: 'John Kilmister',
				title: 'A Developers Guide to Getting the Most out of Containers'
			},
			{ speaker: 'Carly Richmond', title: 'How to Destroy a DevOps Engineer' },
			{ speaker: 'Andrew Poole', title: 'How to fall in love with automated tests!' },
			{
				speaker: 'Rachel Breeze',
				title:
					'Rethinking Website Carbon Calculators: Alternative Ways to Measure Digital Emissions'
			},
			{ speaker: 'Dylan Beattie', title: 'How To Be A Rockstar Developer' },
			{ speaker: 'Stu Lang', title: 'Mutation Testing - Kill them mutants' },
			{ speaker: 'Vijay Patel', title: 'Rapid Prototypes & Throwaway Code' },
			{ speaker: 'Sean Farmar', title: 'Understanding The Business Problem' },
			{ speaker: 'Kevlin Henney', title: 'Adventures in Spacetime' },
			{ speaker: 'Clifford Agius', title: 'Could a Co-Pilot be an Aircraft Co-Pilot' },
			{ speaker: 'Gary Ewan Park', title: "Let's ship this thing!" },
			{ speaker: 'Lotte Pitcher', title: 'Successfully Navigating Open Source Waters' }
		]
	},
	{
		year: 2024,
		title: 'DDD South West 2024',
		archiveUrl: 'https://web.archive.org/web/20241006092157/https://dddsouthwest.com/',
		photos: [
			{
				src: '/images/past/2024-1.jpg',
				alt: 'Attendees chatting around sponsor stands in the exhibition area.'
			},
			{
				src: '/images/past/2024-4.jpg',
				alt: 'A speaker presenting to the audience in Track 1, with attendees on orange tiered seating.'
			},
			{
				src: '/images/past/2024-3.jpg',
				alt: 'A crew member introducing a session to a packed room.'
			},
			{
				src: '/images/past/2024-2.jpg',
				alt: 'A smiling, full audience on tiered seating waiting for a talk.'
			},
			{
				src: '/images/past/2024-6.jpg',
				alt: 'Attendees queuing for the lunch buffet.'
			},
			{
				src: '/images/past/2024-5.jpg',
				alt: 'Attendees listening to a session in a wood-panelled room.'
			},
			{
				src: '/images/past/2024-7.jpg',
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
		summary: 'Our third year at Engine Shed.',
		talks: [
			{ speaker: 'Kevlin Henney', title: '#FAIL' },
			{
				speaker: 'John Kilmister',
				title: 'Beyond Coding: Skills for a Successful Programming Career'
			},
			{
				speaker: 'Samuel Nebeolisa',
				title: 'Domain-Driven Design: Bridging the Gap Between Business and Technology'
			},
			{ speaker: 'Kevin Smith', title: "Let's start using MongoDB in our next .NET project!" },
			{
				speaker: 'Aaron Green',
				title: 'Confident Communication for Developers (And Why It Matters).'
			},
			{ speaker: 'Charles Rea', title: 'Elevating OAuth Security' },
			{ speaker: 'Anna-Maria Wykes', title: 'OpenAI vs Azure OpenAI' },
			{
				speaker: 'Youngho Andrew Chaa',
				title: 'Unleash Your Inner Trader: Create & Back-Test Strategies with Python & JavaScript'
			},
			{ speaker: 'Richard Jackson', title: '.NET, Azure & Umbraco: The Second Twelve Months' },
			{ speaker: 'Jennifer D. Daniel', title: 'An above average tech ecosystem' },
			{ speaker: 'Anna-Maria Wykes', title: 'How to Run Code Clubs for Neurodiverse Children' },
			{
				speaker: 'Lizzie Darville',
				title: "It's not us, it's them! What the software industry can learn from group psychology"
			},
			{ speaker: 'Joe Glombek', title: "Celibrate you're misteaks" },
			{ speaker: 'Stuart Lang', title: 'Demystifying .NET Debug Symbols' },
			{ speaker: 'Matt Hunt', title: "Happy Developers (Don't Do Drugs)" },
			{
				speaker: 'Danielle Dias',
				title: 'Shifting Left with Burp Suite: A Lightning Approach to Endpoint Testing'
			},
			{
				speaker: 'Nurhak Kaya',
				title:
					"A Software Developer's Guide to Designing Better Software Apps: Key Strategies and Best Practices"
			},
			{ speaker: 'Rachel Breeze', title: 'Debugging: More than breakpoints and log analysis' },
			{ speaker: 'Andrew Poole', title: 'Fluent Method Chaining in C#' },
			{ speaker: 'Molly Painter', title: 'Functional Programming with C#' },
			{
				speaker: 'Matt Lacey',
				title: 'Documentation, Testing, and the Future of Software Development'
			},
			{ speaker: 'Poornima Nayar', title: 'REST, gRPC, GraphQL or Asynchronous Messaging' },
			{ speaker: 'Dee Bolt', title: 'Unlocking Strong Authentication: A future beyond passwords' },
			{ speaker: 'Sean Farmar', title: 'Why DevOps and Microservices are a great fit?' }
		]
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
		summary: 'A return to Engine Shed on a Saturday in April, after the 2022 event.',
		note: "The programme was loaded from Sessionize and wasn't captured by the Internet Archive, so we don't have the list of talks and speakers yet."
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
		note: 'From the draft schedule published before the event, so late changes may not be reflected.',
		talks: [
			{ speaker: 'Steve Collins', title: 'The Source Code Generation Game' },
			{
				speaker: 'Steve Gordon',
				title: 'The New Elasticsearch .NET Client: Getting Started and Behind the Scenes'
			},
			{ speaker: 'Anna Wykes', title: 'Mastering MLOps in Azure' },
			{ speaker: 'Joshan Mahmud', title: 'Automated Azure Dashboards Generation' },
			{ speaker: 'Kevin Smith', title: '.NET Minimal APIs' },
			{ speaker: 'Carl Sargunar', title: 'Docker is a gateway Drug - .NET Everywhere' },
			{ speaker: 'Callum Whyte', title: 'Scaling your .NET app with Azure' },
			{ speaker: 'Amy Lobe', title: 'Workshop: how to run user experience testing' },
			{ speaker: 'Phil Simpson', title: 'Azure Cognitive Services – AI for everyone!' },
			{ speaker: 'Ian Cooper', title: 'At Least Once' },
			{ speaker: 'Callum Linington', title: 'DDD, The Value Of ValueOf' },
			{ speaker: 'Gary Short', title: 'Data Scientists, Making Sh!t up Since 1974' },
			{ speaker: 'Craig Jones', title: 'Why premature optimisation is the root of all evil' },
			{ speaker: 'Sebastian Coles', title: 'Force Multipliers in Software Security' },
			{ speaker: 'Chris Sainty', title: 'Building next generation web apps with Blazor' },
			{ speaker: 'Sean Farmar', title: 'DevOps and Microservices Better Together' },
			{
				speaker: 'Lee Englestone',
				title: 'Augmented Reality for iOS using Xamarin, ARKit, C# and .NET'
			},
			{
				speaker: 'Ryan Yates',
				title: "Mental Health: It's Time to Talk (the post pandemic revision)"
			}
		]
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
		date: '2019-04-27',
		venue: 'Redcliffe Sixth Form Centre, Redcliff Hill, Bristol BS1 6RB',
		summary: 'Five tracks, including a Women in Technology panel sponsored by Landmark.',
		note: 'From the agenda page as it stood in July 2019.',
		talks: [
			{ speaker: 'Rabeb Othmani', title: 'Managing the Conversation Flow within a Bot' },
			{ speaker: 'Ian Johnson', title: 'A Monolith of Microservices' },
			{ speaker: 'Callum Whyte', title: 'Securing the web with AI' },
			{ speaker: 'Ben Arroyo', title: 'Nailing down distributed workflows with microservices' },
			{ speaker: 'Tomasz Bartoszewski', title: 'Saving the World with IoT' },
			{
				speaker: 'Jon Hilton',
				title: 'Simplify your code and focus on your features with ASP.NET Core and MediatR'
			},
			{
				speaker: 'Matteo Emili',
				title: 'Am I doing deployments right? Advanced deployment patterns in practice'
			},
			{ speaker: 'Steve Gordon', title: 'Turbocharged: Writing High-Performance C# and .NET Code' },
			{
				speaker: 'Alex McAuliffe',
				title: 'Falling down holes for beginners: Getting started in open source'
			},
			{
				speaker: 'Ceri Newton',
				title: 'Oops! I did it again... (The increasing complexity of responsibility)'
			},
			{
				speaker: 'Stuart Lang',
				title: 'Build an ASP.NET Core Web App with F#? You must be having a Giraffe!'
			},
			{ speaker: 'Ashley Poole', title: 'Treating Your Infrastructure As Code: Terraform 101' },
			{ speaker: 'Michal Poreba', title: 'Docker and the Microsoft Stack' },
			{ speaker: 'Joel Hammond-Turner', title: "You're the Tech Lead - *you* fix it!" },
			{
				speaker: 'John Stovin',
				title: 'GraphQL and Dapper : The quick route to flexible and efficient mobile APIs'
			},
			{ speaker: 'Joseph Woodward', title: 'Improving System Resiliency via Chaos Engineering' },
			{ speaker: 'Viv Richards', title: "Better the 'dev tool' you know" },
			{
				speaker: 'Shahid Iqbal',
				title: 'Solving microservices challenges on the Kubernetes platform'
			},
			{ speaker: 'Frans Lytzen', title: 'C# Async Deep Dive' },
			{ speaker: 'Panel', title: 'When is the shift coming? Women in Technology, Panel Session' },
			{ speaker: 'Chester Burbidge', title: 'F#ll stack development' },
			{ speaker: 'Dan Clarke', title: 'Kubernetes, Raspberry Pis, and more!' },
			{
				speaker: 'Luce Carter',
				title: 'Zero to Mobile Hero - Intro to Xamarin, Cognitive Services and Azure DevOps'
			},
			{ speaker: 'Mark Rendle', title: 'DiagnosticSourcery 101' },
			{
				speaker: 'Andrew Chaa',
				title:
					'No More DTOs, Services, and Managers in your code. Let Objects have meaningful behaviours'
			}
		]
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
		committee: [{ name: 'Rob Bracken' }, { name: 'Ross Scott' }],
		date: '2018-04-21',
		venue: 'Redcliffe Sixth Form Centre, Redcliff Hill, Bristol BS1 6RB',
		summary: 'Held at the Redcliffe Sixth Form Centre.',
		talks: [
			{ speaker: 'Callum Whyte', title: 'From monolithic monster to majestic microservice app' },
			{ speaker: 'Andy Clarke', title: 'Unity 101 for C# Developers' },
			{ speaker: 'Ian Russell', title: 'Outside-In TDD' },
			{
				speaker: 'Viv Richards',
				title: 'Spot the difference: automating visual regression testing'
			},
			{ speaker: 'Sean Farmar', title: 'SOA lessons learnt (OR Microservices done better)' },
			{
				speaker: 'Joseph Woodward',
				title: 'Patterns and Practices for Building a Better Web API Architecture'
			},
			{ speaker: 'Steve Gordon', title: 'Docker for .NET Developers' },
			{ speaker: 'Dan Clarke', title: 'Developer Productivity!' },
			{ speaker: "Richard 'Rippo' Wilde", title: 'Headless UI testing with Chrome and Puppeteer' },
			{ speaker: 'Lizzie Darville', title: 'Legacy systems in your head, and why they matter' },
			{ speaker: 'Shahid Iqbal', title: 'Kubernetes for .NET developers' },
			{ speaker: 'Andrew Chaa', title: 'Bitcoin, C#, and Lambda' },
			{ speaker: 'James World', title: 'Git Deep Dive' },
			{ speaker: 'Gary Short', title: 'Using AI to Beat the Bookies' },
			{
				speaker: 'Joel Hammond-Turner',
				title: 'Azure In Action - CosmosDB, Functions and ServiceBus in Perfect Harmony'
			},
			{ speaker: 'Yan Cui', title: 'Serverless design patterns' },
			{ speaker: 'Ismail Mayat', title: 'Teaching an old dog new tricks' },
			{ speaker: 'Anthony Dang', title: "What's that smell?" },
			{
				speaker: 'James Broome',
				title: 'Analysing flight data in real time using Cosmos DB, Azure Functions and Power BI'
			},
			{
				speaker: 'Galiya Warrier',
				title: 'Breaking The Common Myths Around Artificial Intelligence'
			},
			{
				speaker: 'Liam Westley',
				title: 'Give it a REST - Tips for designing and consuming public APIs'
			},
			{ speaker: 'Gary Fleming', title: 'APIs on the Scale of Decades' },
			{ speaker: 'Ed Yau', title: 'Machine Learning for Developers' },
			{
				speaker: 'Jess Panni',
				title: 'Lessons learned - ingesting, securing and processing 200 million messages a day'
			},
			{
				speaker: 'Nathan Gloyn',
				title: "Microservices - What I've learned after a year building systems"
			}
		]
	},
	{
		year: 2017,
		title: 'DDD South West 7',
		archiveUrl: 'https://web.archive.org/web/20171223185535/http://www.dddsouthwest.com:80/',
		logo: '/images/past/logos/2017.png',
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
		summary: 'Four tracks plus a sponsors track.',
		talks: [
			{ speaker: 'Adam Ralph', title: 'What is .NET Standard?' },
			{ speaker: 'Ashley Poole', title: 'Docker For Beginners' },
			{ speaker: 'Robin Minto', title: "XSS: Don't die of ignorance" },
			{ speaker: 'Ian Cooper', title: '12-Factor Apps in .NET' },
			{ speaker: 'Joe Stead', title: '.NET Core in the real world' },
			{ speaker: 'Kevin Smith', title: 'Microservices with Azure Service Fabric' },
			{ speaker: 'Chester Burbidge', title: 'Separation of concerns in DevOps' },
			{
				speaker: 'Richard Wilde',
				title: 'Developer UI Testing made easy before you commit to source!'
			},
			{ speaker: 'Ed Courtenay', title: 'Growing configurable software with Expression<T>' },
			{
				speaker: 'Christos Matskas',
				title: 'Going serverless with Azure Functions, the rebel service'
			},
			{ speaker: 'Dave Lewis', title: 'Learning to love HATEOAS' },
			{
				speaker: 'Sandeep Singh',
				title: 'JavaScript Services: Building Single Page Applications with ASP.NET Core'
			},
			{
				speaker: 'Nathan Gloyn',
				title: 'You keep using the word agile, I do not think it means what you think it means'
			},
			{ speaker: 'Benjamin Paul', title: 'Beyond the basics of chatbots' },
			{ speaker: 'Joseph Woodward', title: 'ASP.NET Core Razor Deep Dive' },
			{
				speaker: 'Dave Mateer',
				title:
					'Fun with the Twitter Stream API - ELK Stack, RabbitMQ, Serilog and High Performance SQL'
			},
			{
				speaker: 'Joel Hammond-Turner',
				title: 'Service Discovery with Consul.io for the .NET developer'
			},
			{ speaker: 'Mauro Servienti', title: 'Designing a UI for Microservices' },
			{ speaker: 'Elton Stoneman', title: 'Modernizing Legacy .NET Apps with Docker' },
			{
				speaker: 'Naeem Sarfraz',
				title: 'Layers, Abstractions & Spaghetti Code: Revisiting the Onion Architecture'
			},
			{
				speaker: 'Adam Ralph',
				title: 'Getting the first PR into .NET, and Other Tales From An Open Source Contributor'
			},
			{ speaker: 'Ian Russell', title: 'Functional Programming in C#' }
		]
	},
	{
		year: 2015,
		title: 'DDD South West 6',
		archiveUrl: 'https://web.archive.org/web/20161209072744/http://www.dddsouthwest.com:80/',
		logo: '/images/past/logos/2015.png',
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
		summary: 'The first year with a sponsors track, where sponsors spoke to attendees directly.',
		talks: [
			{ speaker: 'Mark Rendle', title: 'Docker Strangelove, or, How I Defenestrated ASP.NET' },
			{ speaker: 'Ben Emmett', title: 'Everything you need to know about .NET memory' },
			{ speaker: 'Sean Farmar', title: 'Why Service Oriented Architecture?' },
			{ speaker: 'Ceri Shaw', title: 'Taming the Bug Mountain' },
			{ speaker: 'Matt Ellis', title: '.NETCore Blimey!' },
			{ speaker: 'Ian Russell', title: 'Introduction to CQRS and Event Sourcing' },
			{ speaker: 'Nathan Gloyn', title: 'No Backend' },
			{ speaker: 'Richard Dalton', title: 'Burnout' },
			{ speaker: 'Russell Forster', title: 'Agile about Agile' },
			{
				speaker: 'Dave Mateer',
				title:
					"30,000,000+ songs! Explore your favourite music with Spotify's JSON Web API, MVC5, Dapper and OAuth2"
			},
			{
				speaker: 'Joel Hammond-Turner',
				title: 'Logging and Monitoring - How to keep DevOps happy'
			},
			{ speaker: 'Liam Westley', title: 'What is the point of … Microsoft?' },
			{ speaker: 'Barbara Fusinska', title: 'Analysing GitHub commits with R and Azure' },
			{ speaker: 'Peter Major', title: 'Native mobile cross-platform with Xamarin.Forms and C#' },
			{ speaker: 'Mathew McLoughlin', title: 'Omnisharp: .NET sans Microsoft' },
			{
				speaker: 'Mauro Servienti',
				title: 'Designing distributed, scalable and reliable systems using NServiceBus'
			},
			{ speaker: 'Matteo Emili', title: 'How to get the grip on Git, my experience' },
			{ speaker: 'Anthony Brown', title: 'Building applications with Akka.Net' },
			{ speaker: 'Sam Elamin', title: 'Monoliths to Microservices. A Journey' },
			{ speaker: 'Phil Bottomley', title: 'ES6 - Using future JavaScript today' },
			{
				speaker: 'David Ringsell',
				title: 'An introduction to MVC including the benefits and the design pattern'
			},
			{
				speaker: 'Gary Short',
				title:
					'Walk Through of a Recent European Space Agency Project in Predictive Analytics and Machine Vision'
			}
		]
	},
	{
		year: 2014,
		title: 'DDD South West 5',
		archiveUrl: 'https://web.archive.org/web/20141219082521/http://www.dddsouthwest.com/',
		logo: '/images/past/logos/2014-south-west-5.png',
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
			"Our first year at St Mary Redcliffe's sixth form centre, ten minutes' walk from Temple Meads.",
		talks: [
			{
				speaker: 'Steve Sanderson',
				title: 'Architecting large Single Page Applications with Knockout.js'
			},
			{ speaker: 'Phil Collins', title: 'Continuous Integration, in an hour, on a shoestring' },
			{ speaker: 'David Ringsell', title: 'Introduction to development with ASP.Net MVC 5' },
			{ speaker: 'Pete Smith', title: "It doesn't work that way in enterprise" },
			{
				speaker: 'Stephen Askew',
				title: 'Federated Identity - enabling single sign-on across all your apps and systems'
			},
			{ speaker: 'Ashic Mahtab', title: 'Complexity => Simplicity' },
			{
				speaker: 'Dave Mateer',
				title: '7 Top Tips - A full stack ASP.NET MVC5 EF6 Testable application'
			},
			{ speaker: 'Marc Gravell', title: 'Redis cluster - everything you need to know' },
			{
				speaker: 'Martin Thornalley',
				title: 'Real-time geospatial visualisation with SignalR and OpenLayers'
			},
			{ speaker: 'Colin Angus Mackay', title: 'Introduction to S.O.L.I.D' },
			{ speaker: 'Phil Trelford', title: 'F# Eye for the C# Guy' },
			{ speaker: 'Chris Canal', title: 'Super charging your JavaScript development experience' },
			{ speaker: 'Gary Short', title: 'Hadoop and Big Data for Microsoft Developers' },
			{
				speaker: 'Ian Russell',
				title: 'Software Craftsmanship: Raising the bar, elitist or just snake oil?'
			},
			{ speaker: 'Mathew McLoughlin', title: 'An Introduction to Nancy' },
			{ speaker: 'George Adamson', title: 'Designing for mobile (AKA Designing for Everything)' },
			{
				speaker: 'James Crowley',
				title: '10 things I learnt about web application security being pen tested by banks'
			},
			{
				speaker: 'Stephen Ball',
				title: 'Top 5 mistakes Enterprise developers make when going mobile'
			},
			{ speaker: 'Mauro Servienti', title: 'A gentle introduction to AngularJS' },
			{ speaker: 'Andy Gibson', title: 'Writing better CSS with LESS' }
		]
	},
	{
		year: 2012,
		title: 'DDD South West 4',
		archiveUrl: 'https://web.archive.org/web/20131029074007/http://www.dddsouthwest.com:80/',
		logo: '/images/past/logos/2012.png',
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
		note: "We don't have the full agenda. These are the only talks we know of, sessions that replaced earlier planned ones.",
		talks: [
			{ speaker: 'Sebastien Lambla', title: 'Web Caching 101' },
			{ speaker: 'Benjamin Howarth', title: 'Thoughts and Experiments on Umbraco' }
		]
	},
	{
		year: 2011,
		title: 'DDD South West 3',
		archiveUrl: 'https://web.archive.org/web/20110918064256/http://www.dddsouthwest.com/',
		logo: '/images/past/logos/2011.png',
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
			{ name: 'Telerik', url: 'https://www.telerik.com/' }
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
			'Sessions chosen by public vote. Recordings included talks from Gary Short, Mark Rendle, Phil Collins and Ross Scott ("How I made Pocket DDD").',
		note: "We couldn't find the final agenda in the archive."
	},
	{
		year: 2010,
		title: 'DDD South West 2',
		archiveUrl: 'https://web.archive.org/web/20101230152045/http://www.dddsouthwest.com/',
		logo: '/images/past/logos/2010.png',
		sponsors: [
			{ name: 'University of the West of England (UWE)', url: 'https://www.uwe.ac.uk/' },
			{ name: 'Microsoft', url: 'https://www.microsoft.com/en-gb/' },
			{ name: 'Red Gate', url: 'https://www.red-gate.com/' }
		],
		date: '2010-06-05',
		venue:
			'University of the West of England (UWE), Frenchay Campus, Coldharbour Lane, Bristol BS16 1QY',
		summary: 'The first 250 tickets went in five hours, so capacity was raised to 330.',
		note: "We couldn't find the final agenda in the archive."
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
		note: 'The confirmed sessions listed on the archived agenda before the public vote, so the final line-up may differ.',
		talks: [
			{
				speaker: 'Gary Short',
				title: 'Everything you Wanted to Know About Refactoring but Were Afraid to Ask'
			},
			{ speaker: 'Ben Hall', title: 'Creating extendable applications using MEF' },
			{ speaker: 'Chris Hay', title: 'Introduction to Windows Azure' },
			{ speaker: 'Steve Sanderson', title: 'Real-world MVC architecture' },
			{ speaker: 'Richard Fennell', title: 'What is Scrum?' },
			{ speaker: 'Robert Hogg', title: 'Oslo and the future Microsoft Modelling platform' },
			{ speaker: 'Dave McMahon', title: 'A Quantum of Computing' },
			{ speaker: 'Richard Costall', title: 'Silverlight Top 10 Nuggets' },
			{ speaker: 'Guy Smith-Ferrier', title: "What's New In C# 4 ?" }
		]
	}
];
