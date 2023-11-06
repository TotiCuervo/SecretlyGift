'use client'

import React from 'react'
interface IProps {
    eventName: string
    eventDate: Date
    userName: string
}

export default function EventPreview({ eventName, eventDate, userName }: IProps) {
    return (
        <>
            <div className="card rounded-md bg-white p-4 shadow-xl">
                <div className="pb-2">
                    <h6 className="text-md font-bold text-gray-500">EVENT</h6>
                    <h5 className="text-lg font-bold text-primary-900">{eventName}</h5>
                </div>
                <div className="pb-2">
                    <h6 className="text-md font-bold text-gray-500">DATE</h6>
                    <h6 className="text-md mb-2 font-bold text-primary-900">
                        {eventDate.toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </h6>
                </div>
                <div className="pb-2">
                    <h6 className="text-md font-bold text-gray-500">ORGANIZED BY</h6>
                    <h6 className="text-md mb-2 font-bold text-primary-900">{userName}</h6>
                </div>
            </div>
        </>
    )
}
