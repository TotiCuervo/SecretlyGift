import { dashboardRoute } from '@/lib/router/routes/authenticated/dashboard-route'
import SupabaseServer from '@/lib/supabase/handlers/SupabaseServer'
import getSessionOrRedirect from '@/lib/supabase/api/auth/getSessionOrRedirect'
import getEvent from '@/lib/supabase/api/events/fetch/fetchEvent'
import fetchParticipantsWithProfile from '@/lib/supabase/api/participants/fetch/fetchParticipantsWithProfile'
import { ParticipantWithProfile } from '@/types/ParticipantWithProfile'
import { Event } from '@/types/events/Event'
import { redirect } from 'next/navigation'
import React, { Suspense } from 'react'
import Head from 'next/head'
import { Metadata, ResolvingMetadata } from 'next'
import getDateString from '@/utils/getDateString'

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
        participants.some((participant) => participant.profiles.id === session.user.id && participant.is_admin) ||
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
        <>
            <div className="container mx-auto px-4">
                <div className="flex space-x-6">
                    {/* Left Column */}
                    <div className="w-5/12 space-y-6">
                        <div className="">
                            <h1 className="text-3xl font-bold">{event.name}</h1>
                            <p className="text-gray-500">{getDateString(event.date)}</p>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="w-7/12 space-y-6">
                        <section className="rounded-md bg-pink-100 p-6">
                            <h2 className="mb-4 font-bold">Trial expires soon!</h2>
                            <button className="rounded-md bg-blue-500 px-4 py-2 text-white">Upgrade</button>
                        </section>

                        <section className="rounded-md bg-green-100 p-6">
                            <h2 className="mb-4 font-bold">Invite people</h2>
                            {/* Add your invite section here */}
                        </section>

                        <section className="rounded-md bg-purple-100 p-6">
                            <h2 className="mb-4 font-bold">Quick Access</h2>
                            {/* Add your quick access links here */}
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}
