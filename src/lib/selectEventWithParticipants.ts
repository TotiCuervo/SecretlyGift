import { Profile } from '@/types/Profile'
import { EventWithParticipants } from '@/types/events/EventWithParticipants'
import { SupabaseClient } from '@supabase/supabase-js'

export async function selectEventsWithParticipants(supabase: SupabaseClient, profileId: Profile['id']) {
    const { data, error } = (await supabase
        .from('event')
        .select('*, participant(*)')
        .eq('participant.profile', profileId)) as { data: EventWithParticipants[]; error: any }
    return { data, error }
}
