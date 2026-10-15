export interface TeamMember {
	name: string;
	/** Filename in static/images/team */
	photo: string;
	email: string;
	linkedIn?: string;
	bluesky?: string;
}

export const team: TeamMember[] = [
	{
		name: 'Lorraine Pearce',
		photo: 'lorraine.jpg',
		email: 'lorrainepearce@dddsouthwest.com',
		linkedIn: 'lorraine-pearce-688aba8'
	},
	{
		name: 'Russell Day',
		photo: 'russ.jpg',
		email: 'russell.day@dddsouthwest.com',
		linkedIn: 'russellday'
	},
	{
		name: 'Stuart Lang',
		photo: 'stu.jpg',
		email: 'stuartlang@dddsouthwest.com'
	},
	{
		name: 'Carl Sargunar',
		photo: 'carl.jpg',
		email: 'carlsargunar@dddsouthwest.com',
		linkedIn: 'carl-sargunar-63b5814',
		bluesky: 'carlcod.es'
	},
	{
		name: 'Sara Gowen',
		photo: 'sara.jpg',
		email: 'saragowen@dddsouthwest.com',
		linkedIn: 'sara-gowen-27404734'
	}
];

export interface GetInvolved {
	emoji: string;
	title: string;
	body: string;
}

export const getInvolved: GetInvolved[] = [
	{
		emoji: '📣',
		title: 'Spread the word',
		body: 'Sharing our social media posts helps us reach new attendees, speakers and sponsors. Our event is funded solely by sponsorship, so every share is appreciated.'
	},
	{
		emoji: '🎤',
		title: 'Speak at our event',
		body: 'We aim for a broad range of talks and would love to include topics such as mental health, neurodiversity and inclusivity in tech. Lightning talk submissions are very welcome too.'
	},
	{
		emoji: '🙋',
		title: 'Help us on the day',
		body: 'As the event grows we need extra hands. Keep an eye on our LinkedIn feed for volunteering opportunities, or email us.'
	}
];
