import { Event } from '@/types/events/Event'
import { type NextRequest, NextResponse } from 'next/server'
import SupabaseServer from '@/lib/supabase/handlers/SupabaseServer'
import getSession from '@/lib/supabase/api/auth/getSession'
import SupabaseAdmin from '@/lib/supabase/handlers/SupabaseAdmin'
import inviteEventEmail from '@/edge-functions/emails/invite-event-email'
import getDateString from '@/utils/getDateString'

export interface EventInviteParam {
    name: string
    email: string
    event: Event['uuid']
}

export async function POST(req: NextRequest) {
    const supabase = SupabaseServer()
    const supabaseAdmin = SupabaseAdmin()

    const {
        data: { session },
        error
    } = await getSession(supabase)

    if (!session || error) {
        console.error(error)
        return NextResponse.error()
    }

    const { name, email, event } = (await req.json()) as EventInviteParam

    const { data: eventData, error: eventError } = await supabase.from('event').select('*').eq('uuid', event).single()

    if (eventError) {
        console.error(eventError)
        return NextResponse.error()
    }

    let profileId = ''

    const { data: existingProfile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', email)

    if (profileError) {
        console.error(profileError)
        return NextResponse.error()
    }

    if (existingProfile.length === 0) {
        const {
            data: { user },
            error: userError
        } = await supabaseAdmin.auth.admin.createUser({
            email
        })

        if (user === null || userError) {
            console.error(userError)
            return NextResponse.error()
        }

        profileId = user.id
    } else {
        profileId = existingProfile[0].id
    }

    const { data: participant, error: participantError } = await supabase
        .from('participant')
        .insert({
            profile: profileId,
            event: event,
            name
        })
        .select()

    if (participantError) {
        console.error(participantError)
        return NextResponse.json({ error: 'This user is already invited to this event.' }, { status: 500 })
    }

    const { data: inviterParticipant, error: invitedParticipantError } = await supabase
        .from('participant')
        .select('*')
        .eq('profile', session.user.id)
        .eq('event', event)
        .eq('is_admin', true)
        .single()

    if (inviterParticipant === null || invitedParticipantError) {
        console.error(invitedParticipantError)
        return NextResponse.error()
    }

    inviteEventEmail(supabase, {
        to: email,
        name,
        invited_by: inviterParticipant.name ?? '',
        event_uuid: event,
        event_name: eventData.name,
        event_date: getDateString(eventData.date)
    })

    return NextResponse.json(participant[0])
}
