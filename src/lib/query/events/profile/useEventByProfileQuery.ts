import { UseBaseQueryOptions, useQuery } from '@tanstack/react-query'
import { EventKeys } from '../keys'
import { Profile } from '@/types/Profile'
import useSupabaseClient from '@/lib/supabase/useSupabaseClient'
import { Event } from '@/types/events/Event'
import { EventSelect } from '@/lib/select/EventSelect'

type Options = Omit<UseBaseQueryOptions<Event[]>, 'queryKey'>
export default function useEventByProfileQuery(profileId: Profile['id'], options?: Options) {
    const supabase = useSupabaseClient()

    async function fetch(profileId: Profile['id']) {
        console.log({ profileId })
        const { data: events, error: eventError } = await supabase
            .from('event')
            .select('*, participant!inner(*)')
            .eq('participant.profile', profileId)

        if (eventError) {
            throw eventError
        }

        return events
    }

    return useQuery<Event[]>({
        queryKey: EventKeys.profile(profileId),
        queryFn: () => fetch(profileId),
        staleTime: 10000,
        ...options
    })
}
