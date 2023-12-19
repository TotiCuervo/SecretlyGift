import { Participant } from '@/types/participant/Participant'

export const ParticipantKeys = {
    event: (event: Participant['event']) => ['participants', 'event', event],
    administrative: (event: Participant['event']) => ['participants', 'administrative', event]
}
