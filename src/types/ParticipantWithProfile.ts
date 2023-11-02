import { Participant } from './Participant'
import { Profile } from './Profile'

export interface ParticipantWithProfile extends Omit<Participant, 'profile'> {
    profile: Profile
}
