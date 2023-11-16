'use client'
import PrimaryButton from '@/components/buttons/primary-button'
import Controller from '@/components/forms/controller'
import TextInput from '@/components/inputs/text-input'
import SupabaseClient from '@/lib/supabase/handlers/SupabaseClient'
import { UseFormReturn } from 'react-hook-form'
import Header from './header'
import { FormData, FormState } from '../join-event-form'
import { EventWithParticipants } from '@/types/events/EventWithParticipants'
import { joinEventWithNewUser } from '@/endpoints/event/join-event-with-new-user'
import { useState } from 'react'
import { StatusMessage } from '@/types/StatusMessage'
import ErrorAlert from '@/components/alert/error-alert'
import signInWithOtp from '@/lib/supabase/api/auth/signInWithOtp'
import fetchCheckIfProfileExists from '@/lib/supabase/api/profiles/fetch/fetchCheckIfProfileExists'

interface IProps {
    setState: React.Dispatch<React.SetStateAction<FormState>>
    form: UseFormReturn<FormData, any, undefined>
    event: EventWithParticipants
}
export default function AnonForm({ form, setState, event }: IProps) {
    const supabase = SupabaseClient()

    const [statusMessage, setStatusMessage] = useState<StatusMessage>()

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = form

    async function onSubmit(data: FormData) {
        const { name, email } = data
        setStatusMessage(undefined)

        try {
            const { count } = await fetchCheckIfProfileExists(supabase, email)

            if (count && count > 0) {
                setState('UserExists')
                return
            }
        } catch (error) {
            handleError()
        }

        try {
            const { data } = await joinEventWithNewUser({
                name,
                email,
                event: event.uuid
            })

            try {
                await signInWithOtp(supabase, { email })
                setState('AnonConfirmation')
            } catch {
                handleError()
            }
        } catch (error) {
            handleError()
        }
    }

    function handleError() {
        setStatusMessage({
            type: 'error',
            message: 'Something went wrong. Please try again.'
        })
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Header title="Join the party!" subtitle="Sign up to join to the gift exchange." event={event} />
            {statusMessage && statusMessage.type === 'error' && <ErrorAlert>{statusMessage.message}</ErrorAlert>}
            <div className="flex flex-col gap-4">
                <Controller
                    control={control}
                    name="name"
                    render={({ field }) => (
                        <TextInput {...field} title="Name" placeholder="Your Name" error={errors.name?.message} />
                    )}
                />
                <Controller
                    control={control}
                    name="email"
                    render={({ field }) => (
                        <TextInput {...field} title="Email" placeholder="Your Email" error={errors.email?.message} />
                    )}
                />
                <div>
                    <PrimaryButton loading={isSubmitting} loadingText="Joining...">
                        Join event
                    </PrimaryButton>
                </div>
            </div>
        </form>
    )
}
