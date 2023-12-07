import ParticipantPill from '@/app/events/[uuid]/manage/exclusions/_components/exclusion-table/_components/participant-pill'
import { AdministrativeParticipantView } from '@/types/participant/AdministrativeParticipantView'
import React from 'react'

interface IProps {
    data: AdministrativeParticipantView[]
    profileSelected: boolean
    onDelete: (id: AdministrativeParticipantView['id']) => void
}

export default function CannotBeMatchedWithSection({ data, profileSelected, onDelete }: IProps) {
    const spanClass = 'p-2 text-xs text-gray-700 text-center'
    if (!profileSelected) {
        return <span className={spanClass}>Select a participant to see their exclusions.</span>
    }

    if (data.length === 0) {
        return <span className={spanClass}>This participant does not have any exclusions yet.</span>
    }

    return (
        <div className="flex flex-col gap-2">
            {data.map((participant, index) => (
                <ParticipantPill
                    name={participant.name}
                    profile={participant.profile}
                    key={index}
                    onDelete={() => onDelete(participant.id)}
                />
            ))}
        </div>
    )
}
