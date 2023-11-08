'use client'
import React, { useState } from 'react'
import Form from './_components/form'
import TextInput from '../../components/inputs/text-input'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import DatepickerInput from '../../components/inputs/datepicker-input'
import { twMerge } from 'tailwind-merge'
import SupabaseClient from '@/lib/supabase/SupabaseClient'
import UserExists from './_components/user-exists'
import { createEventWithNewUser } from '@/endpoints/event/createEventWithNewUser'
import Confirmation from './_components/confirmation'

export interface FormData {
    eventName: string
    eventDate: Date
}

export interface UserData {
    userName: string
    userEmail: string
}

const schema = z.object({
    eventName: z.string().min(3, { message: 'Event needs to be more than 3 characters' }),
    eventDate: z.date().refine(
        (val) => {
            const now = new Date()
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
            return val >= today
        },
        { message: 'Event date must not be in the past' }
    )
})

const userSchema = z.object({
    userName: z.string().min(3, { message: 'Name needs to be more than 2 characters' }),
    userEmail: z.string().email({ message: 'Please enter a valid email' })
})

export default function Page() {
    const supabase = SupabaseClient()
    const [loading, setLoading] = useState(false)
    const [step, setStep] = useState(1)
    const [showState, setShowState] = useState<'UserExist' | 'Confirmation' | null>(null)

    const {
        handleSubmit: eventSubmit,
        control: eventControl,
        getValues: getEventValues
    } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    const {
        handleSubmit: userSubmit,
        control: userControl,
        getValues: getUserValues
    } = useForm<UserData>({
        resolver: zodResolver(userSchema)
    })

    function onSubmit() {
        setStep(2)
    }

    async function onUserSubmit(data: UserData) {
        setLoading(true)

        const { userName, userEmail } = data
        const { eventDate, eventName } = getEventValues()

        const { count } = await supabase
            .from('profiles')
            .select('*', { count: 'exact', head: true })
            .eq('email', userEmail)
            .single()

        if (!!count && count > 0) {
            setShowState('UserExist')
            setLoading(false)
            return
        }

        const { error } = await supabase.auth.signInWithOtp({
            email: userEmail,
            options: {
                emailRedirectTo: location.origin + '/api/auth/callback'
            }
        })

        if (error) {
            setLoading(false)
            return
        }

        createEventWithNewUser(
            {
                name: eventName,
                date: eventDate.toLocaleDateString()
            },
            {
                name: userName,
                email: userEmail
            }
        )
            .then((res) => {
                setShowState('Confirmation')
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    if (showState === 'Confirmation') {
        return (
            <Confirmation
                userEmail="cuervor14@gmail.com"
                userName="Toti Cuervo"
                eventName="Yacht Club Secret Santa 2023"
                eventDate={new Date()}
            />
        )
    }

    if (showState === 'UserExist') {
        return <UserExists email={getUserValues('userEmail')} onBack={() => setShowState(null)} />
    }

    return (
        <>
            <div className={twMerge(step === 1 ? 'block' : 'hidden')}>
                <Form
                    title="Tell us a little about the event."
                    subtitle="It is time to party!"
                    handleSubmit={eventSubmit(onSubmit)}
                    loading={loading}
                    backButtonDisabled={true}
                    buttonText="Next"
                >
                    <div className="mb-6">
                        <Controller
                            name="eventName"
                            control={eventControl}
                            rules={{ required: true }}
                            render={({ field, fieldState }) => (
                                <TextInput
                                    title={'Name of Event'}
                                    {...field}
                                    error={fieldState?.error?.message}
                                    key={'eventName'}
                                />
                            )}
                        />
                    </div>
                    <Controller
                        name="eventDate"
                        control={eventControl}
                        rules={{ required: true }}
                        render={({ field, fieldState }) => (
                            <DatepickerInput
                                title={'Date of Event'}
                                {...field}
                                error={fieldState?.error?.message}
                                key={'eventDate'}
                            />
                        )}
                    />
                </Form>
            </div>
            <div className={twMerge(step === 2 ? 'block' : 'hidden')}>
                <Form
                    title="Tell us a little about you."
                    subtitle="Thanks for coordinating!"
                    handleSubmit={userSubmit(onUserSubmit)}
                    loading={loading}
                    buttonText="Create"
                    backButtonDisabled={false}
                    backButtonOnClick={() => setStep(1)}
                >
                    <div className="mb-6">
                        <Controller
                            name="userName"
                            control={userControl}
                            rules={{ required: true }}
                            render={({ field, fieldState }) => (
                                <TextInput
                                    title={'Your name'}
                                    {...field}
                                    error={fieldState?.error?.message}
                                    ref={null}
                                    key={'userName'}
                                />
                            )}
                        />
                    </div>
                    <Controller
                        name="userEmail"
                        control={userControl}
                        rules={{ required: true }}
                        render={({ field, fieldState }) => (
                            <TextInput
                                title={'Your email'}
                                {...field}
                                error={fieldState?.error?.message}
                                ref={null}
                                key={'userEmail'}
                            />
                        )}
                    />
                </Form>
            </div>
        </>
    )
}
