import { UserIcon } from '@heroicons/react/24/outline'
import React from 'react'

interface IProps {
    image?: string | null
    size?: string
}

export default function UserAvatar({ image, size = '12' }: IProps) {
    return image ? (
        <div className="rounded-full border bg-white p-2">
            <UserIcon className={`h-${size} w-${size}`} />
        </div>
    ) : (
        <div className="rounded-full border bg-white p-2">
            <UserIcon className={`h-${size} w-${size}`} />
        </div>
    )
}
