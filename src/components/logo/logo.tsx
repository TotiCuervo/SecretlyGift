import React from 'react'
import { twMerge } from 'tailwind-merge'

interface IProps {
    size?: 'sm' | 'md' | 'lg' | 'xl'
}

export default function Logo({ size = 'md' }: IProps) {
    return (
        <span
            className={twMerge(
                'font-baloo',
                size === 'md' && 'text-4xl',
                size === 'sm' && 'text-2xl',
                size === 'lg' && 'text-6xl',
                size === 'xl' && 'text-8xl'
            )}
        >
            Secretly
        </span>
    )
}
