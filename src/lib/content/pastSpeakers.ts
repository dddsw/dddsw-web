import speakers from './past/speakers.json';

export interface PastSpeaker {
	name: string;
	tagline?: string;
	bio?: string;
	/** Relative to src/lib/assets/images. */
	photo?: string;
}

/**
 * Speakers from past events, keyed by the ids that talks list in `speakerIds`, from
 * src/lib/content/past/speakers.json. Taken from Sessionize (2023 onwards); where someone spoke
 * more than once, the bio, tagline and photo are from their most recent year.
 */
export const pastSpeakers: Record<string, PastSpeaker> = speakers;
