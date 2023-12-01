import { Event } from '@/types/events/Event'
import { useQueryClient } from '@tanstack/react-query'
import { ParticipantKeys } from '../keys'

export default function useAdministrativeParticipantsInvalidation() {
    const queryClient = useQueryClient()

    return async function invalidate(uuid: Event['uuid']) {
        return queryClient.invalidateQueries({ queryKey: ParticipantKeys.administrative(uuid) })
    }
}
