'use client'
import { Event } from '@/types/events/Event'
import React from 'react'
import InviteLinkButton from '../invite-link-button'
import ParticipantTable from './_components/participant-table'
import ParticipantCards from './_components/participant-cards'
import AddParticipantButton from './_components/add-participant-button'
import useAdministrativeParticipantsQuery from '@/lib/query/participants/administrative/useAdministrativeParticipantsQuery'

interface IProps {
    event: Event['uuid']
}

export default function ParticipantSection({ event }: IProps) {
    const { data: participants = [] } = useAdministrativeParticipantsQuery(event)

    return (
        <section>
            <div className="mt-4 flex items-center justify-between">
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
        </section>
    )
}
