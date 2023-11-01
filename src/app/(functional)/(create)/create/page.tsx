'use client'
import React from 'react'
import Form from '../_components/form/form'
import { useCreateContext } from '@/context/CreateContext'
import TextInput from '../_components/form/textinput'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import DatepickerInput from '../_components/form/datepicker-input'

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

    function onSubmit(data: FormData) {
        console.log(data)
    }

    return (
        <Form
            title="It's time to party!"
            subtitle="Tell us a little about the event."
            handleSubmit={handleSubmit(onSubmit)}
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
