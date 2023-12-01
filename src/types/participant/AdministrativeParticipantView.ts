import { Participant } from './Participant'
import { Profile } from '../profile/Profile'
import { ExclusionsWithCannotHaveProfile } from '../exclusions/exclusionsWithCannotHaveProfile'

export interface AdministrativeParticipantView extends Omit<Participant, 'profile'> {
    profile: Profile
    exclusions: ExclusionsWithCannotHaveProfile[]
}
