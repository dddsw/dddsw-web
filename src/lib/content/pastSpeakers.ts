import speakers from './past/speakers.json';

export interface PastSpeaker {
	name: string;
	tagline?: string;
	bio?: string;
	/** Relative to src/lib/assets/images. */
	photo?: string;
	/**
	 * The most recent year they spoke, which the tagline, bio and photo are from. The importer uses
	 * it to tell a newer year (update the profile) from an older one (leave it).
	 */
	year: number;
}

/**
 * Speakers from past events, keyed by the ids that talks list in `speakerIds`, from
 * src/lib/content/past/speakers.json. Taken from Sessionize (2023 onwards); where someone spoke
 * more than once, the bio, tagline and photo are from their most recent year.
 */
export const pastSpeakers: Record<string, PastSpeaker> = speakers;
