'use client'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import ParticipantProfile from '../../../_components/participant-profile'
import { AdministrativeParticipantView } from '@/types/participant/AdministrativeParticipantView'
import ParticipantPill from './_components/participant-pill'
import AddExclusionButton from '../add-exclusion-button'
import { Event } from '@/types/events/Event'

interface IProps {
    participants: AdministrativeParticipantView[]
    event: Event['uuid']
}

export default function ExclusionTable({ participants, event }: IProps) {
    const headers = ['Participant', 'Cannot be matched with']

    const tdClass = 'whitespace-normal py-4 text-sm font-medium'

    return (
        <table className="w-full border-separate border-spacing-x-0 border-spacing-y-4 divide-y divide-gray-200 pt-3 text-gray-900">
            <thead>
                <tr>
                    {headers.map((header) => (
                        <th
                            key={header}
                            scope="col"
                            className={twMerge(`text-left text-xs font-medium uppercase tracking-wider text-gray-500`)}
                        >
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {participants.map((participant, key) => (
                    <tr key={participant.id} className="">
                        <td className={twMerge(tdClass, 'flex flex-col rounded-bl-lg rounded-tl-lg')}>
                            <ParticipantProfile profile={participant.profile} name={participant.name} />
                        </td>

                        <td className={twMerge(tdClass)}>
                            <div className="flex flex-col gap-2">
                                {participant.exclusions.map((exclusion) => (
                                    <div className="flex w-full">
                                        <ParticipantPill
                                            profile={exclusion.cannot_have_participant.profile}
                                            name={exclusion.cannot_have_participant.name}
                                            key={exclusion.cannot_have_participant.id}
                                        />
                                    </div>
                                ))}
                                <AddExclusionButton event={event} disabled={false} />
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
