import { AdministrativeParticipantView } from '@/types/participant/AdministrativeParticipantView'
import React from 'react'
import ExclusionCard from './_components/exclusion-card'

interface IProps {
    participants: AdministrativeParticipantView[]
}

export default function ExclusionCards({ participants }: IProps) {
    return (
        <div className="flex w-full flex-col gap-4 divide-y-2">
            {participants.map((participant) => (
                <ExclusionCard participant={participant} key={participant.id} />
            ))}
        </div>
    )
}
