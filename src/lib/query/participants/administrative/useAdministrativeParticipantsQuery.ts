import { useQuery } from '@tanstack/react-query'
import { ParticipantKeys } from '../keys'
import SupabaseClient from '@/lib/supabase/handlers/SupabaseClient'
import { AdministrativeParticipantView } from '@/types/participant/AdministrativeParticipantView'
import { AdministrativeParticipantViewSelect } from '@/lib/supabase/api/participants/select/AdministrativeParticipantViewSelect'

interface Options {
    initialData?: AdministrativeParticipantView[]
}

export default function useAdministrativeParticipantsQuery(
    event: AdministrativeParticipantView['event'],
    options: Options = {}
) {
    const supabase = SupabaseClient()

    async function fetch(event: AdministrativeParticipantView['event']) {
        const { data = [], error } = await supabase
            .from('participant')
            .select(AdministrativeParticipantViewSelect)
            .eq('event', event)
        if (error) {
            console.log({ error })

            throw error
        }

        // @ts-ignore
        return data as ParticipantWithProfileAndExclusions[]
    }

    return useQuery<AdministrativeParticipantView[]>({
        queryKey: ParticipantKeys.administrative(event),
        queryFn: () => fetch(event),
        staleTime: 10000,
        ...options
    })
}
