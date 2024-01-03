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

export default function ThemeInput({ error, title, helperText, size, value, onChange, ...props }: TextInputProps) {
    const options = ['hideout', 'ilikefood', 'overlappingcircles', 'topography']

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
            <div className="flex">
                <div className={`grid grid-cols-${options.length} items-center gap-3`}>
                    {options.map((option) => (
                        <div
                            className={twMerge(
                                `h-20 w-20 bg-red-400 heropattern-${option}-red-100`,
                                value === option && 'border-2 border-black shadow-sm'
                            )}
                            onClick={() => handleOnClick(option)}
                        ></div>
                    ))}
                </div>
            </div>
            {helperText && !error && <span className="p-2 text-xs text-gray-700">{helperText}</span>}
            {error && <span className="p-2 text-xs text-red-700">{error}</span>}
        </div>
    )
}
