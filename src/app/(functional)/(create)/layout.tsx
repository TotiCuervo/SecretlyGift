import React from 'react'
import Steps from './_components/steps'
import { CreateProvider } from '@/context/CreateContext'

interface IProps {
    children: React.ReactNode
}

export default function layout({ children }: IProps) {
    return (
        <CreateProvider>
            <div className="max-w-xl mx-auto flex flex-col justify-center">
                <div className="flex flex-col items-center w-full">
                    <div className="w-full">
                        <Steps />
                    </div>
                    <div className="w-full mt-8 px-4">
                        {children}
                    </div>
                </div>
            </div>
        </CreateProvider>
    )
}
