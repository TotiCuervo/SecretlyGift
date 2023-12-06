import React, { useEffect, useState } from 'react'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import PrimaryButton from '../../../buttons/primary-button'
import GhostButton from '../../../buttons/primary-ghost-button'
import { StatusMessage } from '@/types/StatusMessage'
import ErrorAlert from '../../../alert/error-alert'
import Controller from '../../../forms/controller'
import TextInput from '../../../inputs/text-input'
import { inviteToEvent } from '@/endpoints/event/invite-to-event'
import { Event } from '@/types/events/Event'
import { AxiosError } from 'axios'
import { AddedUser } from '../add-exclusion-modal'
import useAdministrativeParticipantsInvalidation from '@/lib/query/participants/administrative/useParticipantsByEventQueryInvalidation'

interface FormData {
    name: string
    email: string
}

const schema = z.object({
    name: z.string().min(3, { message: 'Name needs to be more than 3 characters' }),
    email: z.string().email({ message: 'Please enter a valid email' })
})

interface FormProps {
    isOpen: boolean
    event: Event['uuid']
    setIsOpen: (isOpen: boolean) => void
    setStep: (step: 'Form' | 'Success') => void
    setAddedUser: (user: AddedUser) => void
    resetForm: boolean
    setResetForm: (reset: boolean) => void
}

export default function Form({ isOpen, setIsOpen, event, setStep, setAddedUser, resetForm, setResetForm }: FormProps) {
    const {
        handleSubmit,
        control,
        formState: { isSubmitting },
        reset
    } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    const invalidate = useAdministrativeParticipantsInvalidation()

    const [status, setStatus] = useState<StatusMessage>()

    useEffect(() => {
        if (isOpen) {
            reset()
        }
    }, [isOpen])

    useEffect(() => {
        if (resetForm) {
            reset()
            setResetForm(false)
        }
    }, [resetForm])

    function onClose() {
        setIsOpen(false)
    }

    async function onSubmit(data: FormData) {
        const { name, email } = data

        try {
            const res = await inviteToEvent({
                name,
                email,
                event
            })
            if (res.status === 200) {
                setAddedUser({ name, email })
                invalidate(event)
                setStep('Success')
            }
        } catch (err: any) {
            const axiosError = err as AxiosError<any>

            if (axiosError.response?.status === 500 && axiosError.response?.data?.error) {
                return setStatus({
                    type: 'error',
                    message: axiosError.response.data.error
                })
            }

            setStatus({
                type: 'error',
                message: "Something went wrong, we couldn't add that person. Please try again."
            })
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="px-6 pt-6 text-center">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Add a Participant</h3>
                <div className="px-7 py-3">
                    <p className="text-sm text-gray-500">
                        Enter the name and email of the person you want to add to your event.
                    </p>
                </div>
            </div>
            {status && status.type === 'error' && (
                <div className="mt-4 px-6">
                    <ErrorAlert>{status.message}</ErrorAlert>
                </div>
            )}
            <div className="mt-4">
                <div className="px-6 pb-6">
                    <div className="flex flex-col gap-4">
                        <Controller
                            name="name"
                            control={control}
                            defaultValue=""
                            rules={{ required: true }}
                            render={({ field, fieldState }) => (
                                <TextInput
                                    title={'Name'}
                                    {...field}
                                    error={fieldState?.error?.message}
                                    key={'name'}
                                    ref={null}
                                    helperText={"Don't worry, they can change this later."}
                                />
                            )}
                        />
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            rules={{ required: true }}
                            render={({ field, fieldState }) => (
                                <TextInput
                                    title={'Email'}
                                    {...field}
                                    error={fieldState?.error?.message}
                                    key={'email'}
                                    ref={null}
                                />
                            )}
                        />
                    </div>
                </div>
                <div className="flex justify-end border-t border-gray-300 px-6 py-4">
                    {/* TODO: Add Multiple */}
                    {/* <PrimaryOutlineButton
                            onClick={() => {
                                onAddMultiple()
                            }}
                            type="button"
                        >
                            Add Multiple
                        </PrimaryOutlineButton> */}
                    <div className="flex justify-end gap-3">
                        <GhostButton onClick={onClose}>Cancel</GhostButton>
                        <PrimaryButton type="submit" loading={isSubmitting} loadingText="Adding...">
                            <div className="flex items-center">
                                <PlusCircleIcon className="h-5 w-5" />
                                <span className="ml-2">Add</span>
                            </div>
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </form>
    )
}
