import type { SessionSpeaker } from './SessionSpeaker.type';

export type Session = {
	id: string;
	title: string;
	description: string;
	status: string;
	isInformed: boolean;
	isConfirmed: boolean;
	speakers: SessionSpeaker[];
};
