'use client'

import ErrorAlert from '@/components/alert/error-alert'
import PrimaryButton from '@/components/buttons/primary-button'
import Controller from '@/components/forms/controller'
import DatepickerInput from '@/components/inputs/datepicker-input/datepicker-input'
import TextInput from '@/components/inputs/text-input'
import { updateEvent } from '@/endpoints/event/update-event'
import useEventUUIDInvalidation from '@/lib/query/events/uuid/useEventUUIDInvalidation'
import useEventUUIDQuery from '@/lib/query/events/uuid/useEventUUIDQuery'
import { StatusMessage } from '@/types/StatusMessage'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'
import TextArea from '@/components/inputs/text-area'
import MoneyInput from '@/components/inputs/money-input'
import { Event } from '@/types/events/Event'
import InviteLinkButton from './invite-link-button'
import EventImageChanger from '@/components/inputs/event-image-changer'

interface IProps {
    uuid: Event['uuid']
}

interface FormData {
    name: string
    date: Date
    gift_amount: number | null
    description: string | null
}

const schema = z.object({
    name: z.string().min(3, { message: 'Event needs to be more than 3 characters' }),
    date: z.date().refine(
        (val) => {
            const now = new Date()
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
            return val >= today
        },
        { message: 'Event date must not be in the past' }
    ),
    gift_amount: z.coerce
        .number()
        .int()
        .min(0, { message: 'Gift amount must be a positive number' })
        .gte(0, { message: 'Gift amount must be a positive number' })
        .optional()
        .nullable(),
    description: z
        .string()
        .min(3, { message: 'Description needs to be more than 3 characters' })
        .max(500, { message: 'Description needs to be less than 500 characters' })
        .optional()
        .nullable()
})

export default function EventEditForm({ uuid }: IProps) {
    const { data: event } = useEventUUIDQuery(uuid)
    const invalidate = useEventUUIDInvalidation()

    const [status, setStatus] = useState<StatusMessage>()

    const {
        handleSubmit,
        control,
        formState: { isSubmitting },
        reset
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: event?.name,
            date: event?.date ? new Date(event.date) : new Date(),
            gift_amount: event?.gift_amount,
            description: event?.description
        }
    })

    useEffect(() => {
        reset({
            name: event?.name,
            date: event?.date ? new Date(event.date) : new Date(),
            gift_amount: event?.gift_amount,
            description: event?.description
        })
    }, [event])

    async function onSubmit(data: FormData) {
        setStatus(undefined)

        try {
            const updatedEvent = await updateEvent(uuid, {
                date: data.date.toLocaleDateString(),
                name: data.name,
                gift_amount: data.gift_amount,
                description: data.description
            })

            invalidate(uuid)
            toast.success('Event updated successfully')
        } catch (error) {
            setStatus({ type: 'error', message: 'Sorry, something went wrong. Please try again.' })
        }
    }

    return (
        <div className="flex flex-col gap-8 md:flex-row">
            <form className="w-full md:w-1/2" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-1 flex-col gap-4">
                    {status && status.type === 'error' && (
                        <div className="mt-4 px-6">
                            <ErrorAlert>{status.message}</ErrorAlert>
                        </div>
                    )}
                    <Controller
                        name="name"
                        control={control}
                        rules={{ required: true }}
                        render={({ field, fieldState }) => (
                            <TextInput title={'Name'} {...field} error={fieldState?.error?.message} key={'name'} />
                        )}
                    />
                    <div className="flex w-full flex-col gap-2 md:hidden">
                        <EventImageChanger uuid={uuid} />
                        <div>
                            <InviteLinkButton event={uuid} />
                        </div>
                    </div>
                    <Controller
                        name="date"
                        control={control}
                        rules={{ required: true }}
                        render={({ field, fieldState }) => (
                            <DatepickerInput
                                title={'Date of Event'}
                                {...field}
                                error={fieldState?.error?.message}
                                key={'date'}
                            />
                        )}
                    />
                    <Controller
                        name="gift_amount"
                        control={control}
                        rules={{ required: true }}
                        render={({ field, fieldState }) => (
                            <MoneyInput
                                title={'Gift limit'}
                                {...field}
                                error={fieldState?.error?.message}
                                key={'gift_amount'}
                                onChange={(e) => {
                                    field.onChange(e.target.valueAsNumber)
                                }}
                            />
                        )}
                    />
                    <Controller
                        name="description"
                        control={control}
                        rules={{ required: false }}
                        render={({ field, fieldState }) => (
                            <TextArea
                                title={'Description'}
                                {...field}
                                error={fieldState?.error?.message}
                                key={'description'}
                            />
                        )}
                    />
                    <div className="flex w-full justify-end">
                        <div>
                            <PrimaryButton type="submit" loading={isSubmitting} loadingText="Saving...">
                                Save
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </form>
            <div className="hidden w-1/2 flex-col gap-2 md:flex">
                <EventImageChanger uuid={uuid} />
                <div>
                    <InviteLinkButton event={uuid} />
                </div>
            </div>
        </div>
    )
}
