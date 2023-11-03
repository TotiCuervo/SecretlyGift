import Logo from '@/components/logo/logo'
import React from 'react'

interface IProps {
    children: React.ReactNode
}
export default function layout({ children }: IProps) {
    return (
        <div className="mx-auto flex h-screen max-w-xl flex-col items-center justify-center">
            <Logo size={'lg'} />
            <div className="flex w-full flex-col items-center">
                <div className="mt-8 w-full px-4">{children}</div>
            </div>
        </div>
    )
}
