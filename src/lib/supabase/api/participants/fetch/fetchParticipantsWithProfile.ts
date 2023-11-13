import { Event } from '@/types/events/Event'
import { SupabaseClient } from '@supabase/supabase-js'
import { ParticipantWithProfileSelect } from '../select/ParticipantWithProfileSelect'

export default function fetchParticipantsWithProfile(supabase: SupabaseClient, eventUuid: Event['uuid']) {
    return supabase.from('participant').select(ParticipantWithProfileSelect).eq('event', eventUuid)
}
