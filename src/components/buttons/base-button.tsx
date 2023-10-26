import React from 'react'
import { twMerge } from 'tailwind-merge'

export interface BaseButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children: React.ReactNode
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
    customClasses: string
}

export default function BaseButton({ children, customClasses ,size="md", ...props }: BaseButtonProps) {

    return (
        <button
            {...props}
            className={twMerge(
                'font-medium focus:ring-4 focus:outline-none rounded-lg text-center transition duration-200 ease-in-out',
                size === 'sm' && 'px-3 py-2 text-sm',
                size === 'md' && 'px-5 py-2.5 text-sm',
                size === 'lg' && 'px-5 py-3 text-base',
                size === 'xl' && 'px-6 py-3.5 text-base',
                size === '2xl' && 'px-7 py-4 text-lg',
                size === 'full' && 'w-full h-full text-lg',
                customClasses
            )}
        >
            {children}
        </button>
    )
}
