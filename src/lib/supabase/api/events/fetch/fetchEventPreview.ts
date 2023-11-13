import { EventWithParticipants } from '@/types/events/EventWithParticipants'
import { SupabaseClient } from '@supabase/supabase-js'
import { Event } from '@/types/events/Event'
import { EventWithParticipantsSelect } from '../select/event-with-participants-select'

export async function fetchEventPreview(supabase: SupabaseClient, EventUuid: Event['uuid']) {
    const { data, error } = (await supabase
        .from('event')
        .select(EventWithParticipantsSelect)
        .eq('uuid', EventUuid)
        .single()) as {
        data: EventWithParticipants
        error: any
    }
    return { data, error }
}
