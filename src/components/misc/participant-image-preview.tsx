import { ParticipantWithProfile } from '@/types/ParticipantWithProfile'
import React from 'react'

interface IProps {
    participants: ParticipantWithProfile[]
}

export default function ParticipantImagePreview({ participants }: IProps) {
    return (
        <>
            {participants.map((member, index) => (
                <div
                    key={index}
                    className="z-10 -ml-2 flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-gray-200"
                >
                    <p className="text-base text-gray-600"></p>
                </div>
            ))}
        </>
    )
}
