'use client'
import React, { useState } from 'react'
import Header from './header'
import GhostButton from '@/components/buttons/ghost-button'
import { FormData, FormState } from '../join-event-form'
import { EventWithParticipants } from '@/types/events/EventWithParticipants'
import SupabaseClient from '@/lib/supabase/handlers/SupabaseClient'
import { UseFormReturn } from 'react-hook-form'
import LoginButton from '@/components/auth/login-button'
import { StatusMessage } from '@/types/StatusMessage'
import signInWithOtpRedirect from '@/lib/supabase/api/auth/signInWithOtpRedirect'
import { publicEventRoute } from '@/lib/router/routes/events/public-event-route'

interface IProps {
    setState: React.Dispatch<React.SetStateAction<FormState>>
    event: EventWithParticipants
    form: UseFormReturn<FormData, any, undefined>
}

export default function UserExists({ setState, event, form }: IProps) {
    const supabase = SupabaseClient()

    const [status, setStatus] = useState<StatusMessage>()

    const {
        handleSubmit,
        formState: { isSubmitting }
    } = form

    async function onSubmit(data: FormData) {
        const { email } = data
        try {
            await signInWithOtpRedirect(supabase, publicEventRoute(event.uuid), { email })
            setStatus({
                type: 'success',
                message: 'Check your email for the login link!'
            })
        } catch (error) {
            setStatus({
                type: 'error',
                message: 'Something went wrong. Please try again.'
            })
        }
    }

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <Header
                title="Looks like this email already exists!"
                subtitle="If this is you, please login to continue. Don't worry, we'll send you back here after you login."
                event={event}
            />
            <div className="flex flex-col gap-4">
                <div>
                    <LoginButton status={status} isSubmitting={isSubmitting} />
                </div>
                <div>
                    <GhostButton
                        onClick={() => {
                            setState('Form')
                        }}
                    >
                        Not you? Go back and change email.
                    </GhostButton>
                </div>
            </div>
        </form>
    )
}
