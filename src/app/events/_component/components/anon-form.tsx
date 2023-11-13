'use client'
import PrimaryButton from '@/components/buttons/primary-button'
import Controller from '@/components/forms/controller'
import TextInput from '@/components/inputs/text-input'
import fetchCheckIfProfileExists from '@/lib/supabase/api/profiles/fetch/fetchCheckIfProfileExists'
import SupabaseClient from '@/lib/supabase/handlers/SupabaseClient'
import { UseFormReturn } from 'react-hook-form'
import Header from './header'
import { FormData, FormState } from '../join-event-form'

interface IProps {
    setState: React.Dispatch<React.SetStateAction<FormState>>
    form: UseFormReturn<FormData, any, undefined>
}
export default function AnonForm({ form, setState }: IProps) {
    const supabase = SupabaseClient()

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = form

    async function onSubmit(data: FormData) {
        const { name, email } = data

        const { count, error } = await fetchCheckIfProfileExists(supabase, email)

        if (count !== 0) {
            setState('UserExists')
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Header title="Join the party!" subtitle="Sign up to join to the gift exchange." />
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
                    <PrimaryButton>Join event</PrimaryButton>
                </div>
            </div>
        </form>
    )
}
