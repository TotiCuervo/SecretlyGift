'use client'
import ParticipantImagePreview from '@/components/misc/participant-image-preview'
import useEventWithParticipantUUIDQuery from '@/lib/query/eventWithParticipants/uuid/useEventWithParticipantUUIDQuery'
import { EventWithParticipants } from '@/types/events/EventWithParticipants'
import getDateString from '@/utils/getDateString'
import React from 'react'

interface IProps {
    event: EventWithParticipants
}
export default function EventCard({ event }: IProps) {
    const { data: eventData } = useEventWithParticipantUUIDQuery(event.uuid, {
        initialData: event,
        type: 'public'
    })

    if (!eventData) {
        return null
    }

    return (
        <div className="w-full max-w-xs overflow-hidden rounded-3xl bg-white px-6 py-4 shadow">
            <div className="">
                <div className="mb-2 text-3xl font-bold">{eventData.name}</div>
                <p className="text-base text-gray-700">{eventData.created_by.full_name}</p>
            </div>
            <div className="pt-4">
                <ParticipantImagePreview participants={eventData.participant} />
                <p className="text-sm text-gray-700">{eventData.participant.length} Participants</p>
            </div>
            <div className="pt-4">
                <p className="text-sm text-gray-700">
                    <span className="font-baloo text-3xl">$20</span> Gift Limit
                </p>
            </div>
            <div className="pt-4">
                <p className="text-lg text-gray-700">{getDateString(eventData.date)}</p>
            </div>
        </div>
    )
}
