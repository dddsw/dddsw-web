import { Milestone, get } from '$lib/milestones';

const linkedInIcon = `<a href="https://www.linkedin.com/company/ddd-south-west/" target="_blank">
							<i class="fa-brands fa-linkedin fa-lg" title="DDD South West LinkedIn" aria-hidden="true"></i>
							<span class="fa-sr-only">DDD South West LinkedIn</span>
						</a>`;

const sessionizeUrl = 'https://sessionize.com/ddd-south-west-2026/';
const votingUrl = 'https://buff.ly/4hzncRk';
const ticketTailorUrl = '...';
const pocketdddUrl = 'https://pocket2026.dddsouthwest.com';

export let currentUpdate: string | undefined;

if (get(Milestone.StartPlanning)?.hasHappened)
	currentUpdate = `DDD South West 2026 planning has begun! More info coming soon 😎`;

if (get(Milestone.SetADate)?.hasHappened)
	currentUpdate = `DDD South West is coming... save the date! See you on the <strong class="emphasis">${get(Milestone.TheActualEventDay)?.formattedDate}</strong>`;

if (get(Milestone.OpenCallForSpeakers)?.willBeHappeningSoon())
	currentUpdate = `Watch this space.... call for speakers is opening on ${get(Milestone.OpenCallForSpeakers)!.formattedDate}.`;

if (get(Milestone.OpenCallForSpeakers)?.hasHappened)
	currentUpdate = `Call for speakers is <strong class="emphasis">open until ${get(Milestone.CloseCallForSpeakers)!.formattedDate}</strong>.
		    We are a friendly developers conference and welcome papers from speakers both old and new.
		    So whether you have an established talk you'd like to bring to Bristol or an idea you'd like help developing,
		    <a href="${sessionizeUrl}">submit your talk now</a>.`;

if (get(Milestone.CloseCallForSpeakers)?.hasHappened)
	currentUpdate = `Call for speakers is now closed. Session voting will be opening soon, watch this space or follow us on ${linkedInIcon}`;

if (get(Milestone.OpenSessionVoting)?.hasHappened)
	currentUpdate = `Session voting is now open! Take a look and <a href="${votingUrl}">vote for your favourites here</a>.<br>Voting will close on ${get(Milestone.CloseSessionVoting)!.formattedDate}.`;

if (get(Milestone.CloseSessionVoting)?.hasHappened)
	currentUpdate = `Session voting has closed, hold tight - ticket registration will be opening on ${get(Milestone.AnnounceScheduleAndOpenTicketRegistration)!.formattedDate}`;

if (get(Milestone.AnnounceScheduleAndOpenTicketRegistration)?.hasHappened)
	currentUpdate = `Speakers have been announced and the schedule is live! <a href="/schedule">Check full schedule details here</a>. Get your tickets from <a href="${ticketTailorUrl}">Ticket Tailor</a>.`;

if (get(Milestone.SoldOut)?.hasHappened)
	currentUpdate = `The day is fast approaching, we're fully sold out but you can still join the waitlist on <a href="${ticketTailorUrl}">Ticket Tailor</a>.`;

if (get(Milestone.FoundMoreTickets)?.hasHappened)
	currentUpdate = `Good news - some tickets have become available! Go to <a href="${ticketTailorUrl}">Ticket Tailor</a> to grab one before they go.`;

if (get(Milestone.TheActualEventDay)?.hasHappened)
	currentUpdate = `Today is the day! See you at Engine Shed and be sure to use <a href="${pocketdddUrl}">Pocket DDD</a> to give feedback to our wonderful speakers`;

if (get(Milestone.ConkedOut)?.hasHappened)
	currentUpdate = `Thank you to everyone for another great DDD South West. See you in ${get(Milestone.ConkedOut)!.targetDate!.getFullYear() + 1} 😉`;
