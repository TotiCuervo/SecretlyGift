import SupabaseServer from '@/lib/supabase/handlers/SupabaseServer'
import { Event } from '@/types/events/Event'
import React from 'react'
import { Metadata } from 'next'
import getDateString from '@/utils/getDateString'
import { fetchEventPreview } from '@/lib/supabase/api/events/fetch/fetchEventPreview'
import ParticipantImagePreview from '@/components/misc/participant-image-preview'
import PrimaryButton from '@/components/buttons/primary-button'
import JoinEventForm from '../_component/join-event-form'
import getSession from '@/lib/supabase/api/auth/getSession'

interface IProps {
    params: {
        uuid: string
    }
}

async function getData(eventUUID: Event['uuid']) {
    const supabase = SupabaseServer()

    const { data: session } = await getSession(supabase)

    const { data: event } = await fetchEventPreview(supabase, eventUUID)

    return { event }
}

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
    const { event } = await getData(params.uuid)

    return {
        title: `${event.name}`
    }
}

export default async function Page({ params }: { params: { uuid: string } }) {
    const { event } = await getData(params.uuid)
    return (
        <div className="flex items-center justify-between px-16 pt-40">
            {/* Content Section */}
            <div className="w-1/2">
                <JoinEventForm />
            </div>

            {/* Card Section */}
            <div className="flex w-1/2 justify-center">
                <div className="w-full max-w-xs overflow-hidden rounded-3xl bg-white px-6 py-4 shadow">
                    <div className="">
                        <div className="mb-2 text-3xl font-bold">{event.name}</div>
                        <p className="text-base text-gray-700">{event.created_by.full_name}</p>
                    </div>
                    <div className="pt-4">
                        <ParticipantImagePreview participants={event.participant} />
                        <p className="text-sm text-gray-700">{event.participant.length} Participants</p>
                    </div>
                    <div className="pt-4">
                        <p className="text-sm text-gray-700">
                            <span className="font-baloo text-3xl">$20</span> Gift Limit
                        </p>
                    </div>
                    <div className="pt-4">
                        <p className="text-lg text-gray-700">{getDateString(event.date)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
