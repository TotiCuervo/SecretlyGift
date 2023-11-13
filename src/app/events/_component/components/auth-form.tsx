'use client'
import PrimaryButton from '@/components/buttons/primary-button'
import Controller from '@/components/forms/controller'
import TextInput from '@/components/inputs/text-input'
import fetchCheckIfProfileExists from '@/lib/supabase/api/profiles/fetch/fetchCheckIfProfileExists'
import SupabaseClient from '@/lib/supabase/handlers/SupabaseClient'
import { UseFormReturn } from 'react-hook-form'
import Header from './header'
import { FormData, FormState } from '../join-event-form'
import { useSessionContext } from '@/context/SessionContext'

interface IProps {
    setState: React.Dispatch<React.SetStateAction<FormState>>
    form: UseFormReturn<FormData, any, undefined>
}
export default function AuthForm({ form, setState }: IProps) {
    const supabase = SupabaseClient()
    const { profile } = useSessionContext()

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
            <Header
                title={`Hi there ${profile?.full_name}!`}
                subtitle="You can customize the name for this event if you'd like. "
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
                    <PrimaryButton>Join event</PrimaryButton>
                </div>
            </div>
        </form>
    )
}
