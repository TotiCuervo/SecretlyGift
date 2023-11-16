import ParticipantImagePreview from '@/components/misc/participant-image-preview'
import { EventWithParticipants } from '@/types/events/EventWithParticipants'
import getDateString from '@/utils/getDateString'
import React from 'react'

interface IProps {
    event: EventWithParticipants
}
export default function EventCard({ event }: IProps) {
    return (
        <div className="w-full max-w-sm overflow-hidden rounded-3xl bg-white px-6 py-4 shadow">
            <div className="">
                <div className="mb-2 font-display text-3xl font-bold">{event.name}</div>
                <p className="text-base text-gray-700">Hosted by {event.created_by.full_name}</p>
            </div>
            <div className="pt-4">
                <p className="text-base italic text-gray-700">No description yet</p>
            </div>
            <div className="pt-4">
                <ParticipantImagePreview participants={event.participant} size={5} />
                <p className="text-sm text-gray-700">{event.participant.length} Participants</p>
            </div>
            <div className="pt-4">
                <p className="text-sm text-gray-700">
                    <span className="font-display text-2xl">No Gift Limit</span>
                </p>
            </div>
            <div className="pt-4">
                <p className="text-lg text-gray-700">{getDateString(event.date)}</p>
            </div>
        </div>
    )
}
