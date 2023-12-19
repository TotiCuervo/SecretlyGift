import { Event } from '@/types/events/Event'
import { SupabaseClient } from '@supabase/supabase-js'
import { AdministrativeParticipantViewSelect } from '../select/AdministrativeParticipantViewSelect'

export default function fetchAdministrativeParticipants(supabase: SupabaseClient, eventUuid: Event['uuid']) {
    return supabase.from('participant').select(AdministrativeParticipantViewSelect).eq('event', eventUuid)
}
