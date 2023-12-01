import React, { ChangeEventHandler, InputHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import InputLabel from './input-label'

interface TextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
    onChange: ChangeEventHandler<HTMLTextAreaElement>
    onBlur: ChangeEventHandler<HTMLTextAreaElement>
    value: string
    name: string
    title?: string
    ref?: React.Ref<HTMLInputElement>
    error?: string
}

export default function TextArea({ error, title, ref, ...props }: TextAreaProps) {
    return (
        <div>
            {title && <InputLabel error={Boolean(error)}>{title}</InputLabel>}
            <div className="flex items-center">
                <textarea
                    className={twMerge('input-field', !error && 'input-field-default', error && 'input-field-error')}
                    rows={3}
                    {...props}
                />
            </div>
            {error && <span className="p-2 text-xs text-red-700">{error}</span>}
        </div>
    )
}
