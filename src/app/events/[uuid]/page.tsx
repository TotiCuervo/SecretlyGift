import { Event } from '@/types/events/Event'
import React from 'react'
import { Metadata } from 'next'
import { fetchEventWithParticipants } from '@/lib/supabase/api/events/fetch/fetchEventWithParticipants'
import JoinEventForm from '../_component/join-event-form/join-event-form'
import { redirect } from 'next/navigation'
import SupabaseAdmin from '@/lib/supabase/handlers/SupabaseAdmin'
import EventCardTransition from '../_component/event-card-transition'
interface IProps {
    params: {
        uuid: string
    }
}

async function getData(eventUUID: Event['uuid']) {
    const supabase = SupabaseAdmin()

    const { data: event } = await fetchEventWithParticipants(supabase, eventUUID)

    if (!event) redirect('/')

    return { event }
}

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
    const { event } = await getData(params.uuid)

    return {
        title: `${event.name} | Event`
    }
}

export default async function Page({ params }: { params: { uuid: string } }) {
    const { event } = await getData(params.uuid)

    return (
        <div className="mx-auto flex max-w-7xl items-center justify-center px-16 pt-40">
            {/* Content Section */}
            <div className="w-full sm:w-1/2">
                <JoinEventForm event={event} />
            </div>

            {/* Card Section */}
            <div className="hidden w-1/2 justify-center sm:flex">
                <EventCardTransition event={event} />
            </div>
        </div>
    )
}
