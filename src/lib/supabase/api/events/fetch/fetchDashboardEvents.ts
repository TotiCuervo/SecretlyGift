import { Profile } from '@/types/profile/Profile'
import { EventWithParticipants } from '@/types/events/EventWithParticipants'
import { SupabaseClient } from '@supabase/supabase-js'
import { Participant } from '@/types/participant/Participant'

export async function fetchDashboardEvents(supabase: SupabaseClient, profileId: Profile['id']) {
    const { data: events } = (await supabase.from('participant').select('event').eq('profile', profileId)) as {
        data: { event: Participant['event'] }[]
        error: any
    }

    const { data, error } = (await supabase
        .from('event')
        .select('*, participant(*)')
        .in(
            'uuid',
            events.map((e) => e.event)
        )) as {
        data: EventWithParticipants[]
        error: any
    }
    return { data, error }
}
