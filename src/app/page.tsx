import React from 'react'
import Link from 'next/link'
import Button from './components/button'

function HomePage() {
    return (
        <div className="h-screen w-screen bg-indigo-700">
            <div className="container mx-auto p-12 pt-32 text-center text-white">
                <h1 className="font-baloo text-9xl">Secretly</h1>
                <p className="text-xl font-semibold">secret gift exchange made easy</p>
            </div>
            <div className="mx-auto text-center">
                <Link href="/create-event">
                    <Button>Get Started</Button>
                </Link>
            </div>
        </div>
    )
}

export default HomePage
