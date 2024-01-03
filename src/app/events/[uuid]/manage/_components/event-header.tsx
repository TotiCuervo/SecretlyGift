'use client'
import PrimaryOutlineButton from '@/components/buttons/primary-outline-button'
import useEventUUIDQuery from '@/lib/query/events/uuid/useEventUUIDQuery'
import { eventManageSettingsRoute } from '@/lib/router/routes/events/event-manage-settings-route'
import { Event } from '@/types/events/Event'
import { AdministrativeParticipantView } from '@/types/participant/AdministrativeParticipantView'
import getDateString from '@/utils/getDateString'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import React from 'react'
import { CheckIcon } from '@heroicons/react/24/solid'
import { twMerge } from 'tailwind-merge'
import useAdministrativeParticipantsQuery from '@/lib/query/participants/administrative/useAdministrativeParticipantsQuery'

interface IProps {
    initialEvent: Event
    initialParticipants: AdministrativeParticipantView[]
}

interface Step {
    title: string
    description: string
    completed: boolean
}

export default function EventHeader({ initialEvent, initialParticipants }: IProps) {
    const { data: event = initialEvent } = useEventUUIDQuery(initialEvent.uuid, {
        initialData: initialEvent
    })

    const { data: participants = initialParticipants } = useAdministrativeParticipantsQuery(event.uuid, {
        initialData: initialParticipants
    })

    const steps: Step[] = [
        {
            title: 'Add Participants',
            description: 'At least 3 people',
            completed: participants.length >= 3
        },
        {
            title: 'Add Exclusions',
            description: 'Prevent specific matches',
            completed: participants.some((participant) => participant.exclusions.length > 0)
        },
        {
            title: 'Generate Pairings',
            description: 'Participants must be added',
            completed: false
        }
    ]

    return (
        <div className="flex flex-col gap-4">
            <div className="pattern-background-1 h-48 bg-red-400 heropattern-jigsaw-red-100"></div>
            <div className="text-sm font-semibold">
                {getDateString(event.date)} |{' '}
                {event.gift_amount ? `$${event.gift_amount} Gift Limit` : 'No Gift Amount'}
            </div>
            <div className="flex w-full items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                    <h1 className="truncate text-xl font-semibold text-gray-900">{event.name}</h1>
                </div>
                <div className="hidden sm:block">
                    <Link href={eventManageSettingsRoute(event.uuid)}>
                        <PrimaryOutlineButton size="xs">
                            <PencilSquareIcon className="h-4 w-4" />
                            Edit Event
                        </PrimaryOutlineButton>
                    </Link>
                </div>
            </div>
            <p className="break-words text-sm leading-6 text-gray-500">
                {event.description ? event.description : 'No description'}
            </p>
            <div className="h-10 sm:hidden">
                <Link href={eventManageSettingsRoute(event.uuid)}>
                    <PrimaryOutlineButton size="full">
                        <PencilSquareIcon className="h-4 w-4" />
                        Edit Event
                    </PrimaryOutlineButton>
                </Link>
            </div>
            <div className="flex flex-col">
                <span className="text-md pb-4 font-semibold">Action Steps</span>
                <div className="flex flex-col gap-8 sm:flex-row">
                    {steps.map((step, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <div>
                                <div
                                    className={twMerge(
                                        'rounded-full p-2',
                                        !step.completed && 'bg-gray-100',
                                        step.completed && 'bg-green-200'
                                    )}
                                >
                                    <CheckIcon
                                        className={twMerge(
                                            'h-6 w-6',
                                            !step.completed && 'text-gray-400',
                                            step.completed && 'text-green-800'
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-base font-semibold">{step.title}</span>
                                <span className="text-xs text-gray-500">{step.description}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* <div className="flex flex-col">
                <div className="flex">
                    <InviteLinkButton event={event.uuid} />
                </div>
                <p className="text-sm text-gray-500">Share this link with people you want to invite to your event.</p>
            </div> */}
        </div>
    )
}
