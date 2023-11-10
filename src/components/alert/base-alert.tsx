import React from 'react'
import { twMerge } from 'tailwind-merge'

interface PrivateAlertProps {
    border: string
    bg: string
    text: string
    children: React.ReactNode
}

export type AlertProps = Omit<PrivateAlertProps, 'border' | 'bg' | 'text'>

export default function BaseAlert({ border, bg, text, children }: PrivateAlertProps) {
    return (
        <div className={twMerge(`rounded-md border-2 p-4 text-center text-sm sm:text-base`, border, bg, text)}>
            {children}
        </div>
    )
}
