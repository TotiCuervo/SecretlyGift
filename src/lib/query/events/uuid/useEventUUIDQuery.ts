import { useQuery } from '@tanstack/react-query'
import { EventKeys } from '../keys'
import { Event } from '@/types/events/Event'
import SupabaseClient from '@/lib/supabase/handlers/SupabaseClient'

interface Options {
    initialData?: Event
}

export default function useEventUUIDQuery(uuid: Event['uuid'], options: Options = {}) {
    const supabase = SupabaseClient()

    async function fetch(uuid: Event['uuid']) {
        const { data, error } = await supabase.from('event').select('*').eq('uuid', uuid).single()

        if (error) {
            throw error
        }

        return data
    }

    return useQuery<Event>({
        queryKey: EventKeys.uuid(uuid),
        queryFn: () => fetch(uuid),
        staleTime: 1000,
        ...options
    })
}
