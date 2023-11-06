'use client'
import GhostButton from '@/components/buttons/ghost-button'
import PrimaryButton from '@/components/buttons/primary-button'
import useSupabaseClient from '@/lib/supabase/useSupabaseClient'
import React, { useState } from 'react'
import { twMerge } from 'tailwind-merge'

interface IProps {
    email: string
    onBack: () => void
}

export default function UserExists({ email, onBack }: IProps) {
    const supabase = useSupabaseClient()

    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState<'error' | 'success'>()

    async function sendMagicLink() {
        setLoading(true)

        const { data, error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                shouldCreateUser: false,
                emailRedirectTo: location.origin + '/api/auth/callback'
            }
        })

        if (error) {
            setStatus('error')
            setLoading(false)
        }

        if (data) {
            setStatus('success')
            setLoading(false)
        }
    }

    return (
        <div className="mx-auto w-full text-center">
            <h1 className="mb-4 text-6xl font-bold text-primary-700">{email}</h1>

            <h1 className="mb-4 text-6xl font-bold text-primary-950">Is that you?</h1>
            <p className="mb-4 font-light text-primary-950">
                Looks like this user already exists. If so, login to create your event.
            </p>
            <div className="mt-20 flex justify-center">
                <div className="h-12 w-10/12">
                    <PrimaryButton
                        size="full"
                        loading={loading}
                        loadingText={'...Sending Magic Link'}
                        onClick={sendMagicLink}
                    >
                        Send Magic Link
                    </PrimaryButton>
                </div>
            </div>
            {status && (
                <div>
                    <p
                        className={twMerge(
                            'mt-4 font-light text-red-700',
                            status === 'success' ? 'text-green-700' : 'text-red-700'
                        )}
                    >
                        {status === 'success' ? 'Please check your email' : 'Something went wrong. Please try again.'}
                    </p>
                </div>
            )}
            <div className="mt-2">
                <GhostButton onClick={onBack} size="sm">
                    or change email
                </GhostButton>
            </div>
        </div>
    )
}
