'use client'
import PrimaryButton from '@/components/buttons/primary-button'
import { useCreateContext } from '@/context/CreateContext'
import React from 'react'
import { UseFormHandleSubmit } from 'react-hook-form'

interface IProps {
    title: string
    subtitle?: string
    children: React.ReactNode
    // handleSubmit: UseFormHandleSubmit<FormData, undefined>
}

function Form({ title, subtitle, children}: IProps) {
    const { register, handleSubmit } = useCreateContext()
    return (
        <div className="w-full mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-indigo-950">{title}</h2>
            {subtitle && <p className="mb-4 text-indigo-950 font-light">{subtitle}</p>}
            <div className="mt-10">
                {children}
                <div className="flex justify-between">
                    <button className="bg-gray-200 hover:bg-gray-300 p-2 rounded-md">Back</button>
                    <PrimaryButton onClick={() => {
                        console.log('boop')
                        handleSubmit((d) => console.log(d))
                    }}>Next Step</PrimaryButton>
                </div>
            </div>
        </div>
    )
}

export default Form
