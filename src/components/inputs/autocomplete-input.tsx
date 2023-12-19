import React from 'react'
import InputLabel from './input-label'
import Autocomplete, { AutocompleteProps } from '../autocomplete/autocomplete'

export interface AutoCompleteInputProps<Item> extends AutocompleteProps<Item> {
    title?: string
    error?: string
    helperText?: string
}

export default function AutocompleteInput<Item>({ error, title, helperText, ...props }: AutoCompleteInputProps<Item>) {
    return (
        <div>
            {title && <InputLabel error={Boolean(error)}>{title}</InputLabel>}
            <Autocomplete<Item> {...props} />
            {helperText && !error && <span className="p-2 text-xs text-gray-700">{helperText}</span>}
            {error && <span className="p-2 text-xs text-red-700">{error}</span>}
        </div>
    )
}
