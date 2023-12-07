import ParticipantPill from '@/app/events/[uuid]/manage/exclusions/_components/exclusion-table/_components/participant-pill'
import { AdministrativeParticipantView } from '@/types/participant/AdministrativeParticipantView'
import React from 'react'

interface IProps {
    data: AdministrativeParticipantView[]
    onClick: (id: AdministrativeParticipantView['id']) => void
    excluded: boolean
    clickTitle: string
    backupcheck?: boolean
    backupText?: string
    showIf?: boolean
}

export default function PillList({ data, onClick, excluded, clickTitle, backupText, backupcheck, showIf }: IProps) {
    const spanClass = 'p-2 text-xs text-gray-700 text-center'

    if (backupcheck) {
        return <span className={spanClass}>{backupText}</span>
    }

    if (showIf !== undefined && !showIf) {
        return null
    }

    return (
        <div className="flex flex-col gap-2">
            {data.map((participant, index) => (
                <ParticipantPill
                    name={participant.name}
                    profile={participant.profile}
                    key={index}
                    onClick={() => onClick(participant.id)}
                    excluded={excluded}
                    clickTitle={clickTitle}
                />
            ))}
        </div>
    )
}
