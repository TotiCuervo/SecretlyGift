import { AdministrativeParticipantView } from '@/types/participant/AdministrativeParticipantView'
import React from 'react'
import ParticipantProfile from '../../../../_components/participant-profile'
import ParticipantPill from '../../exclusion-table/_components/participant-pill'

interface IProps {
    participant: AdministrativeParticipantView
}

export default function ExclusionCard({ participant }: IProps) {
    return (
        <div className="flex w-full flex-col gap-4 rounded-xl bg-white p-4 shadow">
            <div className="flex flex-col gap-2">
                <span className="text-xs font-bold">Participant</span>
                <ParticipantProfile profile={participant.profile} name={participant.name} />
            </div>
            <div className="flex flex-col gap-2">
                <span className="text-xs font-bold">Cannot be matched with</span>
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
                </div>
            </div>
        </div>
    )
}
