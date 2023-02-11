import type { SessionSpeaker } from "./SessionSpeaker.type"

export type Session = {
    title: string
    description: string
    speakers: SessionSpeaker[]
}