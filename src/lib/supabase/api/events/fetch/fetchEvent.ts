import { Event } from '@/types/events/Event'
import { SupabaseClient } from '@supabase/supabase-js'
import { EventSelect } from '../select/EventSelect'

export default function fetchEvent(supabase: SupabaseClient, uuid: Event['uuid']) {
    return supabase.from('event').select(EventSelect).eq('uuid', uuid).single()
}
