import { ParticipantWithProfile } from '../ParticipantWithProfile'
import { Profile } from '../Profile'
import { Event } from './Event'

export interface EventWithParticipants extends Omit<Event, 'created_by'> {
    created_by: Profile
    participant: ParticipantWithProfile[]
}
