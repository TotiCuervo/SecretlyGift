'use client'
import React from 'react'
import Form from '../_components/form/form'
import { useCreateContext } from '@/context/CreateContext'
import TextInput from '../_components/form/textinput'

export default function page() {
    const { register, handleSubmit } = useCreateContext()

    return (
        <Form title="It's time to party!" subtitle="Tell us a little about the event." handleSubmit={handleSubmit}>
            <TextInput {...register("eventName")} />

        </Form>
    )
}
