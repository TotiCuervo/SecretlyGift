import React from 'react'
import BaseAlert, { AlertProps } from './base-alert'

export default function ErrorAlert({ children }: AlertProps) {
    return (
        <BaseAlert border={'border-red-500'} bg={'bg-red-50'} text={'text-red-500'}>
            {children}
        </BaseAlert>
    )
}
