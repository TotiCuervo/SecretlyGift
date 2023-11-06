import { useQuery } from '@tanstack/react-query'
import { EventKeys } from '../keys'
import { Event } from '@/types/events/Event'
import useSupabaseClient from '@/lib/supabase/useSupabaseClient'

export default function useEventUUIDQuery(uuid: Event['uuid']) {
    const supabase = useSupabaseClient()

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
        staleTime: 10000
    })
}
