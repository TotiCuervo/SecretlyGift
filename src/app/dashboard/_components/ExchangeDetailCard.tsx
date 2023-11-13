'use client'
import Badge from '@/components/badge/badge'
import PrimaryButton from '@/components/buttons/primary-button'
import useRouter from '@/lib/router/useRouter'
import { EventWithParticipants } from '@/types/events/EventWithParticipants'
import getDateString from '@/utils/getDateString'
import React from 'react'

interface IProps {
    event: EventWithParticipants
}

export default function ExchangeDetailCard({ event }: IProps) {
    const { goToEventManage } = useRouter()

    const additionalMembersCount = event.participant.length - 3

    function getActiveText() {
        const eventDate = new Date(event.date)
        const currentDate = new Date()
        if (eventDate < currentDate) {
            return 'Expired'
        } else {
            return 'Active'
        }
    }

    return (
        <div className="flex flex-col items-center justify-center overflow-hidden rounded-lg bg-white p-4 shadow-lg">
            <div className="mb-2 flex w-full items-center justify-between">
                <Badge color={getActiveText() === 'Active' ? 'green' : 'red'}>{getActiveText()}</Badge>
                <p className="ml-auto text-sm text-gray-600">{getDateString(event.date)}</p>
            </div>
            <div className="px-4 py-2 text-center">
                <h2 className="mb-2 text-2xl font-bold">{event.name}</h2>
                <p className="text-base text-gray-600">
                    {event.participant.length} participant{event.participant.length >= 1 ? '' : 's'}
                </p>
                <div className="mt-4 flex items-center justify-center">
                    {event.participant.map((member, index) => (
                        <div
                            key={index}
                            className="z-10 -ml-2 flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-gray-200"
                        >
                            <p className="text-base text-gray-600"></p>
                        </div>
                    ))}
                    {additionalMembersCount > 0 && (
                        <div className="z-10 -ml-2 flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-gray-200">
                            <p className="text-base text-gray-600">+{additionalMembersCount}</p>
                        </div>
                    )}
                </div>
            </div>
            <div className="mt-4 h-10 w-full">
                <PrimaryButton size="full" onClick={() => goToEventManage(event.uuid)}>
                    View Details
                </PrimaryButton>
            </div>
        </div>
    )
}
