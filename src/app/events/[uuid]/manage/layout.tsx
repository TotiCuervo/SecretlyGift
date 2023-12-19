import { dashboardRoute } from '@/lib/router/routes/authenticated/dashboard-route'
import SupabaseServer from '@/lib/supabase/handlers/SupabaseServer'
import getSessionOrRedirect from '@/lib/supabase/api/auth/getSessionOrRedirect'
import getEvent from '@/lib/supabase/api/events/fetch/fetchEvent'
import { Event } from '@/types/events/Event'
import { redirect } from 'next/navigation'
import { Metadata, ResolvingMetadata } from 'next'
import EventHeader from './_components/event-header'
import LayoutNav from './_components/layout-nav'
import { AdministrativeParticipantView } from '@/types/participant/AdministrativeParticipantView'
import fetchAdministrativeParticipants from '@/lib/supabase/api/participants/fetch/fetchAdministrativeParticipants'

interface IProps {
    children: React.ReactNode
    params: {
        uuid: string
    }
}

async function getData(eventUUID: Event['uuid']) {
    const supabase = SupabaseServer()
    const session = await getSessionOrRedirect()
    const { data: event } = (await getEvent(supabase, eventUUID)) as { data: Event; error: any }

    if (!event) redirect(dashboardRoute())

    const { data: participants } = (await fetchAdministrativeParticipants(supabase, eventUUID)) as {
        data: AdministrativeParticipantView[]
        error: any
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
        title: `${event.name} | Manage`,
    }
}

export default async function Layout({ children, params }: IProps) {
    const { event, participants } = await getData(params.uuid)

    return (
        <div className="flex items-center justify-center">
            <div className="mx-auto w-full max-w-3xl px-4">
                <div className="flex flex-col gap-4 pb-20">
                    <EventHeader
                        initialEvent={event}
                        initialParticipants={participants}
                    />
                    <LayoutNav uuid={params.uuid} />
                    <div className="pt-4">{children}</div>
                </div>
            </div>
        </div>
    )
}
