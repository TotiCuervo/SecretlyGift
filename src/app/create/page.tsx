'use client'
import React, { useState } from 'react'
import Form from './_components/form'
import TextInput from './_components/textinput'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import DatepickerInput from './_components/datepicker-input'
import { useRouter } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import useSupabase from '@/lib/supabase/useSupabase'
import { Profile } from '@/lib/select/Profile'
import useSupabaseClient from '@/lib/supabase/useSupabaseClient'

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
    eventDate: z.date()
})

const userSchema = z.object({
    userName: z.string().min(3, { message: 'Name needs to be more than 2 characters' }),
    userEmail: z.string().email({ message: 'Please enter a valid email' })
})

export default function page() {
    const supabase = useSupabaseClient()
    const [loading, setLoading] = useState(false)
    const [step, setStep] = useState(1)

    const {
        handleSubmit: eventSubmit,
        control: eventControl,
        formState: eventState
    } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    const { handleSubmit: userSubmit, control: userControl } = useForm<UserData>({
        resolver: zodResolver(userSchema)
    })

    function onSubmit(data: FormData) {
        setStep(2)
    }

    async function onUserSubmit(data: UserData) {
        setLoading(true)
        const { userName, userEmail } = data
        const { eventDate, eventName } = eventState.dirtyFields

        const { count, error: profileError } = await supabase
            .from('profiles')
            .select('*', { count: 'exact', head: true })
            .eq('email', userEmail)
            .single()

        console.log({ count })

        // createEvent({
        //     name: eventData.eventName,
        //     date: eventData.eventDate.toLocaleDateString()
        // })
        //     .then((res) => {
        //         router.push(`/${res.data.uuid}/participants`)
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //     })
        //     .finally(() => {
        //         setLoading(false)
        //     })
    }

    return (
        <>
            <div className={twMerge(step === 1 ? 'block' : 'hidden')}>
                <Form
                    title="It's time to party!"
                    subtitle="Tell us a little about the event."
                    handleSubmit={eventSubmit(onSubmit)}
                    loading={loading}
                    backButtonDisabled={true}
                    buttonText="Next"
                >
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
                    title="And tell us about you?"
                    subtitle="Tell us a little about the event."
                    handleSubmit={userSubmit(onUserSubmit)}
                    loading={loading}
                    buttonText="Create"
                    backButtonDisabled={false}
                    backButtonOnClick={() => setStep(1)}
                >
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
