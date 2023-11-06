import Badge from '@/components/badge/badge'
import PrimaryButton from '@/components/buttons/primary-button'
import Image from 'next/image'
import React from 'react'

export default function ExchangeDetailCard() {
    const date = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }) // get current day and date

    const members = [
        { id: 1, name: 'John', avatar: 'https://i.pravatar.cc/50?img=1' },
        { id: 2, name: 'Jane', avatar: 'https://i.pravatar.cc/50?img=2' },
        { id: 3, name: 'Bob', avatar: 'https://i.pravatar.cc/50?img=3' },
        { id: 4, name: 'Alice', avatar: 'https://i.pravatar.cc/50?img=4' },
        { id: 5, name: 'Charlie', avatar: 'https://i.pravatar.cc/50?img=5' },
        { id: 6, name: 'David', avatar: 'https://i.pravatar.cc/50?img=6' }
    ]

    const additionalMembersCount = members.length - 3

    return (
        <div className="flex flex-col items-center justify-center overflow-hidden rounded-lg bg-white p-4 shadow-lg">
            <div className="mb-2 flex w-full items-center justify-between">
                <Badge color="green">Active</Badge>
                <p className="ml-auto text-sm text-gray-600">{date}</p>
            </div>
            <div className="px-4 py-2 text-center">
                <h2 className="mb-2 text-2xl font-bold">name</h2>
                <p className="text-base text-gray-600">{members.length} members</p>
                <div className="mt-4 flex items-center justify-center">
                    {members.slice(0, 3).map((member) => (
                        <Image
                            key={member.id}
                            className="z-10 -ml-2 h-12 w-12 rounded-full border-2 border-white"
                            src={member.avatar}
                            alt={member.name}
                            style={{ zIndex: members.length - member.id }}
                        />
                    ))}
                    {additionalMembersCount > 0 && (
                        <div className="z-10 -ml-2 flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-gray-200">
                            <p className="text-base text-gray-600">+{additionalMembersCount}</p>
                        </div>
                    )}
                </div>
            </div>
            <div className="mt-4 h-10 w-full">
                <PrimaryButton size="full">View Details</PrimaryButton>
            </div>
        </div>
    )
}
