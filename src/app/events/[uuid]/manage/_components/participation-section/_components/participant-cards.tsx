'use client'
import UserAvatar from '@/components/avatar/user-avatar'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import ParticipantOptionDropdown from '../../participant-option-dropdown'

import InviteLinkButton from '../../invite-link-button'
import { ParticipantWithProfile } from '@/types/participant/ParticipantWithProfile'

interface IProps {
    participants: ParticipantWithProfile[]
}

export default function ParticipantCards({ participants }: IProps) {
    return (
        <div className="flex flex-col gap-4">
            {participants.map((participant, key) => (
                <div className="flex w-full rounded-lg bg-white p-4 shadow" key={key}>
                    <div className="flex shrink overflow-hidden">
                        <div className="mr-2 flex grow">
                            <UserAvatar size={'10'} image={participant.profile.avatar_url} />
                        </div>
                        <div className="flex flex-col overflow-hidden">
                            <h3 className="w-full truncate font-bold">{participant.name}</h3>
                            <p className="truncate text-xs text-gray-500">{participant.profile.email}</p>
                        </div>
                    </div>
                    <div className="flex grow justify-end">
                        <ParticipantOptionDropdown participant={participant} />
                    </div>
                </div>
            ))}
        </div>
    )
}
