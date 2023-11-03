import React from 'react'
import { twMerge } from 'tailwind-merge'

interface TextInputProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
    value: string
    name: string
    title: string
    ref?: React.Ref<HTMLInputElement>
    error?: string
}

export default function TextInput({ error, title, ...props }: TextInputProps) {
    return (
        <div className="mb-6">
            <label
                htmlFor="phone"
                className={twMerge(
                    'block text-sm font-medium mb-2',
                    !error && 'text-indigo-900',
                    error && 'text-red-700'
                )}
            >
                {title}
            </label>
            <div className="flex items-center">
                <input
                    className={twMerge(
                        'mt-1 p-2.5 flex-grow outline-none rounded-lg border focus:ring-1 shadow transition duration-150 ease-in-out',
                        !error && 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500',
                        error && 'border-red-700 bg-red-50 focus:border-red-500 focus:ring-red-500'
                    )}
                    {...props}
                />
            </div>
            {error && <span className="p-2 text-xs text-red-700">{error}</span>}
        </div>
    )
}
