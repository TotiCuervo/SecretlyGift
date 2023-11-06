import React from 'react'

import PrimaryButton from '@/components/buttons/primary-button'
import Link from 'next/link'

function HomePage() {
    return (
        <>
            <div className="mx-auto max-w-4xl p-12 pt-32 text-center font-bold text-gray-800">
                <h1 className="text-7xl">Secret gift exchange made easy</h1>
            </div>
            <div className="mx-auto h-[60px] w-[350px]">
                <Link href="/create">
                    <PrimaryButton size="full">Get Started</PrimaryButton>
                </Link>
            </div>
        </>
    )
}

export default HomePage