import React from 'react'

import PrimaryButton from '@/components/buttons/primary-button'
import NavbarLayout from '../../components/nav-bar/nav-bar-layout'
import Navbar from './_components/nav-bar'

function HomePage() {
    return (
        <>
            <NavbarLayout Navbar={Navbar} />

            <div className="">
                <div className="mx-auto max-w-4xl p-12 pt-32 text-center text-gray-800 font-bold">
                    <h1 className="text-7xl">Secret gift exchange made easy</h1>
                </div>
                <div className="w-[350px] h-[60px] mx-auto">
                    <PrimaryButton size="full">Get Started</PrimaryButton>
                </div>
            </div>
        </>
    )
}

export default HomePage
