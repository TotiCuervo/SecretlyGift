'use client'
import PrimaryButton from '@/components/buttons/primary-button'
import React from 'react'

interface IProps {
    title: string
    subtitle?: string
    children: React.ReactNode
}

function Form({ title, subtitle, children }: IProps) {
    return (
        <div className="mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-indigo-900">{title}</h2>
            {subtitle && <p className="mb-4 text-indigo-900 font-light">{subtitle}</p>}
            <form>
                {children}
                <div className="flex justify-between">
                    <button className="bg-gray-200 hover:bg-gray-300 p-2 rounded-md">Back</button>
                    <PrimaryButton>Next Step</PrimaryButton>
                </div>
            </form>
        </div>
    )
}

export default Form
