import Badge from '@/components/badge/badge'
import PrimaryButton from '@/components/buttons/primary-button'
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
        <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col justify-center items-center p-4">
            <div className="flex items-center mb-2 justify-between w-full">
                <Badge color="green">Active</Badge>
                <p className="text-gray-600 text-sm ml-auto">{date}</p>
            </div>
            <div className="px-4 py-2 text-center">
                <h2 className="font-bold text-2xl mb-2">name</h2>
                <p className="text-gray-600 text-base">{members.length} members</p>
                <div className="flex items-center justify-center mt-4">
                    {members.slice(0, 3).map((member) => (
                        <img
                            key={member.id}
                            className="rounded-full border-white border-2 -ml-2 z-10 h-12 w-12"
                            src={member.avatar}
                            alt={member.name}
                            style={{ zIndex: members.length - member.id }}
                        />
                    ))}
                    {additionalMembersCount > 0 && (
                        <div className="rounded-full border-white border-2 -ml-2 z-10 h-12 w-12 flex items-center justify-center bg-gray-200">
                            <p className="text-gray-600 text-base">+{additionalMembersCount}</p>
                        </div>
                    )}
                </div>
            </div>
            <div className="h-10 w-full mt-4">
                <PrimaryButton size="full">View Details</PrimaryButton>
            </div>
        </div>
    )
}
