import React, { useEffect, useState } from 'react'
import Modal, { ModalProps } from './modal'
import { GiftIcon } from '@heroicons/react/24/outline'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import TextInput from '../inputs/text-input'
import PrimaryButton from '../buttons/primary-button'
import GhostButton from '../buttons/primary-ghost-button'
import DatepickerPicker from '../inputs/datepicker-input/datepicker-picker'
import { twMerge } from 'tailwind-merge'
import { createEvent } from '@/endpoints/event/createEvent'
import { StatusMessage } from '@/types/StatusMessage'
import ErrorAlert from '../alert/error-alert'
import useRouter from '@/lib/router/useRouter'

export interface FormData {
    eventName: string
    eventDate: Date
}

const schema = z.object({
    eventName: z.string().min(3, { message: 'Event needs to be more than 3 characters' }),
    eventDate: z.date().refine(
        (val) => {
            const now = new Date()
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
            return val >= today
        },
        { message: 'Event date must not be in the past' }
    )
})

export default function CreateEventModal({ setIsOpen, ...props }: ModalProps) {
    const { goToEventManage } = useRouter()

    const {
        handleSubmit,
        control,
        formState: { isSubmitting },
        reset
    } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    const [openDatePicker, setOpenDatePicker] = useState(false)
    const [status, setStatus] = useState<StatusMessage>()

    useEffect(() => {
        if (props.isOpen) {
            reset()
        }
    }, [props.isOpen])

    function onClose() {
        setIsOpen(false)
    }

    function onSubmit(data: FormData) {
        const { eventName, eventDate } = data

        return createEvent({
            name: eventName,
            date: eventDate.toLocaleDateString()
        })
            .then((res) => {
                goToEventManage(res.data.uuid)
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Something went wrong, please try again later.'
                })
            })
    }

    return (
        <Modal setIsOpen={setIsOpen} {...props} containerPadding="p-0">
            <div className={twMerge(openDatePicker ? 'h-auto' : 'hidden h-0 overflow-hidden')}>
                <Controller
                    name="eventDate"
                    control={control}
                    rules={{ required: true }}
                    render={({ field, fieldState }) => (
                        <>
                            <DatepickerPicker
                                {...field}
                                onChange={(value) => {
                                    field.onChange(value)
                                    setOpenDatePicker(false)
                                }}
                                ref={null}
                            />
                        </>
                    )}
                />
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={twMerge(openDatePicker ? 'hidden h-0 overflow-hidden' : 'h-auto')}
            >
                <div className="px-6 pt-6 text-center">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Create a Gift Exchange</h3>
                    <div className="px-7 py-3">
                        <p className="text-sm text-gray-500">
                            Fill in the event details, invite your friends or colleagues, and let the fun begin!
                        </p>
                    </div>
                </div>
                {status && status.type === 'error' && (
                    <div className="mt-4 px-6">
                        <ErrorAlert>{status.message}</ErrorAlert>
                    </div>
                )}
                <div className="mt-4">
                    <div className="border-b border-gray-300 px-6 pb-6">
                        <div className="mb-6">
                            <Controller
                                name="eventName"
                                control={control}
                                defaultValue=""
                                rules={{ required: true }}
                                render={({ field, fieldState }) => (
                                    <TextInput
                                        title={'Name'}
                                        {...field}
                                        error={fieldState?.error?.message}
                                        key={'eventName'}
                                        ref={null}
                                    />
                                )}
                            />
                        </div>
                        <Controller
                            name="eventDate"
                            control={control}
                            rules={{ required: true }}
                            render={({ field, fieldState }) => (
                                <TextInput
                                    title={'Date'}
                                    {...field}
                                    value={field.value?.toLocaleDateString('en-us', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                    error={fieldState?.error?.message}
                                    onClick={() => setOpenDatePicker(true)}
                                    key={'eventName'}
                                    ref={null}
                                    onFocus={() => setOpenDatePicker(true)}
                                />
                            )}
                        />
                    </div>
                    <div className="flex justify-end gap-3 px-6 py-4">
                        <GhostButton onClick={onClose}>Cancel</GhostButton>
                        <PrimaryButton type="submit" loading={isSubmitting} loadingText="Creating">
                            <div className="flex items-center">
                                <GiftIcon className="h-5 w-5" />
                                <span className="ml-2">Create</span>
                            </div>
                        </PrimaryButton>
                    </div>
                </div>
            </form>
        </Modal>
    )
}
