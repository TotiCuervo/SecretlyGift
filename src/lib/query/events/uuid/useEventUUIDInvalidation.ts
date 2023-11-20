import { Event } from '@/types/events/Event'
import { useQueryClient } from '@tanstack/react-query'
import { EventKeys } from '../keys'

export default function useEventUUIDInvalidation() {
    const queryClient = useQueryClient()

    return async function invalidate(uuid: Event['uuid']) {
        return queryClient.invalidateQueries({ queryKey: EventKeys.uuid(uuid) })
    }
}
