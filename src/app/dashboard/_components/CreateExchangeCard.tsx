import React from 'react'
import { GiftIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function CreateExchangeCard() {
    return (
        <Link
            href="/create"
            className="group/card flex flex-col items-center justify-center border-dashed border-2 border-indigo-500 p-4 rounded-lg bg-indigo-100 hover:bg-indigo-200 transition duration-200 cursor-pointer"
        >
            <div className="border-dashed border-2 border-indigo-500 rounded-full p-2 group-hover/card:animate-bounce">
                <GiftIcon className="h-6 w-6 text-indigo-500" />
            </div>
            <h2 className="text-center text-lg font-bold mt-2">Create a Gift Exchange</h2>
            <p className="text-center text-gray-500 mt-2">Create a gift exchange for your friends and family!</p>
        </Link>
    )
}
