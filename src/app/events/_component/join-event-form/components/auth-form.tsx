'use client'
import PrimaryButton from '@/components/buttons/primary-button'
import Controller from '@/components/forms/controller'
import TextInput from '@/components/inputs/text-input'
import SupabaseClient from '@/lib/supabase/handlers/SupabaseClient'
import { UseFormReturn } from 'react-hook-form'
import Header from './header'
import { FormData, FormState } from '../join-event-form'
import { useSessionContext } from '@/context/SessionContext'
import { EventWithParticipants } from '@/types/events/EventWithParticipants'
import { joinEvent } from '@/endpoints/event/join-event'
import { useState } from 'react'
import { StatusMessage } from '@/types/StatusMessage'
import StatusAlert from '@/components/alert/status-alert'

interface IProps {
    setState: React.Dispatch<React.SetStateAction<FormState>>
    form: UseFormReturn<FormData, any, undefined>
    event: EventWithParticipants
}
export default function AuthForm({ form, setState, event }: IProps) {
    const { profile } = useSessionContext()
    const [status, setStatus] = useState<StatusMessage>()

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = form

    async function onSubmit(data: FormData) {
        const { name } = data

        try {
            const res = await joinEvent({
                event: event.uuid,
                name
            })

            if (res.status === 200) {
                setState('AuthConfirmation')
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Sorry something went wrong. Please try again later.' })
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Header
                title={`Hi there ${profile?.full_name}!`}
                subtitle="You can customize the name for this event if you'd like. "
                event={event}
            />
            <div className="flex flex-col gap-4">
                <Controller
                    control={control}
                    name="name"
                    render={({ field }) => (
                        <TextInput {...field} title="Name" placeholder="Your Name" error={errors.name?.message} />
                    )}
                />

                <div>
                    <PrimaryButton loading={isSubmitting} loadingText="Joining...">
                        Join event
                    </PrimaryButton>
                </div>
                {status && <StatusAlert status={status} />}
            </div>
        </form>
    )
}
