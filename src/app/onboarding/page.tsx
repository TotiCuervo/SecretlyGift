'use client'
import ErrorAlert from '@/components/alert/error-alert'
import PrimaryButton from '@/components/buttons/primary-button'
import TextInput from '@/components/inputs/text-input'
import { useSessionContext } from '@/context/SessionContext'
import SupabaseClient from '@/lib/supabase/handlers/SupabaseClient'
import { StatusMessage } from '@/types/StatusMessage'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

interface Form {
    full_name: string
}

const schema = z.object({
    full_name: z.string().min(3, { message: 'Name needs to be more than 2 characters' })
})

export default function Page() {
    const supabase = SupabaseClient()

    const router = useRouter()

    const { profile, setProfile } = useSessionContext()

    const [status, setStatus] = useState<StatusMessage>()

    const {
        handleSubmit,
        control,
        formState: { isSubmitting, errors }
    } = useForm<Form>({
        resolver: zodResolver(schema)
    })

    const onSubmit = (data: Form) => {
        return Promise.resolve(
            supabase.from('profiles').update({ full_name: data.full_name }).eq('id', profile!.id).select()
        )
            .then((res) => {
                const { data } = res
                setProfile(data![0])
                router.push('/dashboard')
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Something went wrong. Please try again.'
                })
            })
    }

    return (
        <div className="flex h-screen justify-center pt-20">
            <div className="w-full max-w-xl px-4">
                <h1 className="text-xl font-bold sm:text-4xl">Hi, there! What should we call you?</h1>
                <p className="mt-3 text-gray-500">
                    We recommend using your full name but feel free to use a nickname as well. This name may be visible
                    to other users.
                </p>
                {status && status.type === 'error' && (
                    <div className="mt-4">
                        <ErrorAlert>{status.message}</ErrorAlert>
                    </div>
                )}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mt-4">
                        <Controller
                            name="full_name"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextInput
                                    {...field}
                                    title={'Full Name'}
                                    placeholder="Enter your name"
                                    error={errors.full_name?.message}
                                    ref={null}
                                />
                            )}
                        />
                    </div>
                    <div className="mt-4 flex justify-end">
                        <PrimaryButton type="submit" loading={isSubmitting} loadingText="Saving...">
                            Save
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    )
}
