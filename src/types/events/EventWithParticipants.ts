import { ParticipantWithProfile } from '../participant/ParticipantWithProfile'
import { Profile } from '../profile/Profile'
import { Event } from './Event'

export interface EventWithParticipants extends Omit<Event, 'created_by'> {
    created_by: Profile
    participant: ParticipantWithProfile[]
}
