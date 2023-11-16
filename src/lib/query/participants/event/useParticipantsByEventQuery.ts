import { useQuery } from '@tanstack/react-query'
import { ParticipantKeys } from '../keys'
import SupabaseClient from '@/lib/supabase/handlers/SupabaseClient'
import { ParticipantWithProfile } from '@/types/participant/ParticipantWithProfile'
import { ParticipantWithProfileSelect } from '@/lib/supabase/api/participants/select/ParticipantWithProfileSelect'

export default function useParticipantWithProfileByEventQuery(event: ParticipantWithProfile['event']) {
    const supabase = SupabaseClient()

    async function fetch(event: ParticipantWithProfile['event']) {
        const { data = [], error } = await supabase
            .from('participant')
            .select(ParticipantWithProfileSelect)
            .eq('event', event)

        if (error) {
            throw error
        }
        // @ts-ignore
        return data as ParticipantWithProfile[]
    }

    return useQuery<ParticipantWithProfile[]>({
        queryKey: ParticipantKeys.event(event),
        queryFn: () => fetch(event),
        staleTime: 10000
    })
}
