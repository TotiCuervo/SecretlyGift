import fetchCheckIfProfileExists from '@/lib/supabase/api/profiles/fetch/fetchCheckIfProfileExists'
import SupabaseAdmin from '@/lib/supabase/handlers/SupabaseAdmin'
import { Profile } from '@/types/profile/Profile'
import { Event } from '@/types/events/Event'
import { type NextRequest, NextResponse } from 'next/server'

export interface EventJoinNewUserParam {
    name: string
    event: Event['uuid']
    email: Profile['email']
}

export async function POST(req: NextRequest) {
    const supabase = SupabaseAdmin()

    const { name, email, event } = (await req.json()) as EventJoinNewUserParam

    const { count, error: countError } = await fetchCheckIfProfileExists(supabase, email)

    if ((count && count > 0) || countError) {
        console.log('COUNT ERROR:', countError)
        return NextResponse.error()
    }

    const {
        data: { user },
        error
    } = await supabase.auth.admin.createUser({
        email,
        user_metadata: {
            full_name: name
        }
    })

    if (!user || error) {
        console.log('USER ERROR:', error)
        return NextResponse.error()
    }

    const { data: participant, error: participantError } = await supabase
        .from('participant')
        .insert({
            profile: user.id,
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
