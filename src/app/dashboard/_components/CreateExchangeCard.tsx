import React from 'react'
import { GiftIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function CreateExchangeCard() {
    return (
        <Link
            href="/create"
            className="group/card flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-primary-500 bg-primary-100 p-4 transition duration-200 hover:bg-primary-200"
        >
            <div className="rounded-full border-2 border-dashed border-primary-500 p-2 group-hover/card:animate-bounce">
                <GiftIcon className="h-6 w-6 text-primary-500" />
            </div>
            <h2 className="mt-2 text-center text-lg font-bold">Create a Gift Exchange</h2>
            <p className="mt-2 text-center text-gray-500">Create a gift exchange for your friends and family!</p>
        </Link>
    )
}
