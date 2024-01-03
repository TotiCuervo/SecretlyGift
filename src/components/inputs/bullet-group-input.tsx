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
    options: string[]
    size?: 'sm' | 'md' | 'lg'
}

export default function BulletGroupInput({
    error,
    title,
    helperText,
    size,
    value,
    onChange,
    options,
    ...props
}: TextInputProps) {
    function handleOnClick(option: string) {
        onChange({
            target: {
                name: props.name,
                value: option
            }
        } as any)
    }

    return (
        <div>
            {title && <InputLabel error={Boolean(error)}>{title}</InputLabel>}
            <div className="flex items-center">
                {options.map((option) => (
                    <label className="flex items-center px-4 first:pl-0 first:pr-4">
                        <input
                            type="radio"
                            name={option}
                            value={option}
                            checked={value === option}
                            onChange={() => handleOnClick(option)}
                            className="border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2">{option}</span>
                    </label>
                ))}
            </div>
            {helperText && !error && <span className="p-2 text-xs text-gray-700">{helperText}</span>}
            {error && <span className="p-2 text-xs text-red-700">{error}</span>}
        </div>
    )
}
