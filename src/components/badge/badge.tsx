import React from 'react'
import { twMerge } from 'tailwind-merge'

interface IProps {
    color: 'green' | 'red' | 'blue' | 'yellow'
    children: React.ReactNode
}

export default function Badge({ color, children }: IProps) {
    return (
        <span
            className={twMerge(
                `inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset`,
                color === 'green' && `bg-green-100 text-green-700 ring-green-600/10`,
                color === 'red' && `bg-red-50 text-red-700 ring-red-600/10`,
                color === 'blue' && `bg-blue-50 text-blue-700 ring-blue-600/10`,
                color === 'yellow' && `bg-yellow-50 text-yellow-700 ring-yellow-600/10`
            )}
        >
            {children}
        </span>
    )
}
