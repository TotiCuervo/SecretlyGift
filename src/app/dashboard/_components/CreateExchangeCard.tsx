'use client'
import React, { useState } from 'react'
import { GiftIcon } from '@heroicons/react/24/outline'
import Modal from '@/components/modal/modal'
import CreateEventModal from '@/components/modal/create-event-modal'

export default function CreateExchangeCard() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <div
                onClick={() => setIsOpen(true)}
                className="group/card flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-green-500 bg-green-100 p-4 transition duration-200 hover:bg-green-200"
            >
                <div className="rounded-full border-2 border-dashed border-green-500 p-2 group-hover/card:animate-bounce">
                    <GiftIcon className="h-6 w-6 text-green-500" />
                </div>
                <h2 className="mt-2 text-center text-lg font-bold">Create a Gift Exchange</h2>
                <p className="mt-2 text-center text-gray-500">Create a gift exchange for your friends and family!</p>
            </div>
            <CreateEventModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    )
}
