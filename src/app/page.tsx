import React from 'react'
import Link from 'next/link'
import Button from './components/button'
import Navbar from './_components/nav-bar'

function HomePage() {
    return (
        <div>
            <Navbar />
            {/* <div className="">
                <div className="container mx-auto p-12 pt-32 text-center text-indigo-700">
                    <h1 className="font-baloo text-9xl">Secretly</h1>
                    <p className="text-xl font-semibold">secret gift exchange made easy</p>
                </div>
                <div className="mx-auto text-center">
                    <Link href="/create-event">
                        <Button>Get Started</Button>
                    </Link>
                </div>
            </div> */}
        </div>
    )
}

export default HomePage
