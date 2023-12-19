import React from 'react'
import { twMerge } from 'tailwind-merge'

interface PrivateAlertProps {
    border: string
    bg: string
    text: string
    children: React.ReactNode
    padding?: string
}

export type AlertProps = Omit<PrivateAlertProps, 'border' | 'bg' | 'text'>

export default function BaseAlert({ border, bg, text, children, padding = 'p-4' }: PrivateAlertProps) {
    return (
        <div className={twMerge(`rounded-md border-2 text-center text-sm sm:text-base`, border, bg, text, padding)}>
            {children}
        </div>
    )
}
