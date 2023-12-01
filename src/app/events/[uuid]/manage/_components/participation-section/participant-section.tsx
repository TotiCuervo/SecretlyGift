'use client'
import useParticipantsWithProfileByEventQuery from '@/lib/query/participants/event/useParticipantsByEventQuery'
import { Event } from '@/types/events/Event'
import React from 'react'
import InviteLinkButton from '../invite-link-button'
import ParticipantTable from './_components/participant-table'
import ParticipantCards from './_components/participant-cards'
import AddParticipantButton from './_components/add-participant-button'

interface IProps {
    event: Event['uuid']
}

export default function ParticipantSection({ event }: IProps) {
    const { data: participants = [] } = useParticipantsWithProfileByEventQuery(event)
    return (
        <section>
            <div className="sm:rounded-lg sm:bg-white sm:px-6 sm:py-6 sm:shadow">
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold">Participants</h2>
                    <div className="hidden sm:flex">
                        <AddParticipantButton event={event} />
                    </div>
                </div>
                <div className="hidden sm:flex">
                    <ParticipantTable participants={participants} />
                </div>
                <div className="flex flex-col pt-2 sm:hidden">
                    <div className="mb-4 h-10">
                        <AddParticipantButton event={event} />
                    </div>
                    <ParticipantCards participants={participants} />
                </div>
                <hr />
                <div className="mt-4 flex flex-col rounded-lg bg-white p-6 pt-4 shadow  sm:bg-transparent sm:p-0 sm:shadow-none">
                    <h2 className="font-semibold">Join Link</h2>
                    <p className="text-sm text-gray-500">
                        Share this link with people you want to invite to your event.
                    </p>
                    <div className="flex pt-4">
                        <InviteLinkButton event={event} />
                    </div>
                </div>
            </div>
        </section>
    )
}
