import React from 'react'
import Steps from './_components/steps'
import { CreateProvider } from '@/context/CreateContext'

interface IProps {
    children: React.ReactNode
}

export default function layout({ children }: IProps) {
    return (
        <CreateProvider>
            <div className="mx-auto flex max-w-xl flex-col justify-center">
                <div className="flex w-full flex-col items-center">
                    <div className="w-full">
                        <Steps />
                    </div>
                    <div className="mt-8 w-full px-4">{children}</div>
                </div>
            </div>
        </CreateProvider>
    )
}
