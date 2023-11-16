'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import AnonForm from './components/anon-form'
import UserExists from './components/user-exists'
import { useSessionContext } from '@/context/SessionContext'
import AuthForm from './components/auth-form'
import { EventWithParticipants } from '@/types/events/EventWithParticipants'
import AnonConfirmation from './components/anon-confirmation'
import AlreadyInEvent from './components/already-in-event'
import AuthConfirmation from './components/auth-confirmation'

export interface FormData {
    name: string
    email: string
}

interface IProps {
    event: EventWithParticipants
}

export type FormState =
    | 'Form'
    | 'UserExists'
    | 'AuthenticatedForm'
    | 'AnonConfirmation'
    | 'AlreadyInEvent'
    | 'AuthConfirmation'

const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email').min(1, 'Email is required')
})

export default function JoinEventForm({ event }: IProps) {
    const [state, setState] = useState<FormState>('Form')
    const { profile } = useSessionContext()

    const form = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    useEffect(() => {
        if (!profile) {
            setState('Form')
            return
        }

        if (event.participant.find((participant) => participant.profile.id === profile.id)) {
            setState('AlreadyInEvent')
            return
        }

        form.setValue('name', profile.full_name!)
        form.setValue('email', profile.email)
        setState('AuthenticatedForm')
    }, [profile])

    if (state === 'AlreadyInEvent') {
        return <AlreadyInEvent event={event} />
    }

    if (state === 'AuthConfirmation') {
        return <AuthConfirmation form={form} event={event} />
    }

    if (state === 'AnonConfirmation') {
        return <AnonConfirmation form={form} event={event} />
    }

    if (state === 'UserExists') {
        return <UserExists setState={setState} event={event} form={form} />
    }

    if (state === 'AuthenticatedForm') {
        return <AuthForm setState={setState} form={form} event={event} />
    }

    return <AnonForm setState={setState} form={form} event={event} />
}
