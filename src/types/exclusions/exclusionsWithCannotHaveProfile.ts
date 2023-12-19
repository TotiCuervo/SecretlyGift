import { Exclusions } from './exclusions'
import { ParticipantWithProfile } from '../participant/ParticipantWithProfile'

export interface ExclusionsWithCannotHaveProfile extends Omit<Exclusions, 'cannot_have_participant'> {
    cannot_have_participant: ParticipantWithProfile
}
