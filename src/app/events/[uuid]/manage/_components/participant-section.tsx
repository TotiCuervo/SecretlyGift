'use client'
import UserAvatar from '@/components/avatar/user-avatar'
import useParticipantsWithProfileByEventQuery from '@/lib/query/participants/event/useParticipantsByEventQuery'
import { Event } from '@/types/events/Event'
import { ParticipantWithProfile } from '@/types/participant/ParticipantWithProfile'
import React from 'react'

interface IProps {
    initialData: ParticipantWithProfile[]
    event: Event
}

export default function ParticipantSection({ initialData, event }: IProps) {
    const { data: participants = [] } = useParticipantsWithProfileByEventQuery(event.uuid, {
        initialData
    })

    return (
        <section>
            <h2 className="text-2xl font-bold">Participants</h2>
            <div className="flex flex-col divide-y pt-5">
                {participants.map((participant) => (
                    <div key={participant.profile.id} className="flex gap-2 py-2">
                        <UserAvatar image={participant.profile.avatar_url} />
                        <div className="flex flex-col justify-center">
                            <h3 className="font-bold">{participant.name}</h3>
                            <p className="text-xs text-gray-500">{participant.profile.email}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
