import { useQuery } from '@tanstack/react-query'
import { ParticipantKeys } from '../keys'
import useSupabaseClient from '@/lib/supabase/useSupabaseClient'
import { Participant } from '@/types/Participant'

export default function useParticipantWithProfileByEventQuery(event: Participant['event']) {
    const supabase = useSupabaseClient()

    async function fetch(event: Participant['event']) {
        const { data = [], error } = await supabase.from('participant').select('*').eq('event', event).select()

        if (error) {
            throw error
        }

        return data as Participant[]
    }

    return useQuery<Participant[]>({
        queryKey: ParticipantKeys.event(event),
        queryFn: () => fetch(event),
        staleTime: 10000
    })
}
