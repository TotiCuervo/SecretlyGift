import { Profile as ProfileSelect } from '@/lib/select/Profile'
import SupabaseAdmin from '@/lib/supabase/SupabaseAdmin'
import { Event } from '@/types/events/Event'
import { EventInsert } from '@/types/events/EventInsert'
import { Profile } from '@/types/Profile'
import { type NextRequest, NextResponse } from 'next/server'

interface RequestParams {
    event: EventInsert
    user: { email: string; name: string }
}

export async function POST(req: NextRequest) {
    const supabase = SupabaseAdmin()

    const { event, user } = (await req.json()) as RequestParams

    const { data: profile, error: profileError } = (await supabase
        .from('profiles')
        .select(ProfileSelect)
        .eq('email', user.email)
        .single()) as { data: Profile; error: any }

    if (profileError) {
        console.error(profileError)
        return NextResponse.error()
    }

    const { data: newEvent, error: eventError } = (await supabase
        .from('event')
        .insert({
            name: event.name,
            date: event.date,
            created_by: profile.id
        })
        .select()) as { data: Event[]; error: any }

    if (eventError) {
        console.error(eventError)
        return NextResponse.error()
    }

    const { error: participantError } = await supabase
        .from('participant')
        .insert({
            profile: profile.id,
            event: newEvent[0].uuid,
            name: user.name,
            is_admin: true
        })
        .select()

    if (participantError) {
        console.error(participantError)
        return NextResponse.error()
    }

    return NextResponse.json(newEvent[0])
}
