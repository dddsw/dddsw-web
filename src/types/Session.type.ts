import type { SessionSpeaker } from './SessionSpeaker.type';

export type Session = {
	id: string;
	title: string;
	description: string;
	speakers: SessionSpeaker[];
};
