'use client'
import PrimaryOutlineButton from '@/components/buttons/primary-outline-button'
import useEventUUIDQuery from '@/lib/query/events/uuid/useEventUUIDQuery'
import useParticipantsWithProfileByEventQuery from '@/lib/query/participants/event/useParticipantsByEventQuery'
import { eventManageSettingsRoute } from '@/lib/router/routes/events/event-manage-settings-route'
import { Event } from '@/types/events/Event'
import { ParticipantWithProfile } from '@/types/participant/ParticipantWithProfile'
import getDateString from '@/utils/getDateString'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import React from 'react'

interface IProps {
    initialEvent: Event
    initialParticipants: ParticipantWithProfile[]
}

export default function EventHeader({ initialEvent, initialParticipants }: IProps) {
    const { data: event = initialEvent } = useEventUUIDQuery(initialEvent.uuid, {
        initialData: initialEvent
    })

    const {} = useParticipantsWithProfileByEventQuery(event.uuid, {
        initialData: initialParticipants
    })

    return (
        <div className="">
            <div className="flex w-full items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                    <h1 className="truncate text-xl font-bold text-gray-900 sm:text-3xl">{event.name}</h1>
                </div>
                <div className="hidden sm:block">
                    <Link href={eventManageSettingsRoute(event.uuid)}>
                        <PrimaryOutlineButton size="sm">
                            <PencilSquareIcon className="h-4 w-4" />
                            Edit Event
                        </PrimaryOutlineButton>
                    </Link>
                </div>
            </div>
            <p className="text-gray-700">{getDateString(event.date)}</p>
            {event.date}
            <p className="text-sm text-gray-700">No Gift Limit</p>
            <p className="text-sm italic text-gray-700">No Description</p>
            <div className="pt-2 sm:hidden">
                <Link href={eventManageSettingsRoute(event.uuid)}>
                    <PrimaryOutlineButton size="sm">
                        <PencilSquareIcon className="h-4 w-4" />
                        Edit Event
                    </PrimaryOutlineButton>
                </Link>
            </div>
        </div>
    )
}
