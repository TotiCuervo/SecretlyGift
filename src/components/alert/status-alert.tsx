import { StatusMessage } from '@/types/StatusMessage'
import React from 'react'
import ErrorAlert from './error-alert'
import SuccessAlert from './success-alert'

interface IProps {
    status: StatusMessage
}

export default function StatusAlert({ status }: IProps) {
    if (status.type === 'success') {
        return <SuccessAlert>{status.message}</SuccessAlert>
    }

    return <ErrorAlert>{status.message}</ErrorAlert>
}
