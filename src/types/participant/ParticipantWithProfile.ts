import { Participant } from './Participant'
import { Profile } from '../profile/Profile'

export interface ParticipantWithProfile extends Omit<Participant, 'profile'> {
    profile: Profile
}
