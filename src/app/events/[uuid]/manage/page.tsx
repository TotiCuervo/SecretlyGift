import { dashboardRoute } from '@/lib/router/routes/authenticated/dashboard-route'
import SupabaseServer from '@/lib/supabase/handlers/SupabaseServer'
import getSessionOrRedirect from '@/lib/supabase/api/auth/getSessionOrRedirect'
import getEvent from '@/lib/supabase/api/events/fetch/fetchEvent'
import fetchParticipantsWithProfile from '@/lib/supabase/api/participants/fetch/fetchParticipantsWithProfile'
import { ParticipantWithProfile } from '@/types/participant/ParticipantWithProfile'
import { Event } from '@/types/events/Event'
import { redirect } from 'next/navigation'
import { Metadata, ResolvingMetadata } from 'next'
import getDateString from '@/utils/getDateString'
import ParticipantSection from './_components/participant-section'
import { Suspense } from 'react'

interface IProps {
    params: {
        uuid: string
    }
}

async function getData(eventUUID: Event['uuid']) {
    const supabase = SupabaseServer()
    const session = await getSessionOrRedirect()
    const { data: event } = (await getEvent(supabase, eventUUID)) as { data: Event; error: any }

    if (!event) redirect(dashboardRoute())

    const { data: participants } = (await fetchParticipantsWithProfile(supabase, eventUUID)) as {
        data: ParticipantWithProfile[]
    }

    const isUserParticipant =
        participants.some((participant) => participant.profile.id === session.user.id && participant.is_admin) ||
        event.created_by === session.user.id

    if (!isUserParticipant) redirect(dashboardRoute())

    return { event, participants }
}

export async function generateMetadata({ params }: IProps, parent: ResolvingMetadata): Promise<Metadata> {
    const { event } = await getData(params.uuid)

    return {
        title: `${event.name} | Manage`
    }
}

export default async function Page({ params }: { params: { uuid: string } }) {
    const { event, participants } = await getData(params.uuid)
    return (
        <div className="flex items-center justify-center">
            <div className="mx-auto max-w-3xl px-4">
                <div className="flex flex-col gap-4">
                    <div className="">
                        <h1 className="text-3xl font-bold">{event.name}</h1>
                        <p className="text-gray-500">{getDateString(event.date)}</p>
                        <p className="text-gray-500">No Gift Limit</p>
                        <p className="italic text-gray-500">No Description</p>
                    </div>

                    <ParticipantSection initialData={participants} event={event} />
                </div>
            </div>
        </div>
    )
}
