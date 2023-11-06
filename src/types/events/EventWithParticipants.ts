import { Participant } from '../Participant'
import { Event } from './Event'

export interface EventWithParticipants extends Event {
    participant: Participant[]
}
