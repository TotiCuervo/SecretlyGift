'use client'
import React, { useState } from 'react'
import Form from '../_components/form/form'
import TextInput from '../_components/form/textinput'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import DatepickerInput from '../_components/form/datepicker-input'
import { createEvent } from '@/endpoints/event/createEvent'

export interface FormData {
    eventName: string
    eventDate: Date
}

const schema = z.object({
    eventName: z.string().min(3, { message: 'Event needs to be more than 3 characters' }),
    eventDate: z.date()
})

export default function page() {
    const { handleSubmit, control } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    const [loading, setLoading] = useState(false)

    function onSubmit(data: FormData) {
        setLoading(true)
        createEvent({
            name: data.eventName,
            date: data.eventDate.toLocaleDateString()
        })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <Form
            title="It's time to party!"
            subtitle="Tell us a little about the event."
            handleSubmit={handleSubmit(onSubmit)}
            loading={loading}
        >
            <Controller
                name="eventName"
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                    <TextInput title={'Name of Event'} {...field} error={fieldState?.error?.message} />
                )}
            />
            <Controller
                name="eventDate"
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                    <DatepickerInput title={'Date of Event'} {...field} error={fieldState?.error?.message} />
                )}
            />
        </Form>
    )
}
