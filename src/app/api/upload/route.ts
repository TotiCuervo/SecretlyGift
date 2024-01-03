import { Event } from '@/types/events/Event'
import { type NextRequest, NextResponse } from 'next/server'
import SupabaseServer from '@/lib/supabase/handlers/SupabaseServer'
import getSession from '@/lib/supabase/api/auth/getSession'

export interface UploadParam {
    name: string
    event: Event['uuid']
}

export async function POST(req: NextRequest) {
    const supabase = SupabaseServer()

    const {
        data: { session },
        error
    } = await getSession(supabase)

    if (!session || error) {
        console.error(error)
        return NextResponse.error()
    }

    const { name, event } = (await req.json()) as EventJoinParam

    const { data: participant, error: participantError } = await supabase
        .from('participant')
        .insert({
            profile: session.user.id,
            event: event,
            name
        })
        .select()

    if (participantError) {
        console.error(participantError)
        return NextResponse.error()
    }

    return NextResponse.json(participant[0])
}
