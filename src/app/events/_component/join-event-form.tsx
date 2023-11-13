'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import AnonForm from './components/anon-form'
import UserExists from './components/user-exists'
import { useSessionContext } from '@/context/SessionContext'
import AuthForm from './components/auth-form'

export interface FormData {
    name: string
    email: string
}

export type FormState = 'Form' | 'UserExists' | 'AuthenticatedForm' | 'Confirmation'

const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email').min(1, 'Email is required')
})

export default function JoinEventForm() {
    const [state, setState] = useState<FormState>('Form')
    const { profile } = useSessionContext()

    const form = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    useEffect(() => {
        if (profile) {
            setState('AuthenticatedForm')
            form.setValue('name', profile.full_name!)
            form.setValue('email', profile.email)
        }
    }, [profile])

    if (state === 'UserExists') {
        return <UserExists setState={setState} />
    }

    if (state === 'AuthenticatedForm') {
        return <AuthForm setState={setState} form={form} />
    }

    return <AnonForm setState={setState} form={form} />
}
