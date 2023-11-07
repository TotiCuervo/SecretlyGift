'use client'
import GhostButton from '@/components/buttons/ghost-button'
import PrimaryButton from '@/components/buttons/primary-button'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import React, { FormEventHandler } from 'react'

interface IProps {
    title: string
    subtitle?: string
    children: React.ReactNode
    handleSubmit: FormEventHandler<HTMLFormElement>
    loading: boolean
    buttonText: string
    backButtonDisabled: boolean
    backButtonOnClick?: () => void
}

function Form({
    title,
    subtitle,
    children,
    handleSubmit,
    loading,
    buttonText,
    backButtonDisabled,
    backButtonOnClick
}: IProps) {
    return (
        <div className="mx-auto w-full">
            <div className="w-full text-center">
                <h2 className="mb-8 font-baloo text-5xl font-bold text-primary-700 drop-shadow-md">{title}</h2>
                {subtitle && <p className="mb-4 font-light text-primary-800">{subtitle}</p>}
            </div>
            <form onSubmit={handleSubmit} className="mt-10">
                {children}
                <div className="mt-10 flex flex-col justify-end gap-4 sm:flex-row">
                    <div className="hidden sm:block">
                        <GhostButton type="button" onClick={backButtonOnClick} disabled={backButtonDisabled}>
                            <div className="flex">
                                <ArrowLeftIcon className="mr-2 h-5 w-5" />
                                Back
                            </div>
                        </GhostButton>
                    </div>
                    <PrimaryButton type="submit" loading={loading} loadingText="Saving...">
                        {buttonText}
                    </PrimaryButton>
                    <div className="flex flex-col sm:hidden">
                        <GhostButton type="button" onClick={backButtonOnClick} disabled={backButtonDisabled}>
                            <div className="flex justify-center">
                                <ArrowLeftIcon className="mr-2 h-5 w-5" />
                                Back
                            </div>
                        </GhostButton>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Form
