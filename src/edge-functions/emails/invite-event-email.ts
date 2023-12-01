import { SupabaseClient } from '@supabase/supabase-js'

interface Body {
    to: string
    name: string
    invited_by: string
    event_uuid: string
    event_name: string
    event_date: string
}
export default async function inviteEventEmail(supabase: SupabaseClient, body: Body) {
    const { data, error } = await supabase.functions.invoke('invite-event-email', {
        body
    })

    return { data, error }
}
