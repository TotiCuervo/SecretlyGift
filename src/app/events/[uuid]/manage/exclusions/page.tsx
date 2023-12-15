'use client'
import React from 'react'
import useAdministrativeParticipantsQuery from '@/lib/query/participants/administrative/useAdministrativeParticipantsQuery'
import ExclusionCards from './_components/exclusion-cards/exclusion-cards'
interface IProps {
    params: {
        uuid: string
    }
}

export default function Page({ params }: IProps) {
    const { uuid } = params
    const { data: participants = [] } = useAdministrativeParticipantsQuery(uuid)

    const participantsWithExclusions = participants.filter((participant) => participant.exclusions.length > 0)
    const canAddExclusions = participants.length > 2

    return (
        <section>
            <div className="">
                <div className="flex flex-col">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <h2 className="font-semibold">Exclusions</h2>
                            <p className="text-sm text-gray-500">
                                These participants are excluded from being matched with each other.
                            </p>
                        </div>
                    </div>

                    {!canAddExclusions && (
                        <div className="pt-10 text-center">
                            <span>You need at least 3 participants to add exclusions.</span>
                        </div>
                    )}
                    {canAddExclusions && participantsWithExclusions.length > 0 && (
                        <>
                            <div className="flex pt-4">
                                <ExclusionCards participants={participants} />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}
