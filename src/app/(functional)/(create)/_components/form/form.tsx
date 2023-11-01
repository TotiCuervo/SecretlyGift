'use client'
import GhostButton from '@/components/buttons/ghost-button'
import PrimaryButton from '@/components/buttons/primary-button'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import React, { FormEventHandler } from 'react'
import { UseFormHandleSubmit } from 'react-hook-form'

interface IProps {
    title: string
    subtitle?: string
    children: React.ReactNode
    handleSubmit: FormEventHandler<HTMLFormElement>
    loading: boolean
}

function Form({ title, subtitle, children, handleSubmit, loading }: IProps) {
    return (
        <div className="mx-auto w-full">
            <h2 className="mb-4 text-3xl font-bold text-primary-950">{title}</h2>
            {subtitle && <p className="mb-4 font-light text-primary-950">{subtitle}</p>}
            <form onSubmit={handleSubmit} className="mt-10">
                {children}
                <div className="mt-10 flex justify-end gap-4">
                    <GhostButton>
                        <div className="flex">
                            <ArrowLeftIcon className="mr-2 h-5 w-5" />
                            Back
                        </div>
                    </GhostButton>
                    <PrimaryButton type="submit" loading={loading} loadingText="Saving...">
                        Next Step
                    </PrimaryButton>
                </div>
            </form>
        </div>
    )
}

export default Form
