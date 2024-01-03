import React, { InputHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import InputLabel from './input-label'

interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
    value: string
    name: string
    title?: string
    ref?: React.Ref<HTMLInputElement>
    error?: string
    helperText?: string
    size?: 'sm' | 'md' | 'lg'
}

export default function TextInput({ error, title, helperText, size, ...props }: TextInputProps) {
    return (
        <div>
            {title && <InputLabel error={Boolean(error)}>{title}</InputLabel>}
            <div className="flex items-center">
                <input
                    className={twMerge(
                        'input-field',
                        !error && 'input-field-default',
                        error && 'input-field-error',
                        size && `input-field-${size}`
                    )}
                    {...props}
                />
            </div>
            {helperText && !error && <span className="p-2 text-xs text-gray-700">{helperText}</span>}
            {error && <span className="p-2 text-xs text-red-700">{error}</span>}
        </div>
    )
}
