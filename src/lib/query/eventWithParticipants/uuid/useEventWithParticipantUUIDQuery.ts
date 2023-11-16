import { useQuery } from '@tanstack/react-query'
import { EventWithParticipantsKeys } from '../keys'
import { Event } from '@/types/events/Event'
import SupabaseClient from '@/lib/supabase/handlers/SupabaseClient'
import { fetchEventWithParticipants } from '@/lib/supabase/api/events/fetch/fetchEventWithParticipants'
import { EventWithParticipants } from '@/types/events/EventWithParticipants'
import publicGetEventWithParticipants from '@/endpoints/event-with-participants/public-get-event-with-participants'

interface Options {
    initialData?: EventWithParticipants
    type?: 'public' | 'private'
}
export default function useEventWithParticipantUUIDQuery(uuid: Event['uuid'], options?: Options) {
    const supabase = SupabaseClient()

    async function fetch(uuid: Event['uuid']) {
        const { data, error } = await fetchEventWithParticipants(supabase, uuid)

        if (error) {
            throw error
        }

        return data
    }

    async function publicFetch(uuid: Event['uuid']) {
        try {
            const { data } = await publicGetEventWithParticipants(uuid)
            return data
        } catch (error) {
            throw error
        }
    }

    return useQuery<EventWithParticipants>({
        queryKey: EventWithParticipantsKeys.uuid(uuid),
        queryFn: () => (options?.type === 'public' ? publicFetch(uuid) : fetch(uuid)),
        staleTime: 10000,
        initialData: options?.initialData
    })
}
