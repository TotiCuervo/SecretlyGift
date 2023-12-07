'use client'
import React from 'react'
import ExclusionTable from './_components/exclusion-table/exclusion-table'
import useAdministrativeParticipantsQuery from '@/lib/query/participants/administrative/useAdministrativeParticipantsQuery'
import AddExclusionButton from './_components/add-exclusion-button'
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
            <div className="sm:rounded-lg sm:bg-white sm:px-6 sm:py-6 sm:shadow">
                <div className="flex flex-col">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <h2 className="font-semibold">Exclusions</h2>
                            <p className="text-sm text-gray-500">
                                These participants are excluded from being matched with each other.
                            </p>
                        </div>
                        <div className="hidden sm:flex">
                            <AddExclusionButton event={uuid} disabled={!canAddExclusions} />
                        </div>
                    </div>
                    {!canAddExclusions && (
                        <div className="pt-10 text-center">
                            <span>You need at least 3 participants to add exclusions.</span>
                        </div>
                    )}
                    {canAddExclusions && <ExclusionTable participants={participantsWithExclusions} />}
                </div>
            </div>
        </section>
    )
}
