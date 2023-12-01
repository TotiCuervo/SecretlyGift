'use client'
import React from 'react'
import ExclusionTable from './_components/exclusion-table'
import useAdministrativeParticipantsQuery from '@/lib/query/participants/administrative/useAdministrativeParticipantsQuery'
interface IProps {
    params: {
        uuid: string
    }
}

export default function Page({ params }: IProps) {
    const { uuid } = params
    const { data: participants = [] } = useAdministrativeParticipantsQuery(uuid)
    console.log({ participants })
    const participantsWithExlcusions = participants.filter((participant) => participant.exclusions.length > 0)
    const participantsThatAreExcluded = participants.filter((participant) => participant.exclusions.length > 0)
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
                        <div className="hidden sm:flex">{/* <AddParticipantButton event={event} /> */}</div>
                    </div>
                    <ExclusionTable participants={participantsWithExlcusions} />
                </div>
            </div>
        </section>
    )
}
