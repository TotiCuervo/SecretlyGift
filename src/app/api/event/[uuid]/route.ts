import SupabaseServer from '@/lib/supabase/handlers/SupabaseServer'
import { Event } from '@/types/events/Event'
import { EventUpdate } from '@/types/events/EventUpdate'
import { type NextRequest, NextResponse } from 'next/server'

export async function PATCH(req: NextRequest, { params }: { params: { uuid: string } }) {
    const supabase = SupabaseServer()
    const { uuid } = params
    const data = (await req.json()) as EventUpdate

    const {
        data: { user }
    } = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.error()
    }

    const { data: event, error: eventError } = (await supabase
        .from('event')
        .update({
            ...data
        })
        .eq('uuid', uuid)
        .select()) as { data: Event[]; error: any }

    if (eventError) {
        console.error(eventError)
        return NextResponse.error()
    }

    return NextResponse.json(event[0])
}
