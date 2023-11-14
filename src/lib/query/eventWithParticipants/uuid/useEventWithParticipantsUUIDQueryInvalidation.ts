import { Event } from '@/types/events/Event'
import { useQueryClient } from '@tanstack/react-query'
import { EventWithParticipantsKeys } from '../keys'

export default function useEventWithParticipantsUUIDQueryInvalidation() {
    const queryClient = useQueryClient()

    return async function invalidate(uuid: Event['uuid']) {
        console.log('invalidating!')
        return queryClient.invalidateQueries({ queryKey: EventWithParticipantsKeys.uuid(uuid) })
    }
}
