'use client'
import useEventUUIDQuery from '@/lib/query/events/uuid/useEventUUIDQuery'
import { Event } from '@/types/events/Event'
import { AdministrativeParticipantView } from '@/types/participant/AdministrativeParticipantView'
import React from 'react'
import { CheckIcon } from '@heroicons/react/24/solid'
import { twMerge } from 'tailwind-merge'
import useAdministrativeParticipantsQuery from '@/lib/query/participants/administrative/useAdministrativeParticipantsQuery'
import PrimaryButton from '@/components/buttons/primary-button'
import { GiftIcon } from '@heroicons/react/24/outline'
import useDoAllParticipantsHavePossibleMatch from '@/hooks/useDoAllParticipantsHavePossibleMatch'

interface IProps {
    initialEvent: Event
    initialParticipants: AdministrativeParticipantView[]
}

interface Step {
    title: string
    description: string
    completed: boolean
}

export default function EventSteps({ initialEvent, initialParticipants }: IProps) {
    const { data: event = initialEvent } = useEventUUIDQuery(initialEvent.uuid, {
        initialData: initialEvent
    })

    const { data: participants = initialParticipants } = useAdministrativeParticipantsQuery(event.uuid, {
        initialData: initialParticipants
    })

    const { doAllParticipantsHavePossibleMatch, participantsWithNoPossibleMatches } =
        useDoAllParticipantsHavePossibleMatch({ event: initialEvent.uuid })

    const hasEnoughParticipants = participants.length >= 3
    const canGenerate = hasEnoughParticipants && doAllParticipantsHavePossibleMatch

    const steps: Step[] = [
        {
            title: 'Add Participants',
            description: 'At least 3 people',
            completed: hasEnoughParticipants
        },
        {
            title: 'Add Exclusions',
            description: 'Prevent specific matches',
            completed: participants.some((participant) => participant.exclusions.length > 0)
        },
        {
            title: 'Generate Pairings',
            description: 'Participants must be added',
            completed: canGenerate
        }
    ]

    return (
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
                <div className="flex h-12 flex-grow">
                    <PrimaryButton size="full" disabled={!canGenerate}>
                        <GiftIcon className="mr-2 h-6 w-6" />
                        Generate Pairings
                    </PrimaryButton>
                </div>
            </div>
        </div>
    )
}
