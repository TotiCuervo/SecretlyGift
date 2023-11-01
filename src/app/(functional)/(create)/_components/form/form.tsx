'use client'
import PrimaryButton from '@/components/buttons/primary-button'
import React, { FormEventHandler } from 'react'
import { UseFormHandleSubmit } from 'react-hook-form'

interface IProps {
    title: string
    subtitle?: string
    children: React.ReactNode
    handleSubmit: FormEventHandler<HTMLFormElement>
}

function Form({ title, subtitle, children, handleSubmit }: IProps) {
    return (
        <div className="w-full mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-indigo-950">{title}</h2>
            {subtitle && <p className="mb-4 text-indigo-950 font-light">{subtitle}</p>}
            <form onSubmit={handleSubmit} className="mt-10">
                {children}
                <div className="flex justify-between">
                    <button className="bg-gray-200 hover:bg-gray-300 p-2 rounded-md">Back</button>

                    <PrimaryButton type="submit">Next Step</PrimaryButton>
                </div>
            </form>
        </div>
    )
}

export default Form
