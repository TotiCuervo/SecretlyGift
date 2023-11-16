import { ParticipantWithProfile } from '@/types/participant/ParticipantWithProfile'
import React from 'react'

interface IProps {
    participants: ParticipantWithProfile[]
    size: number
}

export default function ParticipantImagePreview({ participants, size }: IProps) {
    const additionalMembersCount = participants.length - size
    return (
        <div className="flex">
            {participants.slice(0, size).map((member, index) => (
                <div
                    key={index}
                    className="z-10 -ml-2 flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-gray-200"
                >
                    <p className="text-base text-gray-600"></p>
                </div>
            ))}
            {additionalMembersCount > 0 && (
                <div className="z-10 -ml-2 flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-gray-200">
                    <p className="text-base text-gray-600">+{additionalMembersCount}</p>
                </div>
            )}
        </div>
    )
}
