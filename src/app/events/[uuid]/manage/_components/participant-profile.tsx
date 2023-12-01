import UserAvatar from '@/components/avatar/user-avatar'
import { Participant } from '@/types/participant/Participant'
import { Profile } from '@/types/profile/Profile'
import React from 'react'

interface IProps {
    name: Participant['name']
    profile: Profile
}
export default function ParticipantProfile({ name, profile }: IProps) {
    return (
        <div className="flex gap-2">
            <UserAvatar size={'10'} image={profile.avatar_url} />
            <div className="flex flex-col justify-center">
                <h3 className="font-bold">{name}</h3>
                <p className="text-xs text-gray-500">{profile.email}</p>
            </div>
        </div>
    )
}
