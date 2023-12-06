import UserAvatar from '@/components/avatar/user-avatar'
import { Participant } from '@/types/participant/Participant'
import { Profile } from '@/types/profile/Profile'
import React from 'react'

interface IProps {
    name: Participant['name']
    profile: Profile
}
export default function ParticipantPill({ name, profile }: IProps) {
    return (
        <div className="flex items-center gap-2 rounded-xl bg-gray-200 p-2 shadow-sm">
            <UserAvatar size={'3'} image={profile.avatar_url} />
            <h3 className="text-xs font-bold">{name}</h3>
        </div>
    )
}
