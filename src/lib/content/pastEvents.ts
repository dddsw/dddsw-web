export interface Talk {
	speaker: string;
	title: string;
	/** The session abstract, as accepted on Sessionize. Shown behind a "More info" button. */
	description?: string;
	/** Keys into `pastSpeakers`, for the speakers' photos and bios. */
	speakerIds?: string[];
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
	talks?: Talk[];
	url?: string;
}

export interface Photo {
	/** Relative to src/lib/assets/images. */
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
			{
				speaker: 'Steven Read',
				title: 'Architecting for Observability',
				speakerIds: ['steven-read'],
				description:
					'Observability is a buzz-word where we hear a lot about the buzz, but less about the trade-offs and limitations. To succeed in this topic you need boots on the ground experience, going beyond product specs and aspirations to having integration experience and understanding limitations.\n\nYou will learn from the perspective of an adopting enterprise, breaking from the typical perspective of a vendor or advocate. These are things that will affect your adoption, learned through experience.\n\nWe look at the design and adoption of modern observability in enterprise systems, covering high-level socio-technical landscapes, as well as tactical considerations and work-arounds. Warts and all. Complexities made clear.'
			},
			{
				speaker: 'Andrew Clymer',
				title: 'Passkeys in ASP.NET Core 10',
				speakerIds: ['andrew-clymer'],
				description:
					"Password-driven breaches, increased support costs, and frustrated users. Passkeys—standards based WebAuthn/FIDO2 credentials backed by public key cryptography and biometrics—deliver MFA level security with a one tap experience. But most of the time, people only discuss why to use passkeys, not how. That's why in this session, we'll add passkey authentication to an  ASP.NET Core web application running on .NET 10. You'll get a concise primer on how WebAuthn works (registration vs. authentication ceremonies, challenges, attestation, and assertions) and then see it implemented end to end. We'll integrate with ASP.NET Core Identity and we'll also cover rollout and UX strategy.\nYou'll leave with clear practical guidance to ship secure, delightful, passwordless sign in on .NET 10."
			},
			{
				speaker: 'Adrian Banks',
				title: 'Sketchnoting 101: Think, learn, and remember through visual notes',
				speakerIds: ['adrian-banks'],
				description:
					'Sketchnotes incorporate words, colour, simple drawings, and structures to create visual notes that are more memorable than plain textual scribbles. Sketchnoting conference talks aids retention of information, improves focus during the talk, and increases recall afterwards.\n\nThis session will give an introduction on the benefits of sketchnoting, advice on how to get started, and provide some useful tools and techniques. There\'ll also be some hands-on practice to help create your first sketchnote using simple exercises that even the self-proclaimed "artistically challenged" can easily do.'
			},
			{
				speaker: 'Andrew Poole',
				title:
					'Software engineering is dead. Long live Software engineering! Surviving and thriving in the new era',
				speakerIds: ['andrew-poole'],
				description:
					"Software engineering has changed. Models and tooling have passed a threshold, it's simultaneously painful and exhilarating, our roles in the process are changing. There is a lot to deal with: the emotional responses of our own personal Kübler-Ross change processes, the huge amount of noise, options, marketing hype, the explosion of innovation and how on earth to keep up with the eye-watering pace of change! Incredible productivity gains are possible and increasingly expected in the boardroom, but resources are not infinite, we must consider the environmental impact. We're also expected to ensure quality while moving towards a world where we won't be able to review every line of code. We need to come to terms with the redefinition of the value that we add.\n\nIn this hopefully positive and optimistic talk, Andrew will share some practical advice on how to shift the mindset, what new things are important to understand, how to spot the things which will likely last and some pointers on how to get started, using real world apps and demos probably using Brady Gaster's Squad, Aspire and Aspire tests."
			},
			{
				speaker: 'Rich Woollcott',
				title: '2026: The Year of the Software Factory',
				speakerIds: ['rich-woollcott'],
				description:
					'Andrej Karpathy coined "vibe coding" in February 2025. By early 2026, he\'d already abandoned the term — replacing it with "agentic engineering." That pivot tells you everything about where we are right now.\n\nThe vibe coding hangover is real. Senior engineers are reporting "development hell" in maintaining AI-generated codebases. Security researchers are finding vulnerabilities at scale. And the tools driving it — Claude Flow, GasTown, Cursor — are optimised for the first 80%, then leave you stranded at the plateau.\n\nThere\'s a quieter revolution happening in parallel: the return of the Software Factory. Not a new concept, but one that AI finally makes achievable for individual developers and small teams. A repeatable, structured process with structured inputs that lead to verifiable outputs. Simon Willison calls the most advanced version of this "The Dark Factory" — where engineers stop writing code and start building the systems that build the code.\n\nIn this talk, I\'ll look at where vibe coding tools sit relative to a software factory approach — the trade-offs in control, quality, and cost. We\'ll cover why the vendor lock-in risk from platform-first AI tooling is under-appreciated, and why demand outstripping GPU supply makes provider independence a strategic necessity, not just a preference.\n\nYou\'ll come away with a clearer mental model for where AI-assisted development is actually heading — and some practical framing for how to position yourself in it. The AI is the engine. You\'re still the engineer.\n\n~20 minutes of ideas and examples, followed by open discussion.'
			},
			{
				speaker: 'Chaithali Shashikanth Kundapur',
				title: 'Building AI Systems You Can Actually Trust',
				speakerIds: ['chaithali-shashikanth-kundapur'],
				description:
					'As AI systems move from demos into real products, trust becomes more important than raw accuracy. In this talk, I’ll share lessons from building and deploying production AI and LLM-based systems—where things didn’t always behave as expected. We’ll look at what “trust” really means in practice, common failure modes in modern AI systems, and practical techniques for improving reliability, transparency, and confidence in AI-driven decisions. This talk focuses less on hype and more on real-world patterns that help teams build AI systems users can actually rely on.'
			},
			{
				speaker: 'Carly Richmond',
				title: 'Crafting Intelligent Agents with Context Engineering',
				speakerIds: ['carly-richmond'],
				description:
					"We've all heard about prompt engineering. But now with the emergence of context engineering you may be scratching your head about what the difference is. The reality is that to build reliable agents, we need to use all tools in our context toolbox to ensure they provide accurate responses in the correct format.\n\nLet's dive into the world of context engineering, and understand the elements of context that we can tune and tweak to build more reliable AI agents and associated systems."
			},
			{
				speaker: 'Dan Abel',
				title: 'The Way of the Tech Lead',
				speakerIds: ['dan-abel'],
				description:
					"You're expected to lead, but also to do. To delegate, but stay in the details. To have answers, but create space for others to find them. Nobody hands you a manual. Most of us figure it out by getting it wrong first.\n\nThe Tao Te Ching points to something useful. About knowing when to act, how to act, and when stillness is the more powerful choice. Finding the grain and the shape, and working with it rather than against it.\n\nThat's easier said than done when you're new to leadership, or when you're in it and still finding your feet.\n\nThis talk shares six lessons gathered from many years leading tech teams and mentoring tech leads through the same hard moments you're navigating now. Real stories. Hard-won thinking. Nothing theoretical.\n\nYou won't leave with a manual. But you might leave with a better map."
			},
			{
				speaker: 'Lorraine Pearce',
				title: 'Be the Glue: How small contributions build strong communities',
				speakerIds: ['lorraine-pearce'],
				description:
					'The tech ecosystem runs on more than code.\n\nIt runs on the people who organise meetups, mentor newcomers, answer questions, share knowledge and build spaces where others can learn.\n\nThese contributions often start the same way: someone notices a gap and decides to do something about it.\n\nIn this talk I’ll share personal stories of volunteering and community building, and how those experiences changed the way I think and operate. From running support groups to starting coding clubs, working with the homeless and participating in developer communities, each experience reinforced the same lesson:\n\nSmall actions create the glue that holds communities together.\n\nThis talk explores why those contributions matter, how they translate directly into stronger teams and better engineering cultures, and why you don’t need permission to start making a difference.'
			},
			{
				speaker: 'Elizabeth Hanson',
				title: 'From question to insight: Using Claude to access data and make smarter decisions.',
				speakerIds: ['elizabeth-hanson'],
				description:
					'You’ve heard it a hundred times: “We need to be more data-driven.” But between finding the right tables, writing the query, and turning rows into a decision, data often feels like a detour—something that belongs in a ticket queue or a separate team. What if you could go from “I need to understand X” to “Here’s what the data says” in the same place you already think and work?\n\nThis talk is about using Claude in Cursor, Claude Code, or your IDE as a data copilot. Not to replace analysts or dashboards, but to put you in the driver’s seat when you have a question: find the right data, query it safely, and turn results into something you can act on, without leaving your notes, your project folder, or your flow.\n\nWe’ll walk through the full loop. Start with a plain-language ask (“Show me usage by connection type over the last two weeks”) and see how Claude can explore your catalog, suggest or write SQL, and return formatted results. We’ll look at connecting Claude to your data stack (e.g. Databricks via MCP) so queries run where your data lives. We’ll talk about when to speak in natural language and when to paste or reference a saved query—and how to get every run documented so one-off explorations become repeatable, auditable analyses. Along the way, you’ll pick up concrete habits: one-sentence context, reusing saved queries, and asking for the next question so each answer leads to a better decision.\n\nThe goal isn’t to turn everyone into a data engineer. It’s to make “data-driven” something you do in the course of your day—faster, clearer, and with the intelligence of a partner who can find the data and help you use it.'
			},
			{
				speaker: 'Laura Gates',
				title: 'Grounding AI in Engineering Principles: TDD with Claude Code',
				speakerIds: ['laura-gates'],
				description:
					"AI coding assistants can help you move fast, but moving fast without principles produces code you can't maintain, test or reason about. This talk presents a methodology for grounding AI tools in Test-Driven Development so that you're genuinely expanding your skillset rather than outsourcing your understanding.\n\nI'll draw on my experience refactoring a progressive web app using Claude Desktop and Claude Code, grounded in Harry Percival's Test-Driven Development with Python. The process was iterative: I worked through the book myself, then used my research skills to have Claude summarise and extract key TDD principles, which I fed back into CLAUDE.md and reference documents for Claude Code. Each iteration refined both my understanding and the AI's effectiveness – the grounding documents improved as my own grasp of TDD deepened, and the AI produced better code as its reference materials became more precise.\n\nThe core problem this addresses is one most developers using AI assistants will recognise: the tool generates code quickly, but without disciplined testing practices, the results are brittle, poorly tested and difficult to extend. Without TDD grounding, AI assistants write tests after the fact that merely confirm the code they just generated, tests that test nothing meaningful. By establishing clear TDD principles in the AI's reference documents, you create a collaborative workflow where the AI follows red-green-refactor with genuine discipline, and where you learn TDD deeply through the process of articulating its principles for the machine.\n\nAttendees will leave with a practical framework for creating effective grounding documents for AI coding tools, an understanding of how TDD translates into AI-assisted workflows, and – perhaps most valuably – a methodology for using AI tools that makes you a better engineer rather than a more dependent one. The approach extends to other engineering practices; I'll briefly note how I applied the same methodology to hexagonal architecture, but TDD will be the main focus."
			},
			{
				speaker: 'Samson Nwizugbe',
				title: 'Microsoft Agent Framework: Reliable Agentic Orchestration in .Net',
				speakerIds: ['samson-nwizugbe'],
				description:
					'Businesses are increasingly adopting AI-driven systems to automate decisions, coordinate processes, and operate at a scale beyond manual execution. As agentic behavior is introduced into software, the challenge shifts from capability to control: how to orchestrate intelligent components without sacrificing reliability, clarity, or long-term maintainability.\n\nThis talk examines practical orchestration patterns for agentic workflows in the .NET ecosystem, from simple manual coordination with structured outputs to agent-as-tool models, executor-led orchestration, fully agentic workflows, and Durable Task–based approaches. It focuses on the trade-offs each pattern introduces, helping teams design AI-enabled systems that remain understandable, resilient, and aligned with real business needs.'
			},
			{
				speaker: 'Joe Glombek',
				title: 'Developers, Assemble! Community is Your Team’s Superpower',
				speakerIds: ['joe-glombek'],
				description:
					'What happens when your team spends work time eating pizza and hanging out with other techies? Surprisingly, they don’t just come back with stickers. They come back with ideas, solutions to problems, and a renewed enthusiasm for the work in front of them.\n\nThe .NET community is strong, with meetups across the globe hosting experts who love sharing their knowledge. For businesses, these events are an incredibly cost‑effective way to keep teams engaged and learning. While conferences or formal training can swallow days of time and thousands in cash, a local meetup costs little more than a couple of hours and a bus fare — yet often delivers insights that save development time, reduce risk, keep technical debt in check and help teams adopt new technologies sooner while avoiding outdated approaches and reinventing the wheel.\n\nIn this lightning talk, Joe shares what he’s learned as an organiser of the Bristol Umbraco Meetup — one of the longest‑running and best‑attended groups in the community.\n\nIf you want a stronger tech team and bulletproof projects, helping them engage with the community might just be the highest-value superpower you can give them.'
			},
			{
				speaker: 'Kathleen Dollard',
				title: 'Modern C# (2026 version)',
				speakerIds: ['kathleen-dollard'],
				description:
					'The last few years have introduced many new features to C# that enhance your application by improving performance and better expressing your team’s intent. These features work together to create code that reduces ceremony to draw attention to important aspects of your code. In this talk you’ll watch code evolve into and learn how simple it can be to update your own code – or to write new code in an updated manner.'
			},
			{
				speaker: 'Lotte Pitcher',
				title: 'Open Source Software in the Age of AI',
				speakerIds: ['lotte-pitcher'],
				description:
					"AI coding assistants are transforming how we write code, and they’re changing the open-source ecosystem in the process.\n\nIn this session, we’ll explore when (and why) AI will want to add a dependency on a library, and when it will recommend generating its own code. Then we'll look at ways that you can control that decision process so your agents don't waste time and tokens going in directions you don't want.\n\nWe'll also look at how AI both helps and hinders OSS projects, from GitHub features to the flood of AI-generated pull requests overwhelming maintainers and supply chain attacks exploiting the ecosystem's trust model. Whether you're maxing out your AI allowance every day or just starting out with AI tools, you’ll leave with a deeper understanding of how AI is changing the balance between writing, reusing, and sustaining open source software."
			},
			{
				speaker: 'Paul Michaels',
				title: 'Playing With AI Locally',
				speakerIds: ['paul-michaels'],
				description:
					'In this session, we’ll step back from hype and explore what’s really happening when you run a language model locally. We’ll look at how modern LLM runtimes expose simple HTTP endpoints, what “tokens in, tokens out” actually means, and why interacting with a model from C# is far less mysterious than it sounds.\n\nFrom there, we’ll examine the architectural shift from “chatbot” to system component.  What is an MCP (Model Context Protocol) server?  Why would you build one? And how can a language model act as a decision engine that selects structured tools while your .NET application remains firmly in control?'
			},
			{
				speaker: 'Nacho Escrig',
				title: 'Security in the Model Context Protocol',
				speakerIds: ['nacho-escrig'],
				description:
					'This talk will explore security considerations when implementing the Model Context Protocol (MCP). I will review authentication and authorization approaches, including OAuth-based options, and discuss practical design decisions for protecting sensitive data. The presentation will also cover techniques such as using elicitation to securely pass secret information to tools and services, along with other best practices for building safer MCP integrations.'
			},
			{
				speaker: 'Rachel Breeze',
				title: 'AI Is Here: PRs Are Dead, Long Live PRs',
				speakerIds: ['rachel-breeze'],
				description:
					"Pull requests have become the default way for teams to collaborate, review code, and maintain high quality. But when static analysis and AI can review changes in seconds, it’s worth asking what we actually expect a PR to do.\n\nIs it a quality gate? A way to share knowledge across the team? An audit trail of how the codebase evolves?\n\nIn this talk, we'll take a look at what pull requests are really for and how they might need to change as automated analysis and AI become part of the delivery pipeline. The goal isn’t to replace PRs, but to rethink how we use them so they still add value rather than becoming a ceremony."
			},
			{
				speaker: 'John Kilmister',
				title: 'From Developer to Architect, The Career Path Nobody Explained',
				speakerIds: ['john-kilmister'],
				description:
					'I always liked the idea of being a software architect, but had no idea what that actually meant. After several years in the role across three very different organisations, I’ve learned that “architect” is less a title and more a collection of technical skills, responsibilities, personas, and leadership behaviours. In this talk, I will explore what software architects really do, useful tools, how the role differs from team leads and solution architects, and why “everyone is an architect” doesn’t remove the need for dedicated technical leadership.'
			},
			{
				speaker: 'Kevlin Henney',
				title: 'Principle Misunderstandings',
				speakerIds: ['kevlin-henney'],
				description:
					"For developers who want to improve their art there's no shortage of published, promoted and proclaimed principles they can choose from to shape their style and craft their code. Whether it's the alphabet soup of SOLID principles or old school classics like Information Hiding and the Separation of Concerns, there's a lot of advice out there. Some of it even makes sense. And some of it is well supported. But a lot of principles are misunderstood, misapplied or simply mistaken.\n\nIn this talk we'll take a look at (and take down) a few principles, highlighting the real lessons we can apply to our code — lessons supported by sound rationale rather than just strong opinions."
			},
			{
				speaker: 'Ross Scott',
				title: "We're all doomed!",
				speakerIds: ['ross-scott'],
				description:
					'I\'ve recently read the book "If anyone builds it, everyone dies" - the case against superintelligent AI. I think this is a really interesting subject and worthy of a good debate.\nSo to begin with, I\'ll present that case why we should be concerned, and then we will have plenty of time to discuss and debate the subject.'
			},
			{
				speaker: 'Stuart Caborn',
				title: 'Do We Really Need a New Playbook for AI?',
				speakerIds: ['stuart-caborn'],
				description:
					'loveholidays has been scaling AI-assisted development, with code committed with AI assistants now accounting for nearly 70% of our output.\n\nIn the same period, our code health has improved every quarter and deployments to production are up over 20% year-on-year. The challenge for our engineers was to maintain and improve quality while increasing productivity through AI-based innovation.\n\nA year into our journey, we are finding that our existing engineering principles hold but the practices need adapting. This session will explore what it means for a codebase, team, and function to be "AI-Ready", structured around three areas of practice: guardrails, process, and knowledge. We\'ll examine how each area has evolved under agentic development, and the tension between established approaches and the adaptations we see emerging.\n\nWe will share the patterns our teams are using to make AI-assisted development work at scale: code health guardrails embedded in the agentic loop, build pipeline optimisations that prevent CI/CD from becoming the bottleneck, and approaches to encoding organisational knowledge into agent skills and data products that reduce guesswork and rework.'
			},
			{
				speaker: 'Sara Gowen',
				title: 'Productivity hacks for clutterbrained devs',
				speakerIds: ['sara-gowen'],
				description:
					"An honest and friendly session where I'll share some techniques I often use to focus on issues and get devving done.\n\n*disclaimer - these techniques are good but I'm still a clutterbrained dev. If you have tricks of your own then I'd love to hear about them!"
			},
			{
				speaker: 'Marc Denman',
				title: "Protocols, .NET & AI: A developer's guide to the bits worth betting on",
				speakerIds: ['marc-denman'],
				description:
					"For the past several years, the AI ecosystem has been moving faster than anyone can keep up with. It has felt like every vendor, research lab and framework has been pulling in a different direction, trying to stake a claim in the gold rush. However, green shoots of genuine standardisation are starting to take hold around common protocols. These are areas developers can invest time in without worrying whether the concepts will be obsolete next week.\n\nIn this talk we'll take a flying tour of the protocols shaping the AI landscape, covering MCP, A2A, AG-UI, ACP, Agent Skills and more. Throughout the session, we'll use the Microsoft Agent Framework to see how these protocols come together in C#. By the end of the session, you'll have a clear map of the landscape and the practical knowledge to start building AI solutions that are composable and ready for wherever the ecosystem heads next."
			},
			{
				speaker: 'Marin Niehues',
				title: 'Unf*ck your mind: How to finally build something great again',
				speakerIds: ['marin-niehues'],
				description:
					'Let’s be honest: your mind is f*cked. Overloaded, overstimulated and drowning in an endless to-do list. Everything needed to be done yesterday, you’re pulled in a hundred directions and somewhere along the way, you forgot what actually matters.\n\nWe’re bombarded with notifications, meetings, and meaningless busywork. AI is making it worse spitting out endless streams of generic, forgettable content. We move faster and produce more, but are we actually creating anything worth remembering?\n\nThe result? Mediocre, half-assed outcomes. Not just in your work, but everywhere in your company, with your customers, in your career. We’re all stuck in this cycle, rushing to meet deadlines we didn’t set, for work that isn’t great, while convincing ourselves that speed equals value.\n\nThis session is about breaking that cycle. It’s about unf*cking your mind so you can focus on what actually matters and finally build something you’re proud of and that matters to you - and to others.'
			},
			{
				speaker: 'Richard Saville',
				title: 'Beyond open banking: making dumb data smart.',
				speakerIds: ['richard-saville'],
				description:
					'Most data in our digital world is not actually very smart. It often exists as static files, PDFs, or siloed API responses that must be repeatedly requested, checked, and interpreted. Even in regulated industries where trust and verification matter, data rarely has the ability to prove anything about itself.\n\nThis talk explores how we move from dumb data to smart, verifiable data.\n\nStarting with a brief history of Smart Data initiatives such as Open Banking, we will look at how structured access to financial data began to transform regulated services and why access alone is not enough.\n\nFrom there we will explore what makes data “smart”, including identity, integrity, shared schemas, and verifiability. When these elements come together, data can move between systems carrying its own proof.\n\nWe will also examine how this approach supports automation and agentic systems by attaching verifiable evidence to decisions that are difficult to explain but must still be trusted and audited.\n\nThe session concludes with a practical demonstration showing how developers can start building systems where data proves things about itself.'
			},
			{
				speaker: 'Jacqui Read',
				title: 'Design Patterns for Software Diagramming',
				speakerIds: ['jacqui-read'],
				description:
					"Understanding the software you are working on is crucial to successful software. To understand, you and your team must transfer knowledge to each other. Diagrams are key to this knowledge transfer, but effective diagraming is a skill you traditionally don't get taught. So how do you create effective diagrams and visuals?\n\nDesign patterns can be applied to your diagrams to guide you towards the goal of successful communication, and towards maximum inclusion for your audience.\n\nThe purpose of a diagram is to successfully communicate with the audience, which sounds deceptively simple. The communication design patterns you learn in this session will enable you to improve your diagramming: one of the most important methods of communication in software development.\n\nIn this session, you will discover a range of patterns and antipatterns you can apply to your work as soon as you get back to your desk."
			},
			{
				speaker: 'Matheus Guimaraes',
				title: 'When Should You Use an Agent? Architectural Trade-offs in Agentic Systems',
				speakerIds: ['matheus-guimaraes'],
				description:
					'With the rise of agent-based systems, many teams are experimenting with replacing traditional APIs and workflows with AI-driven agents. But not every problem benefits from an agent, and introducing them without architectural discipline can create more complexity than value.\n\nThis talk explores when agents actually make sense from a backend architecture perspective. We’ll compare APIs, workflows, and agents, and discuss how concepts like orchestration, state, and tool integration change when agents enter the picture.\n\nThe session focuses on architectural judgment rather than hype, helping teams understand where agents fit, where they don’t, and how to integrate them safely into existing systems using modern AWS services.'
			},
			{
				speaker: 'Richard Fennell',
				title: "Why don't people seem to be able to diagnose problems these days?",
				speakerIds: ['richard-fennell'],
				description:
					"Too often I see people banging their heads against a problem making no progress. They don't seem to have the fault diagnostic  skills to let them approach a problem in alternative ways\n\nIn this session I will discuss the options for problem solving approaches and techniques in our modern AI infatuated world.\n\nThis will be more of a patterns and practices session than one on tool and debugger tips."
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
			{
				speaker: 'Steve Temple',
				title: 'Advanced Debugging',
				speakerIds: ['steve-temple'],
				description:
					"Debugging has taken a bit of a bashing on the internet recently,  but I think it's a developer superpower. Allowing you to easily see what your code is doing and quickly find bugs that weren't obvious from looking through your code.\n\nMost developers aren't fully utilising the tools available in Visual Studio and who has got time to really dive in and figure everything you could be doing. I'll save you that time but running through a lot of the available tools from the basic debugging to debugging complex applications. Moving into some of the tricky debugging scenarios such as remote debugging production servers and stepping into third party code.\n\nA talk for those new to programming all the way up to experienced developers."
			},
			{
				speaker: 'Kevin Smith',
				title: 'Fixing Broken Messaging: Pitfalls, Failures, and Solutions',
				speakerIds: ['kevin-smith'],
				description:
					"Messaging is a fundamental part of distributed systems, but poor messaging practices can lead to performance bottlenecks, increased coupling, and system failures.\n\nIn this session, we’ll explore the most common messaging pitfalls—such as excessive locking in handlers, oversized event payloads, improper deduplication strategies, and over-reliance on request-response messaging.\n\nWe’ll break down how these issues impact system scalability and reliability, and more importantly, how to avoid them. Expect to see some examples using .NET and MassTransit, and insights into building resilient, event-driven architectures.\n\nWhether you're new to messaging or looking to refine your patterns, this talk will help you design messaging workflows that are scalable, maintainable, and efficient."
			},
			{
				speaker: 'Aaron Green',
				title:
					'How to have conversations which improve your teams, your life, and maybe even the world',
				speakerIds: ['aaron-green'],
				description:
					'I believe we’re living through a breakdown in communication. As polarization grows, it’s become all too easy to dismiss those who disagree with us as ignorant, stupid, or even evil. Social media and echo chambers amplify this divide, but history shows us where this road can lead—like Athens in the Peloponnesian War, where populism and mistrust fractured a thriving society.\n\nIn this talk, I’ll explore how we got here, how assumptions and biases shape our interactions, and how we can start to bridge the divide. By understanding the dynamics of connection, listening with curiosity, and challenging our echo chambers, we can foster better conversations—ones that lead to stronger teams, healthier workplaces, and richer relationships.\n\nThese ideas have changed how I work, how I live, and how I connect with people. My hope is that they can do the same for you. Together, we can build better dialogues that improve our lives and maybe, in some small way, the world.'
			},
			{
				speaker: 'Jacqui Read',
				title: 'Surviving Complexity Through Software Design',
				speakerIds: ['jacqui-read'],
				description:
					"There has never been more pressure on software developers. Dealing with multiple tech stacks, devops pipelines, observability, and more. Add to that the pressure to deliver working software quickly and regularly and we end up with software that doesn't meet expectations and cannot be easily changed. But with so much else on their minds, when do teams think about design and architecture?\n\nAt The Ministry of Software Design we have been looking at how teams can incrementally own their design, and own their architecture, despite the complexity they are working with. Join this session to see how you can manage the complexity of your software design to create software that is evolvable and meets both user and business needs."
			},
			{
				speaker: 'James Gaisford',
				title: 'Building with Integrity: Embracing Ethical Web Development',
				speakerIds: ['james-gaisford'],
				description:
					"The Dark Web. Crypto. Twitter. The web has evolved significantly since Tim Berners-Lee's original vision of a free and open web that connects us all. Over time, it has become clear that the web can be used in ways that subvert its original mission or even cause harm.\n\nIn this talk, we will explore the W3C's recently released Ethical Web Principles statement. You will be reminded of what the web should be and how we can build our applications in line with these principles. As developers and technologists, it's crucial to consider the consequences of our work as we continue to advance the web. By the end of this talk, you'll be reminded of the web's true potential and leave with some clear actions to help you shape a more ethical web."
			},
			{
				speaker: 'Steven Read',
				title: 'Modern Software Architecture Review Best Practices',
				speakerIds: ['steven-read'],
				description:
					"Software Architecture reviews is a topic that rarely gets discussed at conferences, and equally rarely covered in books and blog posts. Writing and presenting your first review is a rite of passage for an architect; you never know when you may be in a situation where one is needed.\n\nIn this talk you will see how a modern architecture review is performed. We aren't talking about word documents that will never again see the light of day, we are talking about creating reusable knowledge management artefacts that the team will build on going forward. Think of it as a spring clean for software architecture.\n\nDon't think you'll ever need to complete one? They are a useful exercise while on-boarding in a new team and learning a new product.\n\nHave you run a well-architected framework review? You will be surprised at the differences."
			},
			{
				speaker: 'Nurhak Kaya',
				title: 'Practical Guide to Unlocking Accessibility of Websites',
				speakerIds: ['nurhak-kaya'],
				description:
					'In this hands-on session, we’ll dive into using powerful tools like WAVE to identify and address accessibility issues on your website. Learn how to use these tools to spot common barriers, from missing alt text to improper heading structure, and take actionable steps to improve your site’s accessibility. We’ll cover the basics of accessibility testing, how to interpret WAVE reports, and prioritize fixes to make sure your website is inclusive for all users. Whether you’re just starting out or looking to streamline your accessibility workflow, this session will provide practical guidance you can apply right away.'
			},
			{
				speaker: 'George Bell',
				title: 'What I learnt by attending a Hackathon and mentoring instead of writing code',
				speakerIds: ['george-bell'],
				description:
					'Last year, I attended the NASA Space Apps Challenge here in Bristol. But rather than coding, I was there with a local charity called DigiLocal that helps marginalised young people develop digital skills. I spent the weekend mentoring a team of young people as they worked on their submission. This lightning talk will go over the things you learn by mentoring at a Hackathon, the challenges you face and the reasons why you should consider it.'
			},
			{
				speaker: 'Scott James',
				title: 'AzDO YAML Pipelines; bits and bobs',
				speakerIds: ['scott-james'],
				description:
					'A short hodgepodge of what the UKHO is up to and tips & tricks on building pipelines.'
			},
			{
				speaker: 'Danielle Dias',
				title: 'Enhance Your Security Posture with the Power of Threat Modelling',
				speakerIds: ['danielle-dias'],
				description:
					'In the ever-evolving landscape of cybersecurity, securing your applications is a critical challenge. Attackers are constantly finding new ways to exploit vulnerabilities, highlighting the need for a proactive "shift-left" strategy to prevent threats from happening - even before a single line of code is written. Understanding and managing security early is essential, and that’s where Threat Modelling comes in.\n\nThis lightning talk will cover how Threat Modelling can transform your approach to security. You’ll learn what it is, why prioritising it is vital, and how to put it into practice effectively. You’ll see how this proactive method not only prevents threats but also reshapes your ability to stay ahead in a constantly changing threat landscape.'
			},
			{
				speaker: 'Anita Squires',
				title: 'Hidden voices/lost ideas',
				speakerIds: ['anita-squires'],
				description:
					'If you ask most people to name a famous person associated with the internet they will probably say Tim Berners-Lee. He did create the World Wide Web, but without the work of Radia Perlman, Elizabeth Fienler and Karen Spark-Jones, it would not be half as useful to the everyday person. Let my talk introduce you to 10 women who helped shape the technology we use today and explain why not forgetting them can help us find more hidden voices in our day-to-day lives and use their ideas to move us forward.\nFor the past forty years, fewer women have enrolled in technology courses. Several articles pinpoint 1984 as the year that enrolment dropped off in steep decline. There were several factors to this drop off, including just a general view that women did not belong in the field, with Stephen Levy labelling them “horribly inefficient and wasteful things” in his book Hackers: Heroes of the Computer Revolution.'
			},
			{
				speaker: 'Roger Barreto',
				title:
					'Unleashing the Power of AI with Semantic Kernel: A Beginner-to-Intermediate Hands-On Guide',
				speakerIds: ['roger-barreto'],
				description:
					"Abstract:\nJoin this engaging and practical session designed to take participants on a journey from the foundational concepts of Semantic Kernel to its cutting-edge applications. We’ll start with the basics—core components and principles—and dive deeper as we code together. You’ll gain hands-on experience exploring exciting topics such as Small Language Models, Local Models, Plugins, AI Safety, Prompt Templating, and Multi-Modality. Discover how Semantic Kernel enables seamless integration of functionalities like chat completion, image and audio generation, and even executing local code with AI models.\n\nThis session will also showcase how to leverage OpenAPI to extend the power of Semantic Kernel, simplifying complex tasks while maintaining robust AI safety and performance. Whether you're a beginner or looking to deepen your understanding, this talk will equip you with practical insights and actionable skills for using Semantic Kernel in innovative ways."
			},
			{
				speaker: 'Joe Glombek',
				title: 'Why am I being such a git about best practices?',
				speakerIds: ['joe-glombek'],
				description:
					"Are your git repos a dumping ground for code? I'm really fussy about how people use git - and that's a good thing. We'll take a look at branching strategies, the importance of commit messages and how often should you commit, anyway? Let's investigate how, with 5 simple tips, we can turn a code dump into a glorious archive of software and how this can save time, frustration and money."
			},
			{
				speaker: 'John Kilmister',
				title: 'A Developers Guide to Getting the Most out of Containers',
				speakerIds: ['john-kilmister'],
				description:
					'Containers seem to be everywhere however are we getting the most out of them during the development lifecycle?\n\nIn this session, we will cover container basics before looking at the best practices for creating and tagging containers, examine how we can use dev containers to enhance our workflow, and examine test containers.'
			},
			{
				speaker: 'Carly Richmond',
				title: 'How to Destroy a DevOps Engineer',
				speakerIds: ['carly-richmond'],
				description:
					"Abstract\n\nRetaining Software Developers is a significant challenge for teams. According to the Infragistics Reveal Survey, 37.5% of respondents expected difficulty in finding developers in 2023. To retain talent, it's essential to understand factors that lead to dissatisfaction.\n\nJoin me as I discuss antipatterns in management, development, testing and monitoring patterns that can stop you retaining awesome DevOps engineers.\n\nOutline\n\nI’ll cover:\n\n- Alert volume evaluation, and how we alert bombardment leads to burnout and alert fatigue. I’ll also cover best practices for on-call rotation and BYOD usage to stop engineer burnout even when they’re not on call.\n- SLO and metric comparison across teams, and how comparing team metrics rather than improving metrics such as DORA over time for a single team breeds animosity and demoralises engineers.\n- Code reviews with jerkish or unhelpful comments, and the difference between radical candour through constructive feedback and pulling people down.\n- Tool overload, and how selecting a common toolbox reduces the need for context switching.\n- Flaky or poor testing, and how it builds mistrust and apathy in platform quality.\n- Constant work items and a lack of learning time, and how a lack of training opportunities and space to grow leaves engineers feeling stuck.\n- Lack of support for conference attendance and speaking, and how community connections help engineers grow and learn."
			},
			{
				speaker: 'Andrew Poole',
				title: 'How to fall in love with automated tests!',
				speakerIds: ['andrew-poole'],
				description:
					"This session is in two parts:\n1) How to get the maximum mileage from a minimal number of tests - end-to-end component tests\n2) Integration Tests - how to not hate them and also sort out your local dev experience!\n\nPart 1 Introduces, explains and demonstrates an approach to automated testing which covers as much of the surface area of your codebase as possible.\n\nImagine a unit test where the 'unit' is actually multiple executables! A single test can cover the whole happy path flow of a complex piece of orchestration, from API handlers, service bus handlers, database calls etc all in-memory, fast and with a nice fluent developer experience!\n\nBecause everything including the Program.cs and startup code are covered we can spot configuration and IoC issues which are hard to test with more traditional methods. I include a method of mocking and asserting against Azure Service Bus\n\nPart 2 discusses the usual issues with integration tests and how they expose the issues with running an app locally. It shows some strategies for fixing some of those issues and actually making integration tests useful, mainly leaving the thing you are testing in a running state on your machine. This is a achieved by means of a script to set up local configuration without having to remember not to check env secrets into appsettings.dev files. Also using Fixtures which do things like setting up queues, topics and subscriptions.\n\nThe aim of both parts of this talk is to have a repo which when pulled down onto a fresh machine, builds first time, component tests pass first time, then having run the script and the app, the the integration tests pass first time, after which you can push F5 and have it all run with almost no time or effort!"
			},
			{
				speaker: 'Rachel Breeze',
				title:
					'Rethinking Website Carbon Calculators: Alternative Ways to Measure Digital Emissions',
				speakerIds: ['rachel-breeze'],
				description:
					"Website carbon calculators are widely used for estimating the environmental impact of websites. While they’re a helpful starting point, they often rely on general assumptions and incomplete data, which can lead to oversimplified or inaccurate results. Are they really telling the full story?\n\nIn this talk, we’ll take a closer look at the limitations of these tools—such as their reliance on averages for energy usage, lack of context about server efficiency, and ignoring how users actually interact with sites.  We’ll explore practical alternatives and ways of reducing your website's carbon footprint."
			},
			{
				speaker: 'Dylan Beattie',
				title: 'How To Be A Rockstar Developer',
				speakerIds: ['dylan-beattie'],
				description:
					"One evening in 2018, Dylan Beattie sat down in a bar, opened a laptop, and wrote a joke: a parody specification for Rockstar, a programming language based on the lyrics to 1980s power ballads. The joke was supposed to end there: a single Markdown file that folks would read, maybe laugh a bit, and then get on with their lives... well, that's not quite how it worked out. The internet's a big place, and a little corner of it  took Rockstar to their hearts: they found it, they loved it - and then they implemented it. Six years on, Rockstar has shown up  in the most unlikely places, from Classic Rock magazine, to Advent of Code, to Carnegie Mellon University and MIT - and each time, it attracts a new wave of aspiring Rockstar developers, with questions about how it works, and suggestions about how to make it better. And so, one evening in 2024, Dylan sat down in another bar, opened another laptop, and wrote another joke: \"Rockstar 2.0: The Difficult Second Album\".\n\nOn one level, Rockstar in 2024 is a stupid joke language based on Bon Jovi songs. On another level, it's packed with things that would have been impossible even just a few years ago: a project that combines .NET, C#, JavaScript, browser APIs, and web assembly, building on decades of research in parser engineering and asynchronous application development. And yes, it's still based on Bon Jovi songs.\n\nThis is the story of Rockstar 2.0. You'll learn about the history of esoteric programming languages, from INTERCAL, to Piet, to the researcher who taught Perl to speak Latin. You'll learn what's involved in creating an entirely new programming language. You'll see a lot of cool tech, you'll marvel at just how much engineering can go into one joke, and who knows - you might even qualify as a Certified Rockstar 2.0 Developer."
			},
			{
				speaker: 'Stu Lang',
				title: 'Mutation Testing - Kill them mutants',
				speakerIds: ['stuart-lang'],
				description: 'A talk about Mutation Testing and Stryker'
			},
			{
				speaker: 'Vijay Patel',
				title: 'Rapid Prototypes & Throwaway Code',
				speakerIds: ['vijay-patel'],
				description:
					'Users don\'t always tell you what they really need.\nAnd whiteboard sketches don\'t always make sense to everyone.\nRapid Prototypes help to get everyone on the same page,\nAnd to find answers to complicated problems.\n\nI\'ll walk through a real-life scenario in the world of "Drug Testing In The Olympics".\n\nThe talk will explain a real operational problem, describe what the Users wanted, and how we discovered what they *really needed*.\n\nWe\'ll use diagrams, UML and C# code to explore as we go.\n\nThis technique is inspired by "Model Exploration Whirlpool" in the Domain Driven Design community (the other DDD!).'
			},
			{
				speaker: 'Sean Farmar',
				title: 'Understanding The Business Problem',
				speakerIds: ['sean-farmar'],
				description:
					'One pattern I see again and again in software projects is related to the interaction between the business and the developers.\n\nThere are a few aspects to this, but one of the challenging ones is focusing on the solution instead of the problem the business is trying to solve, and this is done by both the business and the developers.\n\nAnother aspect is how well we, as developers, understand the business domain, mostly if we want to engage in Domain Driven Design.\n\nIn this talk, I will try to explain why it is so important to understand the business domain and the business problem we are trying to solve.'
			},
			{
				speaker: 'Kevlin Henney',
				title: 'Adventures in Spacetime',
				speakerIds: ['kevlin-henney'],
				description:
					"Developers often find themselves caught in the crossfire of web calls, databases, microservices and other remote interactions. In battling all the infrastructure, platforms, middleware and frameworks their architecture has amassed, plus the legacy of code they may have inherited, they often don't have the chance to take a step back and consider the fundamental nature of distributed systems — fundamentals that limit what is possible and shape everything from the user experience to the breadth of architecture and the detail of code.\n\nThis is not a talk about APIs, SDKs, middleware or specific architectural styles, but a view of the fundamentals from the perspective of history, physics, code and entertainment. This talk takes in causality, clocks, relativity, CAP theorem, the fallacies of distributed computing and more!"
			},
			{
				speaker: 'Clifford Agius',
				title: 'Could a Co-Pilot be an Aircraft Co-Pilot',
				speakerIds: ['clifford-agius'],
				description:
					"Welcome aboard, fellow travelers!\n\nIn this talk, we’re strapping on our metaphorical aviator goggles and diving into the cockpit to explore the fascinating world of AI Co-Pilots and could they and more importantly should they be used in a real world flight deck?\n\nBuckle up, because this flight is about to get bumpy—in a purely intellectual turbulence kind of way.\n\nUsing aircraft incidents and accidents we will see if an AI Co-Pilot would have saved the day... If you have a fear of flying maybe skip this one but I will say before you run out that none of the accidents are fatal so nothing to be scared of....\n\nYou don't need to be an AI specialist or even know anything about it, as we are just exploring the decisions pilots have to make in very limited timescales with limited information and throwing in some human factors to spice it up a bit. These are all good skills you can use in any decision making at work.\n\nThe aim of this session is to hopefully show you that AI can help but should we use it?\n\nYou will walk away knowing a bit about AI and have some fun geeking out on aviation."
			},
			{
				speaker: 'Gary Ewan Park',
				title: "Let's ship this thing!",
				speakerIds: ['gary-ewan-park'],
				description:
					'Have you ever been really excited about shipping a new version of your application, only to find out that you haven\'t done some of the administration "stuff" for it?\n\nFor example, understanding and documenting exactly what is included in the new release? Creating release notes for the end user, or even knowing what the "correct" next version number for the application should be!\n\nIn this session, we will look at a series of different strategies, and tools, that can be used to aid in the complete application development and deployment lifecycle, in order to allow you to "just ship it"!'
			},
			{
				speaker: 'Lotte Pitcher',
				title: 'Successfully Navigating Open Source Waters',
				speakerIds: ['lotte-pitcher'],
				description:
					'Diving into the open source world - whether as a consumer, contributor, or maintainer - can feel like navigating uncharted waters. How do you choose the right projects? What are the unspoken rules of engagement? How can you contribute effectively and build meaningful connections?\n\nIn this session we’ll go beyond the code to explore essential topics like licensing, governance, community dynamics and collaboration best practices.  We’ll review some popular open source projects to find inspiration in their successes and learn lessons from their challenges.\n\nWith over ten years of community contributions to the open source .NET CMS Umbraco, and now as a member of their Developer Relations team - Lotte knows the challenges of building a commercially viable product and a sustainable community, while still giving code away for free. Whether you’re a maintainer or a user of open source software, you’ll leave this session with actionable ideas on how to better navigate the open source waters -  because there’s much more to it than just “dotnet add package”!'
			}
		]
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
		summary: 'Our third year at Engine Shed.',
		talks: [
			{
				speaker: 'Kevlin Henney',
				title: '#FAIL',
				speakerIds: ['kevlin-henney'],
				description:
					"Software doesn't always work out. Looking at the number of software failure screens in public places or that we encounter daily on the web or our mobile phones, it sometimes seems that software developers and organisations are the most significant creators of guerrilla installation art around the planet.\n\nWhat happens when software fails? We regard it as a normal and personal inconvenience when apps crash or servers become unavailable, but what are the implications beyond the individual user? Is software reliability simply a business decision or does it have economic, social and cultural consequences? What are the moral and practical implications for software developers? And when we talk of 'systems', are we part of the 'system'?\n\nIn this talk we will explore examples of failures in software and its application, the details of how they came about, and how such failures affect us at different scales, from user to society, from code to product management. Software failures can be entertaining or disastrous. They can also be instructive — there's a lot we can learn."
			},
			{
				speaker: 'John Kilmister',
				title: 'Beyond Coding: Skills for a Successful Programming Career',
				speakerIds: ['john-kilmister'],
				description:
					'An exceedingly long time ago I imagined that working in programming meant machines, code and lots of cola. After a 20-year career, I have learnt that some of the most valuable skills to a successful programming career are found elsewhere.\n\nIn this session I hope to share my experiences and lessons learnt through three core areas; non-coding skills, building a career and delivering software.\n\nIn the skill section, we will talk about the learning mindset, embracing pragmatism, expanding communication skills, understanding different business units, creating luck, and identifying biases.\n\nThrough the career section, we will look at choosing the right organisation, when to move on, and when it is good to be a generalist or a specialist along with different career tracks.\n\nFinally, we will talk about the skills of choosing the right tech stack, choosing between time, cost and quality and how we can focus on lean and MVP approaches to deliver our software.'
			},
			{
				speaker: 'Samuel Nebeolisa',
				title: 'Domain-Driven Design: Bridging the Gap Between Business and Technology',
				speakerIds: ['samuel-nebeolisa'],
				description:
					"In this session, we will take a comprehensive look on DDD and how it can help us bridge the gap between the stakeholder and the Technology. We will see how best to apply DDD in today's Software and Ubiquitous Language of DDD can help boost the features of the application and its user friendliness. We will go further to see how to extract and apply the expert knowledge into the system in building various features of the system. We will also consider the pros and cons of DDD and how DDD can help strengthen the life span of the system.\nA real life scenario will be use to explain in detail how DDD works."
			},
			{
				speaker: 'Kevin Smith',
				title: "Let's start using MongoDB in our next .NET project!",
				speakerIds: ['kevin-smith'],
				description:
					"I've had a passion for MongoDB since the first release of version 1. It's packed with features and is the most popular general-purpose document database out there. In this talk, we'll cover the reasons why we'd use MongoDB over traditional relational databases, and the many ways we can access and interact with our data within a .NET application."
			},
			{
				speaker: 'Aaron Green',
				title: 'Confident Communication for Developers (And Why It Matters).',
				speakerIds: ['aaron-green'],
				description:
					"Being autistic, confidence—especially in communication—hasn't always come naturally to me. I often found myself searching for the mystical, elusive rules underlying communication, likability, rapport, and trust, frustrated by my inability to build the relationships and achieve the life results I wanted.\n\nThere was a time when even being in large groups of people filled me with anxiety, causing me to freeze up. But I was determined to change this. So, as an autistic person might do, I obsessively delved into books, consumed hours of video content, and experimented through trial and error to try and uncover the principles of confident communication.\n\nMy current job stands in stark contrast to where I began—it centres around my ability to communicate, connect with, and establish trust with people I've never met. It demands an extraordinary level of confidence in my communication skills, a trait I hadn't always possessed, and one that certainly hasn't been acquired easily.\n\nRecruiting within the technological space, I frequently encounter a lack of confidence as a barrier for technically adept individuals securing the positions they are qualified for, especially within senior roles. That kind of sucks and I'd like to give people the tools to think about their communication in a different way.\n\nConfidence is the secret sauce that helps you build trust in others, and the ability to communicate confidently can unlock not only better quality interactions but also new career prospects, higher salaries, improved team buy-in, stronger work relationships, and, in my opinion, a better overall quality of life.\n\nI want to take you on a journey, through belief, body language, and a little bit of science, covering as much as I can in a short space of time - to at least offer you a fresh perspective on communication. This talk is designed to inspire hope; and to show you that if you feel your communication could use some work, it's within your power to improve it and get the opportunities you deserve in your tech career"
			},
			{
				speaker: 'Charles Rea',
				title: 'Elevating OAuth Security',
				speakerIds: ['charles-rea'],
				description:
					"You may have worked with OAuth 2.0 and OpenID Connect for your authorization and authentication requirements - but would you llike to learn the high-security extensions used in sensitive sectors such as banking and healthcare?\n\nIn this talk, we'll explore modern developments that can be used to provide additional layers of security in OAuth. We'll see how to improve client authentication security; how to prevent malicious use of leaked or stolen access tokens; and how integrity protection prevents unauthorized tampering with our authorization requests.\n\nWe'll use this as a chance to dig into core OAuth concepts and explore under the hood - no up-front in-depth knowledge of the OAuth specification required to understand these concepts!\n\nYou'll leave with a deeper insight to the inner workings of Oauth 2.0; and know a whole list of new acronyms, from PAR and JAR, through to DPoP and FAPI!"
			},
			{
				speaker: 'Anna-Maria Wykes',
				title: 'OpenAI vs Azure OpenAI',
				speakerIds: ['anna-maria-wykes'],
				description:
					'Have you been asked by your employer to start exploring AI, especially LLMs (Large Language Models)? How could it help your business? How to use ChatGPT? Do you want to better understand AI tooling that will allow you to generate and interpret images? Such as DALL·E and CLIP? Whatever your journey, more and more of us want to better understand OpenAI and what it can offer us.\n\nWhether your thirst for understanding of OpenAI is a result of your day job, or simply a growing interest, the suite of tools available within OpenAI is invaluable. However, how suitable is it to start using these tools professionally? If you are asking yourself this question you are not alone. One of the most common questions emerging from the industry is “What is the difference between OpenAI and Azure OpenAI?”\n\nIn this session, we will look at the differences between OpenAI (including ChatGPT Free, Plus and Enterprise) and Azure OpenAI. We’ll look at when best to use each offering, with direct comparisons including security, reliability, training, and support.\n\nBy the end of this session, you will have a better understanding of the different serving offerings for OpenAI and have more confidence in when to use each one.'
			},
			{
				speaker: 'Youngho Andrew Chaa',
				title: 'Unleash Your Inner Trader: Create & Back-Test Strategies with Python & JavaScript',
				speakerIds: ['youngho-andrew-chaa'],
				description:
					"Unleash Your Inner Trader: Create & Back-Test Strategies with Python & JavaScript\n\nIf I say, \"Ever wondered how traders predict market movements and make profitable decisions? This talk unlocks the secrets!\", I would be lying ...\n\nFirst, traders don't try to predict market movements. It's more of a probability game. Secondly, this talk will only scratch the surface, yet could be a helpful introduction.\n\nNo prior experience will be needed. We'll delve into the basic concepts of trading, equipping you with the knowledge to understand market dynamics and identify potential opportunities.\n\nGet hands-on: Buckle up as we embark on a coding journey! We'll write Python and JavaScript code to back-test these strategies, putting theory into practice and simulating real-world-like scenarios."
			},
			{
				speaker: 'Richard Jackson',
				title: '.NET, Azure & Umbraco: The Second Twelve Months',
				speakerIds: ['richard-jackson'],
				description:
					"The sequel to last year's \".NET, Azure & Umbraco: The First Twelve Months\", this is talk gives an insight into the difficult second year, the \"Not quite new, still don't know what I'm doing\" phase of being a software engineer.\n\nThis autobiographical account of the past year aims to provide advice, guidance and perspective from someone navigating through the tech world, with a genuine focus to be \"less ego, more information\".\n\nLast year's DDD saw me give my first conference talk, and since then I've become an international public speaker. Last year I was still an MSc. Computing student, this year I'm a graduate. Last year I didn't understand dependency injection, this year I still don't understand dependency injection, but I use it more often!\n\nAll that is to say, a lot has changed, and I'd like to tell you about it.\n\nJoin me as I share my learnings, triumphs and failings in an informative and constructive manner, aimed to help both those following a similar career path and to give a refreshed perspective to those who have known these experiences all to well."
			},
			{
				speaker: 'Jennifer D. Daniel',
				title: 'An above average tech ecosystem',
				speakerIds: ['jennifer-d-daniel'],
				description:
					"In this session, I'll delve into the essential components of creating and sustaining a thriving tech ecosystem. From innovation hubs to supportive infrastructure, I'll explore the key elements that contribute to an above-average environment for technological advancement. I'll also shine a spotlight on the crucial role that women play in driving innovation and entrepreneurship within these ecosystems. From fostering diversity to promoting inclusivity, I'll discuss how empowering women in tech is not just a moral imperative but also a strategic advantage for building robust and dynamic tech communities."
			},
			{
				speaker: 'Anna-Maria Wykes',
				title: 'How to Run Code Clubs for Neurodiverse Children',
				speakerIds: ['anna-maria-wykes'],
				description:
					'Code Clubs offer an amazing opportunity to introduce our next generation to coding, with simple brightly colored drag-and-drop tooling to get them started, we are successfully inspiring many to join the tech industry.\n\nHowever, what about those children who do not feel comfortable walking into an unfamiliar setting, surrounded by strangers, in a very noisy environment? What about those who wouldn’t even think a career in tech would be suited to them? What I am describing is often the neurodiverse children, those with Autism, ADHD, Dyslexia, Dyscalculia. To them a typical Code Club environment can be very intimidating, and sadly, this is effectively excluding a large group of talented young people, many of whom have great potential to work in tech.\n\nCode Clubs are invaluable, and are definitely doing a great job to attract children from different minorities into the industry, but unfortunately, not necessarily those who are neurodiverse. When this became apparent to me, I joined forces with a local Code Club, and a charity for children with special needs, and together we have set up a monthly Code Club that offers a safe, comfortable environment for neurodiverse children.\n\nIn this session I want to talk you through my journey setting up a Code Club for neurodiverse children, what I found worked, and what doesn’t. I hope that from this session you will be inspired to follow the same path I have, using your amazing tech experience to empower some of the most vulnerable children, enabling them to become inspired not just by coding, but the tech industry itself.'
			},
			{
				speaker: 'Lizzie Darville',
				title: "It's not us, it's them! What the software industry can learn from group psychology",
				speakerIds: ['lizzie-darville'],
				description:
					'Ever celebrated with your team when a high stakes release is finally out of the door? Or gathered for tabletop gaming sessions with a group of like-minded people from the office? The ties that bind us as groups are strong, and have multiple benefits. However, our many, varied social groupings can have a downside, and understanding the psychology of groups is as important in the workplace as in other areas of our lives. This talk covers learnings from performance and social psychology to understand the positives (and negatives) of team working.'
			},
			{
				speaker: 'Joe Glombek',
				title: "Celibrate you're misteaks",
				speakerIds: ['joe-glombek'],
				description:
					"\"Everyone makes mistakes.\" We've heard it time and again. But there's always that nagging voice inside our heads telling us to hide it away somewhere. But why be ashamed?! Besides, this can lead to more mistakes in the future. We'll take a look at some of my mistakes and even look at some extreme cases where mistakes can cost lives.\n\nAs well as looking at how hiding mistakes can be damaging to our confidence as well as to our work, we'll discuss how and when to talk about our mistakes along with success stories and how highlighting past mistakes can help save time, effort, and - most importantly - shame as individuals, teams, and as a community."
			},
			{
				speaker: 'Stuart Lang',
				title: 'Demystifying .NET Debug Symbols',
				speakerIds: ['stuart-lang'],
				description:
					"In this lightning talk we'll dive into debug symbols (PDBs), what they are useful for, and bust some myths. We'll look at all the options available when deploying to production, and pushing packages to NuGet for package authors."
			},
			{
				speaker: 'Matt Hunt',
				title: "Happy Developers (Don't Do Drugs)",
				speakerIds: ['matt-hunt'],
				description:
					"Having been contracting for many years Matt has experienced the culture and working practices both good and bad in many different companies and teams. Often he has found that many of the developers aren't motivated or are generally unhappy with their working environment and culture.\n\nWhile this isn't always the case, one thing is for sure, unhappy developers are not productive developers. From his experience, Matt has come up with 3 areas to expand upon and develop to create a place in which developers are more likely to be happy and thrive. Educate, Enthuse and Empower.\n\nThis talk goes into depth on each of those areas looking at what might happen if they are not addressed and with ideas on how to achieve each."
			},
			{
				speaker: 'Danielle Dias',
				title: 'Shifting Left with Burp Suite: A Lightning Approach to Endpoint Testing',
				speakerIds: ['danielle-dias'],
				description:
					'In the ever-evolving landscape of cybersecurity, securing endpoints remains a critical challenge. Despite current strategies and practices, attackers continue to find new ways to exploit vulnerabilities. This highlights the need for a proactive "shift-left" strategy to detect and address threats early in development. Companies face vulnerability to attacks when they lack awareness and understanding of security testing tools like Burp Suite, a comprehensive web application testing tool, especially in the early stages. The talk will give an overview of Burp Suite features, with practical demonstrations. You will gain insights into attackers\' exploits and understand testing basics.'
			},
			{
				speaker: 'Nurhak Kaya',
				title:
					"A Software Developer's Guide to Designing Better Software Apps: Key Strategies and Best Practices",
				speakerIds: ['nurhak-kaya'],
				description:
					"The most fundamental problem in computer science is how to take a complex problem and divide it up into pieces that can be solved independently.\n\nThis is a central design task that Software Developers face every day, and the success of software applications depends on the careful application of design principles that prioritize efficiency, maintainability, and user satisfaction.\n\nIn this talk, I'll explore key design principles that can guide developers in creating better software solutions, like modular design and abstraction, tactical vs. strategic programming, complexity & consistency of software design, defining errors, designing for performance, modifying existing code, exception handling as well as things like documenting software and writing better comments."
			},
			{
				speaker: 'Rachel Breeze',
				title: 'Debugging: More than breakpoints and log analysis',
				speakerIds: ['rachel-breeze'],
				description:
					'Debugging is a cornerstone of software development, and understanding its role is pivotal for building robust applications.\nIn this talk, we explore  strategies to help debug our applications. Our journey takes us through the debugging tools offered by C#, SQL Server Management Studio, and the Azure Portal.'
			},
			{
				speaker: 'Andrew Poole',
				title: 'Fluent Method Chaining in C#',
				speakerIds: ['andrew-poole'],
				description:
					'What if there was a way to declaratively describe a chain or flow of async methods, which could be used when handling API requests or messages from a service bus queue or actually anywhere?\nRecently, while refactoring a growing piece of business logic, we found a way to achieve this. The logical conclusion is that related flows can be described in one place, in a single piece of orchestration, which is very easy to understand, navigate and debug. The flows are self documenting and with some thought, even readable by product owners and business analysts etc.'
			},
			{
				speaker: 'Molly Painter',
				title: 'Functional Programming with C#',
				speakerIds: ['molly-painter'],
				description:
					"Functional Programming is becoming increasingly popular and relevant with each year that goes by.  With so much discussion around languages such as F#, Haskell and Erlang, it can seem as though getting started with Functional programming would mean first learning a whole new syntax...but what if it didn't?\n\nMost .NET developers are familiar with the use of Linq, and basic constructs such as IEnumerable, Func delegates, arrow functions and ternary expressions, but did you know that you can use all of this to implement some of the most powerful patterns and techniques from the world of functional programming?\n\nThis talk will demonstrate how, using only familiar features available in out-of-the-box C#, to write Functional code that is:\n\n* More robust\n* Easier to read\n* Easier to maintain\n\nAs well as these benefits, Functional code is a great enabler for the use of concurrency with Async functions and Serverless applications with technologies such as Azure Functions.\n\nThis talk might be of interest to anyone looking into moving to a new platform, or in improving the scalability of an existing application, or even just interested in seeing what Functional Programming is all about, but all within the comfort of a familiar language.\n\nWe might even attempt the impossible, and explain what a Monad is!"
			},
			{
				speaker: 'Matt Lacey',
				title: 'Documentation, Testing, and the Future of Software Development',
				speakerIds: ['matt-lacey'],
				description:
					'There\'s probably nothing most developers like less than writing documentation and tests. Despite good and bad reasons for this, the growth of AI and the changing landscape of software development mean they are becoming increasingly indispensable for developers aiming to build high-quality, reliable, and scalable software.\nWhat you should consider as "documentation" and "testing" will also surprise you as it covers much more than you think.\nThrough real-world examples and practical insights, this session highlights how investing in documentation and testing streamlines collaboration, enhances efficiency, improves software reliability, and ultimately leads to more satisfied developers, users, and businesses.'
			},
			{
				speaker: 'Poornima Nayar',
				title: 'REST, gRPC, GraphQL or Asynchronous Messaging',
				speakerIds: ['poornima-nayar'],
				description:
					'Be it any industry, applications need to talk to each other. So, developers often build bridges – Application Programming Interfaces (API) – to allow one system to communicate with another.\n\nREST, gRPC, GraphQL and Asynchronous Messaging are all patterns of communication between distributed systems. What are the core concepts behind these patterns? Do you know what problems they try to address? What about the use cases? Join my session to find out the answers to these questions!'
			},
			{
				speaker: 'Dee Bolt',
				title: 'Unlocking Strong Authentication: A future beyond passwords',
				speakerIds: ['dee-bolt'],
				description:
					'In an era where cyber threats loom large and traditional password-based authentication methods prove increasingly vulnerable, the need for robust and secure authentication mechanisms has never been more pressing.\n\nThis talk delves into the concept of strong authentication methods and explores innovative solutions that go beyond the limitations of passwords. By embracing advanced technologies such as passkeys and biometrics, we can create a future where users can authenticate their identities with confidence and convenience.\n\nJoin us as we navigate through the challenges of modern authentication, uncover the flaws of traditional password systems, and discover the promise of a password-free future where security meets simplicity.'
			},
			{
				speaker: 'Sean Farmar',
				title: 'Why DevOps and Microservices are a great fit?',
				speakerIds: ['sean-farmar'],
				description:
					'You want to do DevOps and move fast using continuous delivery but your architecture is holding you back. In this talk, we will look at how a microservices architecture is essential to make DevOps and CI/CD successful.\n\nWe all want to get out of the rot of traditional SDLC, waterfall, big ball of mud...\nWe want to be faster, more flexible, providing more value upfront, WINNING 🙂, have short feedback loops, be able to work in small cross-functional teams.\n\nTo do that we want to be able to do continues delivery and continues deployment which leads us to what is described in the DevOps handbook...\n\nTo do that:\nYou should be able to reliably (tested, secure….)\nDeploy small units of work to production (reduce the risk in deploying new code to production (roll forward, blue-green ))\nHave many teams work in parallel autonomously across the system functions (business).\nDecrease lead time of features and bug fixes to production.\n\nThis is all well and good but when we try to get there we keep getting pulled back by our architecture.\n\nWhen we look at successful DevOps transformations we see that architecture is one of the significant factors of success.\n\nIn this talk, we will cover Identifying boundaries, monolith decomposition and bounded contexts and how we can build better microservices so our DevOps will be a win 🙂.'
			}
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
		talks: [
			{
				speaker: 'Matt Hunt',
				title: 'Cleaning your “Big Ball of Mud” with CQS',
				speakerIds: ['matt-hunt'],
				description:
					'Having worked as a contract developer for many years Matt has had the pleasure of seeing a lot of systems, built using many different patterns and architectures. One thing they all had in common though was that, more often than not, over time the codebase would degrade into a "Big Ball of Mud". The Command Query Separation pattern can help keep code maintainable, easy to test and help you conform to SOLID principles. In this talk, we will discuss what CQS is, its benefits and how it differs from CQRS.'
			},
			{
				speaker: 'Huw Jeffries',
				title:
					'Migrating a cloud native bank away from shared credentials – lessons learnt in technical migrations',
				speakerIds: ['huw-jeffries'],
				description:
					'We will discuss how to lead mass technical migrations in large organisations, beginning with the skills required to get senior stakeholders to give the time, money, and support needed to run the campaign. We’ll also cover demonstrating great decision making and other methods to get everyone aligned with the approach.\n\nGetting time and money is one thing, bringing everyone on the journey and making migrations easy is the next challenge! We’ll cover how to thrive as a pseudo product owner (ask, don’t tell) and how to create a great developer experience. We’ll also look at identifying and managing evolving and emerging stakeholders.\n\nFinally, we’ll take a deep dive into the technical challenges of moving from static credentials to Azure Managed Identity. We’ll see some of the tooling we built to support the migration and explore the good, the bad and the ugly gotchas!'
			},
			{
				speaker: 'Ian Cooper',
				title: 'Being Staff Plus',
				speakerIds: ['ian-cooper'],
				description:
					'For a long period of time the only path that organizations offered developers who wanted to grow their influence was the management track. In recent years organizations have begun to offer individual contributor roles beyond senior developer such as staff or principal engineer.\n\nStaff Plus roles differ from senior engineering roles and require new skill sets to influence, guide and shape the engineering direction of an organization and often require the engineer to work independently.\n\nIn this presentation we will cover what you need to know about Staff Plus roles:\n\n* Staff Plus Roles and Archetypes\n* Moving Beyond Code\n* Technical Leadership\n* Work on What Matters\n\nWe will cover topics around influence without authority, determining where to spend your time, and how to help the engineering teams succeed.\n\nWe will finish with an exploration of how you move toward a Staff Plus role'
			},
			{
				speaker: 'Murthy Upadhyayula',
				title: 'Maths + Code = Art',
				speakerIds: ['murthy-upadhyayula'],
				description:
					'As a father of a six year old girl, I often wondered how I could entice my little one into coding and math and steer her away from stereotypical so-called feminine careers.\n\nOne way to do this is by explaining to her the importance of programming and automation in today\'s world and show her the lucrative jobs that are available for her such as software development at a Banking Firm. Having tried this and failing miserably, I thought of an alternative.\n\nI showed her a cool motion graphic, or an audio visualizer that\'s very colourful, that would make her go "Wow". Without any prompting, she asked me how I made it. Art is a language she speaks (and most kids for that matter). If we can show our kids that "code" is another kind of brush to make art, then we might have a better chance at grabbing their attention.\n\nAside from this fact, generative and procedural art has many applications in film, games, and virtual production. The goal of this talk is to introduce the concept of visual scripting using Geometry Nodes in Blender. We will finish off by compositing the final result into a Music Video of sorts as a practical example.'
			},
			{
				speaker: 'Molly Painter',
				title: 'SOLID Principles in 5 Nightmares',
				speakerIds: ['molly-painter'],
				description:
					"The 5 SOLID principles - popularised by \"Uncle\" Bob Martin in some of his highly influential books on Object Orientated Software development - are rarely cited directly but they are nevertheless at the heart of a lot of the thinking that goes into modern software development.\n\nThese principles have been around in some form or other ever since the 1980s, but continue to be just as relevant today as they were then.\n\nIn this talk, we're going to look at each of the 5 SOLID principles, these being:\n\n* Single Dependency Principle\n* Open/Close Principle\n* Liskov Substitution Principle\n* Interface Segregation Principle\n* Dependency Inversion Principle\n\nSee what he did there with the names?\n\nWe'll look at each in turn, with the help of some slightly imaginative examples taken from a popular SF franchise.  What are they, what nightmare scenarios can occur if they aren't followed, and how they can subsequently be applied."
			},
			{
				speaker: 'Eli Holderness',
				title: 'User testing in production: how to run a public beta',
				speakerIds: ['eli-holderness'],
				description:
					'You’ve built something. It isn’t fully ready for a proper launch, but you want to let people start using it anyway. You’re thinking about running a public beta.\n\nAlmost every new feature at Anvil makes its debut with a public beta, and I want to share some of the things we’ve learned along the way. For example, when does it makes sense to use one? How do you handle documentation when something isn’t quite official yet, and might be replacing an existing feature? When is it too early to go to beta - or too late?\n\nIn this talk, I’ll discuss why and when you might want to run a public beta, and what you can expect out of the experience - good, bad, and ugly. I’ll talk about user feedback: ways to collect it, how to interpret it, and whether you should act on it. Finally, I’ll talk about how to decide when it’s all over, and what to bear in mind as you take the plunge into General Availability.\n\nThis talk is aimed at anyone with an interest in feature launches and user engagement. The audience should come away with a good idea of when public betas make sense as a strategy, what the goals of that beta should be, and how best to achieve them.'
			},
			{
				speaker: 'Adam Jones',
				title: 'Teabags, Muddy Knees and Imposter syndrome: Atypical careers in tech',
				speakerIds: ['adam-jones'],
				description:
					"In a career spanning the factory floor, call centres, dev teams and board rooms, it's fair to say Adam has had some pretty varied life experience. In this talk he will share his personal reflections on what it means to navigate a career from an atypical path. He will discuss the value of experience which comes outside of typical education to work routes and how this cognitive diversity adds value, especially in technology. Ultimately, the session will provide insight on what this means for building great teams, and also getting the best out of ourselves."
			},
			{
				speaker: 'Gary Short',
				title: 'A Day In The Life of A Data Scientist',
				speakerIds: ['gary-short'],
				description:
					"In this hour long session I'll walk you through a typical day in the life of a data scientist (me). We'll look at a real world question and how I go about working out the answer."
			},
			{
				speaker: 'Ian Griffiths',
				title: 'High Performance JSON Serialization with Code Generation on C# 11 and .NET 7.0',
				speakerIds: ['ian-griffiths'],
				description:
					'In this talk you will see how features added to recent versions of C# can dramatically improve parsing and generation of JSON data compared with longer established .NET JSON handling mechanisms. You will see how to use high-performance memory-efficient techniques (including Spans and IO Pipelines), and also how code generators can reduce runtime overheads. This talk will explore the tradeoff between maximizing performance and ease of use, and will show how choose between the various options now available in modern .NET applications.'
			},
			{
				speaker: 'Sneha Ramesh',
				title: 'Developer Ethics - why is it important ?',
				speakerIds: ['sneha-ramesh'],
				description:
					"In this session, we will try to  find answers for important questions\n\n* Are there any code of ethics that every programmer must follow?\n\n* Are there any case studies for breach of ethics from which we can learn ?\n\n* Are there any principles that can be adopted to make the life of a software engineer much easier?\n\nLet's discuss more in detail in the session."
			},
			{
				speaker: 'Richard Jackson',
				title: '.NET, Azure & Umbraco: The First Twelve Months',
				speakerIds: ['richard-jackson'],
				description:
					'This talk focuses around my first twelve months of learning and working within the .NET and Azure space, and my first six months of using Umbraco CMS and being involved in its community.\n\nI’ll be talking from my perspective as a former music educator and junior software developer about my experiences of learning new technologies, what I feel are the strengths and the weaknesses of the training materials currently available, and my opinions on how to encourage and support fellow newcomers to the .NET space\n\nFor new users and those who’re considering using .NET for the first time I’ll be discussing how to avoid common pitfalls, the most conducive ways to ask constructive questions, where to go for the right (and crucially, helpful) answers, and how can learn by contributing to a technology’s growth.\n\nFor more experienced .NETians I’ll be discussing ways to attract, educate and retain new users, supporting them from first time to fulltime!'
			},
			{
				speaker: 'Poornima Nayar',
				title: 'gRPC in .NET: Basics and More',
				speakerIds: ['poornima-nayar'],
				description:
					"gRPC is Google's implementation of RPC. With .NET Core 3.0, gRPC has become a first-class support in .NET.\n\nIn my session, we will look at what gRPC is, and how to both create a gRPC service and consume it. We will also discuss the four modes or methods of gRPC, versioning and also talk about options when it comes to hosting gRPC services."
			},
			{
				speaker: 'Sean Farmar',
				title: 'Using DDD To Decompose Your Monolith',
				speakerIds: ['sean-farmar'],
				description:
					'Software design is hard, maybe the hardest part of building software systems...\nWhen designing distributed systems things get even more challenging.\nNow that Microservices are so popular, we all want to decompose our monoliths to smaller units of independent components. If we don\'t want to end up with a distributed monolith, we need to have a toolbox of design concepts so we can achieve well-defined boundaries between our components groups described as "Services" and "Service Boundaries" in the Service Oriented Architecture or SOA paradigm.\n\nThe traditional way of designing systems based on a domain data model with very complex relationships and dependencies may kind of work when building a monolith, but just breaks apart when you building distributed systems.\n\nOne of the pillars of distributed system design is to solve the coupling problem.\n\nIf we look at the tenants of SOA they all address coupling:\n\n* Explicit Boundaries: In it\'s the simplest form it is to find what belongs together and making sure there are no leakages between the defined boundaries of a "Service".\n* Autonomy: Like in Object orientation, Keep our components and "Services" autonomous, encapsulated and have as little dependencies to the outside as possible.\n* Sharing schema and contracts not classes: Make sure we don\'t introduce coupling by using an open protocol for communication.\n* Compatibility based upon policy: This is the hardest tenant to articulate, but again, it\'s about loose coupling, an explicit API that describes the component\'s behaviour.\n\nIn order to achieve this, we need to rethink how we design our components and "Services"\nWe need to move from monolith thinking to distributed thinking, leaving the single relational data model to multiple vertical bounded contexts that together compose a "Service" boundary.\n\nIn this talk I will walk through the process of designing a very simplistic and naive vertical slice while introducing the concepts from Domain Driven Design (DDD) and SOA, to build a single vertical, from there you will be able to do your first steps to design a loosely coupled distributed system, and be on the way to find you "Service" boundaries.'
			},
			{
				speaker: 'James World and Gareth James',
				title: 'Designing and building an event sourcing system using .NET, CosmosDb and Elastic',
				speakerIds: ['james-world', 'gareth-james'],
				description:
					"Getting an event sourcing based solution right is challenging. And that's true even before you add ambitious quality goals like zero data-loss and great scalability and performance. However, it brings many benefits when done well.\n\nIn this talk, we'll dive into the details of a real-world cloud-native solution built on top of CosmosDb and ElasticSearch. We'll also show how to get great observability in Datadog as well. Whilst we will show a concrete solution, we'll cover the key ideas that will translate into whatever technologies you choose."
			},
			{
				speaker: 'Jennifer D. Daniel',
				title: 'Unlocking Diversity: Empowering Men as Allies in Advancing Women in Tech',
				speakerIds: ['jennifer-d-daniel'],
				description:
					'This session will be a thought-provoking and inspiring presentation aimed at encouraging men to take action and become allies for women in tech. The speaker will discuss the current state of gender diversity in the tech industry, highlighting the persistent imbalance between men and women and the barriers preventing women from participating in tech. The speaker will then discuss the crucial role men can play as allies in advancing women in tech and provide specific steps they can take to become effective and influential allies, such as mentorship programs, sponsoring women for leadership positions, and advocating for policies that support gender equality. The session will also address common misconceptions about men and gender equality and encourage men to take action and make a difference in advancing women in tech. The session will conclude with a recap of the importance of male allies in promoting women in tech and a call to action for men to take the initiative to become allies and make a positive impact in the tech industry.'
			},
			{
				speaker: 'Dee Bolt',
				title: 'Decentralized Identity. Your identity, your control',
				speakerIds: ['dee-bolt'],
				description:
					'Today we use our digital identity at work, at home, and across every app, service, and device we use. It’s made up of everything we say, do, and experience in our lives. From purchasing tickets for an event, checking into a hotel, to even ordering lunch. Currently, our identity and all our digital interactions are owned and controlled by other parties, in some cases, even without our knowledge.\n\nThis identity data has too often been exposed in security breaches. These breaches affect our social, professional, and financial lives. What if there was a better way; one which puts you in control of your identity data... Well now there is.'
			},
			{
				speaker: 'Dylan Beattie',
				title: "There's No Such Thing As Plain Text",
				speakerIds: ['dylan-beattie'],
				description:
					'Software is complicated. Machine learning, microservice architectures, message queues... every few months there\'s another revolutionary idea to consider, another framework to learn. And underneath so many of these amazing ideas and abstractions is text. When you work in software, you spend your life working with text. Some of those text files are source code, some are configuration files, some of them are documentation. Editors, revision control systems, programming languages - everything from C# and HTML to Git and VS Code is based on the idea of "plain text files". But... what if I told you there\'s no such thing?\n\nWhen we say something is a "plain text file", we\'re relying on a huge number of assumptions - about operating systems, editors, file formats, language, culture, history... and, most of the time, that\'s OK. But when it goes wrong, "plain text" can lead to some of the weirdest bugs you\'ve ever seen... why is there Chinese in the event logs? Why is the city of Aarhus in the wrong place? And why does Magnus Mårtensson always have trouble getting into the USA?  Join Dylan Beattie for a fascinating look into the hidden world of text files - from the history of mechanical teletypes to encodings, collations and code pages. We\'ll look at some memorable bugs, some golden rules for working with plain text - and we\'ll even find out the story behind the mysterious phrase "pike matchbox" and what it has do with driving in the Soviet Union.'
			},
			{
				speaker: 'Kevin Smith',
				title: 'Everything You Need to Know About Configuration in .NET',
				speakerIds: ['kevin-smith'],
				description:
					'We will delve into the intricate details of the new ways to configure .Net applications with ease and flexibility in mind.\n\nWe’ll take a look at why we need configuration in our application and the types of things that should be configurable. We will then dive into the great developer story that Microsoft has built for .NET to allow us to provide configuration at easily apply configuration in our applications. Starting with the minimal approach, we will explore scenarios where our configuration practices will take advantage of type safety focusing on the IOptions pattern. There are also lots of other scenarios that we’ll cover that you most likely have never touched such as user secrets and validation!'
			},
			{
				speaker: 'Ross Scott',
				title: 'Blazor state management',
				speakerIds: ['ross-scott'],
				description:
					"We've all seen the Blazor demos and it looks great!\nI've been working on client side apps since .net 1.0 and it's been painful. However, we now have mature, robust frameworks like Angular & React, so Blazor is very much on the back foot.\n\nIt doesn't have the mature ecosystem of other frameworks, so this makes it hard to find best practices, robust architectures and production ready solutions.\n\nI made some bad choices on how to deal with state when I started. So in this session I will take you on an accelerated journey of making mistakes, iterating, learning, and ultimately heading in the right direction."
			},
			{
				speaker: 'Martin Costello',
				title: 'Automating Monthly .NET Patching with GitHub Actions and dotnet-outdated',
				speakerIds: ['martin-costello'],
				description:
					'With the productivity and performance benefits developers gain from using modern .NET over .NET Framework, also comes the less-exciting flip-side - patching the version of .NET in production environments every month to keep your applications secure.\n\nKeeping up-to-date with security and reliability fixes is an important ongoing activity within software development, but it’s not very exciting, and it can be easy to fall behind - what if we could automate the process of patching our applications?\n\nIn this talk, we’ll explore how we can use the flexibility of GitHub Actions together with tools such as dotnet-outdated to automatically patch .NET applications on a monthly basis with minimal manual effort.'
			}
		]
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
		// Assumed: each was listed on the committee before and after this year.
		committee: [{ name: 'Martyn Fewtrell' }, { name: 'Stuart Lang' }, { name: 'Joseph Woodward' }],
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
			'Sessions chosen by public vote, across four tracks plus a Getting Started track. Recordings included talks from Gary Short, Mark Rendle, Phil Collins and Ross Scott ("How I made Pocket DDD").',
		talks: [
			{ speaker: 'Mark Rendle', title: 'Minimalist Software Development' },
			{ speaker: 'Paul Stack', title: 'SpecFlow - functional testing made easy' },
			{ speaker: 'Nathan Gloyn', title: 'Kanban? what is it and how can it help?' },
			{ speaker: 'Jimmy Skowronski', title: 'Coding for PowerShell' },
			{ speaker: 'Rick Spence', title: 'Getting Started With C#' },
			{ speaker: 'Rob Ashton', title: 'Steps to reduce the friction in ASP.NET MVC' },
			{
				speaker: 'George Adamson',
				title:
					"jQuery Templates: Now it's a doddle to simplify your ajax and render data client-side"
			},
			{ speaker: 'Chris Alcock', title: 'NuGet - sweet but not edible' },
			{ speaker: 'John Price', title: 'Computer, earl grey tea, hot' },
			{ speaker: 'Richard Parker', title: 'Getting Started With The .NET Framework' },
			{ speaker: 'Richard Dalton', title: 'The Missing Link - Pushing Through The Pain Of TDD' },
			{ speaker: 'Chris Canal', title: 'Advanced Asp.Net Mvc 3' },
			{ speaker: 'Richard Costall', title: 'Silverlight Beyond the Browser' },
			{ speaker: 'John McLoughlin', title: 'Intro to Windows Workflow Foundation 4' },
			{ speaker: 'Steve Sanderson', title: 'Getting Started With ASP.NET MVC' },
			{ speaker: 'Richard Campbell', title: 'Why Web Performance Matters' },
			{
				speaker: 'Colin Mackay',
				title: 'Parallel... Parallelise... Pallar... Doing stuff at the same time in .NET 4.0'
			},
			{
				speaker: 'Andrew Westgarth',
				title: 'Delivering High Quality Live and On-Demand Video to Multiple Devices'
			},
			{ speaker: 'Kris Athi', title: 'Developing Windows Phone 7 Applications Using Silverlight' },
			{ speaker: 'Steve Hallam', title: 'Getting Started With Visual Studio' },
			{
				speaker: 'Chris Hay',
				title: 'Building seriously scalable websites with ASP.NET with and without Windows'
			},
			{
				speaker: 'Phil Collins',
				title: 'Rewriting software is the single worst mistake you can make - apparently'
			},
			{ speaker: 'Ross Scott', title: "This Android's Life" },
			{ speaker: 'Marc Gravell', title: 'Every Byte Counts - saving bandwidth with protobuf' },
			{ speaker: 'David Ringsell', title: 'Getting Started With Windows Presentation Foundation' }
		]
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
			'The first 250 tickets went in five hours, so capacity was raised to 330. Three talk tracks plus an alternative track of discussions, a balloon debate, planning poker and a workshop.',
		talks: [
			{ speaker: 'Richard Costall', title: 'Silverlight 3' },
			{ speaker: 'Ben Hall', title: 'Embracing a new world – dynamic languages and .Net' },
			{ speaker: 'John Price', title: 'A PC in the living Room – Enter Vista Media Center' },
			{ speaker: 'Chris Hay', title: 'Introduction to Windows Azure' },
			{ speaker: 'George Adamson', title: 'Get Going With jQuery' },
			{ speaker: 'Kris Athi', title: 'Introduction to Video Game Development with XNA' },
			{ speaker: 'Steve Sanderson', title: 'Real-world MVC architecture' },
			{
				speaker: 'Gary Short',
				title: 'Everything you Wanted to Know About Refactoring but Were Afraid to Ask'
			},
			{ speaker: 'Richard Fennell', title: 'What is Scrum?' },
			{ speaker: 'Guy Smith-Ferrier', title: 'What’s New In C# 4?' },
			{ speaker: 'Chris Hay', title: 'ASP.NET Front End Performance' },
			{ speaker: 'Marc Gravell', title: 'Express Yourself' },
			{ speaker: 'Ben Hall', title: 'Creating extendable applications using MEF' },
			{ speaker: 'Jimmy Skowronski', title: 'Real World Interoperability With WCF' }
		]
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
