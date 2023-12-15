import { AdministrativeParticipantView } from '@/types/participant/AdministrativeParticipantView'
import React from 'react'
import ParticipantProfile from '../../../../_components/participant-profile'
import ParticipantPill from '../../participant-pill'
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'
import AddExclusionButton from '../../add-exclusion-wrapper'
import PrimaryButton from '@/components/buttons/primary-button'
import PrimaryOutlineButton from '@/components/buttons/primary-outline-button'

interface IProps {
    participant: AdministrativeParticipantView
}

export default function ExclusionCard({ participant }: IProps) {
    return (
        <div className="flex w-full flex-col gap-4 rounded-xl bg-white p-4 shadow">
            <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-gray-600">Participant</span>
                <ParticipantProfile profile={participant.profile} name={participant.name} />
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-600">Cannot be matched with</span>
                    <AddExclusionButton event={participant.event} participant={participant}>
                        <PrimaryOutlineButton size="xs">
                            <AdjustmentsHorizontalIcon className="h-4 w-4" />
                            Manage
                        </PrimaryOutlineButton>
                    </AddExclusionButton>
                </div>
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
                    {participant.exclusions.length === 0 && (
                        <div className="mt-8 flex w-full flex-col items-center">
                            <span className="text-sm font-semibold">No exclusions yet</span>
                            <AddExclusionButton className="mt-8 w-full" event={participant.event} participant={participant}>
                                <div className="h-10 w-full">
                                    <PrimaryButton size="full-sm">Add Exclusion</PrimaryButton>
                                </div>
                            </AddExclusionButton>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
