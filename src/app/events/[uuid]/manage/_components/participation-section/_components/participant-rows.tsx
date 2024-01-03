'use client'
import UserAvatar from '@/components/avatar/user-avatar'
import { AdministrativeParticipantView } from '@/types/participant/AdministrativeParticipantView'
import React from 'react'
import { twMerge } from 'tailwind-merge'

interface IProps {
    participants: AdministrativeParticipantView[]
}

export default function ParticipantRows({ participants }: IProps) {
    return (
        <div className="flex w-full flex-col divide-y">
            {participants.map((participant, key) => (
                <div className="flex gap-2 py-6">
                    <UserAvatar size={'10'} image={participant.profile.avatar_url} />
                    <div className="flex flex-col justify-center">
                        <h3 className="font-bold">{participant.name}</h3>
                        <p className="text-xs text-gray-500">{participant.profile.email}</p>
                    </div>
                    {/* <span className="text-gray-800">{participant.is_admin ? 'Admin' : 'Participant'}</span> */}
                </div>
            ))}
        </div>
    )
}
