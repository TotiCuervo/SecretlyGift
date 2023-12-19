'use client'
import UserAvatar from '@/components/avatar/user-avatar'
import { AdministrativeParticipantView } from '@/types/participant/AdministrativeParticipantView'
import React from 'react'
import { twMerge } from 'tailwind-merge'

interface IProps {
    participants: AdministrativeParticipantView[]
}

export default function ParticipantTable({ participants }: IProps) {
    const headers = ['Person', 'Role']

    const tdClass = 'whitespace-normal py-4 text-sm font-medium'

    return (
        <table className="w-full border-separate border-spacing-x-0 border-spacing-y-4 divide-y divide-gray-200 pt-3 text-gray-900">
            <thead>
                <tr>
                    {headers.map((header) => (
                        <th
                            key={header}
                            scope="col"
                            className={twMerge(`text-left text-xs font-medium uppercase tracking-wider text-gray-500`)}
                        >
                            {header}
                        </th>
                    ))}
                    {/* <th></th> */}
                </tr>
            </thead>
            <tbody>
                {participants.map((participant, key) => (
                    <tr key={participant.id} className="">
                        <td className={twMerge(tdClass, 'rounded-bl-lg rounded-tl-lg')}>
                            <div className="flex gap-2">
                                <UserAvatar size={'10'} image={participant.profile.avatar_url} />
                                <div className="flex flex-col justify-center">
                                    <h3 className="font-bold">{participant.name}</h3>
                                    <p className="text-xs text-gray-500">{participant.profile.email}</p>
                                </div>
                            </div>
                        </td>

                        <td className={twMerge(tdClass)}>
                            <span className="text-gray-800">{participant.is_admin ? 'Admin' : 'Participant'}</span>
                        </td>
                        {/* <td className={twMerge(tdClass)}>
                            <ParticipantOptionDropdown participant={participant} />
                        </td> */}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
