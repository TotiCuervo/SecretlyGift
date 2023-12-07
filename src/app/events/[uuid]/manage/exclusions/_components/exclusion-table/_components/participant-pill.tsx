import UserAvatar from '@/components/avatar/user-avatar'
import { Participant } from '@/types/participant/Participant'
import { Profile } from '@/types/profile/Profile'
import { XMarkIcon } from '@heroicons/react/24/outline'
import React from 'react'

interface IProps {
    name: Participant['name']
    profile: Profile
    onDelete?: () => void
}
export default function ParticipantPill({ name, profile, onDelete }: IProps) {
    return (
        <div className="flex items-center gap-2 rounded-xl bg-gray-100 p-2 shadow-sm">
            <UserAvatar size={'3'} image={profile.avatar_url} />
            <h3 className="truncate text-xs font-bold">{name}</h3>
            {onDelete && (
                <div className="flex grow justify-end">
                    <div onClick={onDelete} className="cursor-pointer px-2 text-gray-500 transition duration-150 ease-in-out hover:text-gray-900">
                        <XMarkIcon className="h-4 w-4" />
                    </div>
                </div>
            )}
        </div>
    )
}
