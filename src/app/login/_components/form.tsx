'use client'
import PrimaryButton from '@/components/buttons/primary-button'
import TextInput from '@/components/inputs/text-input'
import SupabaseClient from '@/lib/supabase/handlers/SupabaseClient'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod'

export interface FormData {
    email: string
}

interface SupabaseStatus {
    status: 'success' | 'error'
    message: string
}

const schema = z.object({
    email: z.string().email({ message: 'Please enter a valid email' })
})

export default function Form() {
    const supabase = SupabaseClient()

    const {
        handleSubmit,
        control,
        formState: { isSubmitting }
    } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    const [supabaseStatus, setSupabaseStatus] = useState<SupabaseStatus>()

    async function onSubmit(data: FormData) {
        const { email } = data

        return supabase.auth
            .signInWithOtp({
                email: email,
                options: {
                    emailRedirectTo: location.origin + '/api/auth/callback'
                }
            })
            .then(({ error }) => {
                if (error) {
                    setSupabaseStatus({
                        status: 'error',
                        message: error.message
                    })
                    return
                }

                setSupabaseStatus({
                    status: 'success',
                    message: 'Check your email for the login link!'
                })
            })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <h1 className="mb-6 font-baloo text-2xl font-bold sm:mb-4 sm:text-4xl">Login in to Secretly</h1>
            <div className="mb-6">
                <Controller
                    name="email"
                    control={control}
                    rules={{ required: true }}
                    render={({ field, fieldState }) => (
                        <TextInput
                            title={'Email Address'}
                            {...field}
                            error={fieldState?.error?.message}
                            key={'email'}
                        />
                    )}
                />
            </div>
            <PrimaryButton
                type="submit"
                loading={isSubmitting}
                loadingText="Sending..."
                className="text-lg sm:text-base"
            >
                Send Magic Link
            </PrimaryButton>
            {supabaseStatus && (
                <div
                    className={twMerge(
                        `mt-4 rounded-md border-2 p-4 text-center text-sm sm:text-base`,
                        supabaseStatus.status === 'success'
                            ? 'border-green-500 bg-green-50 text-green-500 '
                            : 'border-red-500 bg-red-50 text-red-500'
                    )}
                >
                    {supabaseStatus.message}
                </div>
            )}
        </form>
    )
}
