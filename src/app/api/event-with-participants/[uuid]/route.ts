import { fetchEventWithParticipants } from '@/lib/supabase/api/events/fetch/fetchEventWithParticipants'
import SupabaseAdmin from '@/lib/supabase/handlers/SupabaseAdmin'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: { uuid: string } }) {
    const supabase = SupabaseAdmin()
    const { uuid } = params
    console.log({ uuid })

    const { data: event, error } = await fetchEventWithParticipants(supabase, uuid as string)

    if (error) {
        console.error(error)
        return NextResponse.error()
    }

    return NextResponse.json(event)
}
