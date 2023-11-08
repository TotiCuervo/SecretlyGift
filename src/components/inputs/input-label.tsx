import React from 'react'
import { twMerge } from 'tailwind-merge'

interface IProps {
    children: React.ReactNode
    error?: boolean
}

export default function InputLabel({ children, error }: IProps) {
    return (
        <label htmlFor="phone" className={twMerge('mb-2 block text-sm font-medium', error && 'text-red-700')}>
            {children}
        </label>
    )
}
