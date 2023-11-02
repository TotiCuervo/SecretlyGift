import { Participant } from '@/types/Participant'

export const ParticipantKeys = {
    event: (event: Participant['event']) => ['participants', 'event', event]
}
