export interface Principle {
	title: string;
	body: string;
	emoji: string;
}

/**
 * The founding principles of DDD conferences (the series began in Reading in 2005).
 * DDDSW is a free event, funded by sponsors.
 */
export const principles: Principle[] = [
	{
		emoji: '🎟️',
		title: 'Free to attend',
		body: 'DDDSW costs nothing to attend, thanks to our sponsors, so money is never the barrier.'
	},
	{
		emoji: '📅',
		title: 'On a Saturday',
		body: 'Weekend events mean you can come without taking time off work or asking your boss for a day.'
	},
	{
		emoji: '📣',
		title: 'Open submissions',
		body: 'Anyone can propose a talk, from first-time speakers to seasoned experts.'
	},
	{
		emoji: '🗳️',
		title: 'A democratic agenda',
		body: 'The community helps choose the sessions, so the programme is what attendees actually want to see.'
	}
];
