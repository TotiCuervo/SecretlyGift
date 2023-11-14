import { fetchEventWithParticipants } from '@/lib/supabase/api/events/fetch/fetchEventWithParticipants'
import SupabaseAdmin from '@/lib/supabase/handlers/SupabaseAdmin'
import SupabaseServer from '@/lib/supabase/handlers/SupabaseServer'
import { Event } from '@/types/events/Event'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    const supabase = SupabaseServer()

    const { name, date } = await req.json()

    const {
        data: { user }
    } = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.error()
    }

    const { data: event, error: eventError } = (await supabase
        .from('event')
        .insert({
            name,
            date
        })
        .select()) as { data: Event[]; error: any }

    if (eventError) {
        console.error(eventError)
        return NextResponse.error()
    }

    const { data: participant, error: participantError } = await supabase
        .from('participant')
        .insert({
            profile: user.id,
            event: event[0].uuid,
            name: user.user_metadata.full_name
        })
        .select()

    if (participantError) {
        console.error(participantError)
        return NextResponse.error()
    }

    return NextResponse.json(event[0])
}
