'use client'
import React from 'react'
import Form from '../_components/Form'
import { useCreateContext } from '@/context/CreateContext'

export default function page() {
    const { register, handleSubmit } = useCreateContext()

    return (
        <Form title="some title" subtitle="Some subtitle">
            <div className="mb-4 relative">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-600">
                    Please enter a phone number
                </label>
                <input type="text" id="phone" className="mt-1 p-2 w-full border rounded-md" />
                <span className="absolute top-0 right-0 p-2 text-red-500">Error message</span>
            </div>
        </Form>
    )
}
