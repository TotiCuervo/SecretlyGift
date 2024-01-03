'use client'
import { Event } from '@/types/events/Event'
import React from 'react'
import AddParticipantButton from './_components/add-participant-button'
import useAdministrativeParticipantsQuery from '@/lib/query/participants/administrative/useAdministrativeParticipantsQuery'
import ParticipantRows from './_components/participant-rows'

interface IProps {
    event: Event['uuid']
}

export default function ParticipantSection({ event }: IProps) {
    const { data: participants = [] } = useAdministrativeParticipantsQuery(event)

    return (
        <section>
            <div className="flex items-center justify-end">
                <div className="hidden sm:flex">
                    <AddParticipantButton event={event} />
                </div>
            </div>
            <div className="flex flex-col pt-2 sm:hidden">
                <div className="h-10">
                    <AddParticipantButton event={event} />
                </div>
            </div>
            <div className="">
                <ParticipantRows participants={participants} />
            </div>
        </section>
    )
}
