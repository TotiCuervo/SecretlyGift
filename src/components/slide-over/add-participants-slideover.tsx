import SlideOver, { PublicSlideOverProps } from './slide-over'
import React, { useEffect, useState } from 'react'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { z } from 'zod'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import PrimaryButton from '../buttons/primary-button'
import GhostButton from '../buttons/primary-ghost-button'
import { StatusMessage } from '@/types/StatusMessage'
import ErrorAlert from '../alert/error-alert'
import Controller from '../forms/controller'
import TextInput from '../inputs/text-input'
import PrimaryOutlineButton from '../buttons/primary-outline-button'
import PrimaryGhostButton from '../buttons/primary-ghost-button'

interface Participant {
    name: string
    email: string
}

interface FormData {
    participants: Participant[]
}

const schema = z.object({
    participants: z.array(
        z.object({
            name: z.string().min(3, { message: 'Name needs to be more than 3 characters' }),
            email: z.string().email({ message: 'Please enter a valid email' })
        })
    )
})

export default function AddParticipantsSlideover({ setIsOpen, ...props }: PublicSlideOverProps) {
    const {
        handleSubmit,
        control,
        formState: { isSubmitting },
        reset
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            participants: [{ name: '', email: '' }]
        }
    })

    const { fields, append, remove } = useFieldArray<FormData>({
        control,
        name: 'participants'
    })

    const [status, setStatus] = useState<StatusMessage>()

    function onClose() {
        setIsOpen(false)
    }

    function onSubmit(data: FormData) {
        const { participants } = data

        // Process the participants data
        console.log(participants)
    }

    return (
        <SlideOver {...props} setIsOpen={setIsOpen}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex h-full flex-col">
                <div className="flex grow flex-col overflow-y-scroll px-4">
                    <h2 className="font-semibold">Add Participants</h2>
                    <p className="text-sm text-gray-500">
                        Enter the names and emails of the people you want to add to your event.
                    </p>
                    {status && status.type === 'error' && (
                        <div className="mt-4 px-6">
                            <ErrorAlert>{status.message}</ErrorAlert>
                        </div>
                    )}
                    <div className="mt-4 flex flex-col space-y-4 divide-y">
                        {fields.map((participant, index) => (
                            <div key={participant.id} className="flex flex-col gap-4 pt-4 first:pt-0">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold">Participant {index + 1}</h3>
                                    {index > 0 && (
                                        <PrimaryGhostButton type="button" onClick={() => remove(index)}>
                                            Remove
                                        </PrimaryGhostButton>
                                    )}
                                </div>
                                <Controller
                                    name={`participants[${index}].name`}
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: true }}
                                    render={({ field, fieldState }) => (
                                        <TextInput
                                            title={'Name'}
                                            {...field}
                                            error={fieldState?.error?.message}
                                            key={`name-${participant.id}`}
                                            ref={null}
                                            helperText={"Don't worry, they can change this later."}
                                        />
                                    )}
                                />
                                <Controller
                                    name={`participants[${index}].email`}
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: true }}
                                    render={({ field, fieldState }) => (
                                        <TextInput
                                            title={'Email'}
                                            {...field}
                                            error={fieldState?.error?.message}
                                            key={`email-${participant.id}`}
                                            ref={null}
                                        />
                                    )}
                                />

                                <div className="mt-4 flex gap-4">
                                    {index === fields.length - 1 && (
                                        <PrimaryButton type="button" onClick={() => append({ name: '', email: '' })}>
                                            Add Participant
                                        </PrimaryButton>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-4 flex justify-end gap-3 border-t border-gray-300 px-6 py-4">
                    <GhostButton onClick={onClose}>Cancel</GhostButton>
                    <PrimaryButton type="submit" loading={isSubmitting} loadingText="Creating">
                        <div className="flex items-center">
                            <PlusCircleIcon className="h-5 w-5" />
                            <span className="ml-2">Add</span>
                        </div>
                    </PrimaryButton>
                </div>
            </form>
        </SlideOver>
    )
}
