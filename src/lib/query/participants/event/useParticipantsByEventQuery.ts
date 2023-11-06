import { useQuery } from '@tanstack/react-query'
import { ParticipantKeys } from '../keys'
import SupabaseClient from '@/lib/supabase/SupabaseClient'
import { ParticipantWithProfile } from '@/types/ParticipantWithProfile'

export default function useParticipantWithProfileByEventQuery(event: ParticipantWithProfile['event']) {
    const supabase = SupabaseClient()

    async function fetch(event: ParticipantWithProfile['event']) {
        const { data = [], error } = await supabase
            .from('participant')
            .select('*, profiles!inner(*)')
            .eq('event', event)

        if (error) {
            throw error
        }

        return data as ParticipantWithProfile[]
    }

    return useQuery<ParticipantWithProfile[]>({
        queryKey: ParticipantKeys.event(event),
        queryFn: () => fetch(event),
        staleTime: 10000
    })
}
