import { Event } from '@/types/events/Event'
import { SupabaseClient } from '@supabase/supabase-js'
import { EventSelect } from '../select/EventSelect'

export default async function fetchEvent(supabase: SupabaseClient, uuid: Event['uuid']) {
    const { data, error } = await supabase.from('event').select(EventSelect).eq('uuid', uuid).single()

    return { data, error } as { data: Event | null; error: Error | null }
}
