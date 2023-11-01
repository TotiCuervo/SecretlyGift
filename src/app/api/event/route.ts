import useSupabase from '@/lib/useSupabase'
import { Event } from '@/types/Event'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    const supabase = useSupabase('server')

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
            event: event[0].uuid
        })
        .select()

    if (participantError) {
        console.error(participantError)
        return NextResponse.error()
    }

    return Response.json({
        event,
        participant
    })
}
