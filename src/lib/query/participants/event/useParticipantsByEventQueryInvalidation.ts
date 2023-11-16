import { Event } from '@/types/events/Event'
import { useQueryClient } from '@tanstack/react-query'
import { ParticipantKeys } from '../keys'

export default function useParticipantsByEventQueryInvalidation() {
    const queryClient = useQueryClient()

    return async function invalidate(uuid: Event['uuid']) {
        console.log('invalidating...')
        return queryClient.invalidateQueries({ queryKey: ParticipantKeys.event(uuid) })
    }
}
