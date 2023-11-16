import React from 'react'
import BaseAlert, { AlertProps } from './base-alert'

export default function SuccessAlert({ children }: AlertProps) {
    return (
        <BaseAlert border={'border-green-500'} bg={'bg-green-50'} text={'text-green-500'}>
            {children}
        </BaseAlert>
    )
}
