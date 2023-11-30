import React, { InputHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import InputLabel from './input-label'

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
    value: string
    name: string
    title?: string
    ref?: React.Ref<HTMLInputElement>
    error?: string
}

export default function MoneyInput({ error, title, ...props }: TextInputProps) {
    return (
        <div>
            {title && <InputLabel error={Boolean(error)}>{title}</InputLabel>}
            <div className="relative flex items-center">
                <div className="pointer-events-none absolute inset-y-0 left-0 mr-3 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                    className={twMerge(
                        'input-field-money',
                        !error && 'input-field-default',
                        error && 'input-field-error'
                    )}
                    type="number"
                    min="0"
                    {...props}
                />
            </div>
            {error && <span className="p-2 text-xs text-red-700">{error}</span>}
        </div>
    )
}
