import React from 'react'
import Steps from './_components/Steps'
import { CreateProvider } from '@/context/CreateContext'

interface IProps {
    children: React.ReactNode
}

export default function layout({ children }: IProps) {
    return (
        <CreateProvider>
            <div className="max-w-7xl mx-auto flex flex-col justify-center">
                <div className="flex justify-center">
                    <Steps />
                </div>
                <div className="flex justify-center mt-8">{children}</div>
            </div>
        </CreateProvider>
    )
}
