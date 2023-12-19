import React from 'react'
import BaseAlert, { AlertProps } from './base-alert'

export default function ErrorAlert({ children, ...props }: AlertProps) {
    return (
        <BaseAlert
            border={'border-red-500'}
            bg={'bg-red-50'}
            text={'text-red-500'}
            {...props}
        >
            {children}
        </BaseAlert>
    )
}
