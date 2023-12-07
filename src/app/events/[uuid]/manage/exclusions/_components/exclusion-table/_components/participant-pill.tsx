import UserAvatar from '@/components/avatar/user-avatar'
import { Participant } from '@/types/participant/Participant'
import { Profile } from '@/types/profile/Profile'
import { XMarkIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { twMerge } from 'tailwind-merge'

interface IProps {
    name: Participant['name']
    profile: Profile
    onClick?: () => void
    excluded?: boolean
    clickTitle?: string
}
export default function ParticipantPill({ name, profile, onClick, excluded, clickTitle }: IProps) {
    return (
        <div
            className={twMerge(
                'flex items-center gap-2 rounded-xl p-2 shadow-sm',
                excluded ? 'bg-red-400' : 'bg-gray-100'
            )}
        >
            <UserAvatar size={'3'} image={profile.avatar_url} />
            <h3 className={twMerge('truncate text-xs font-bold', excluded && 'text-red-950')}>{name}</h3>
            {clickTitle && onClick && (
                <div className="flex grow justify-end">
                    <span
                        onClick={onClick}
                        className={twMerge(
                            'cursor-pointer rounded px-2 py-1 text-xs font-bold shadow-sm transition duration-150 ease-in-out',
                            excluded ? 'hover bg-red-100 text-red-800' : 'bg-gray-200 text-gray-500 hover:text-gray-900'
                        )}
                    >
                        {clickTitle}
                    </span>
                </div>
            )}
        </div>
    )
}
