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
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'

interface IProps {
    params: {
        uuid: string
    }
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
    gift_amount: z.number().int().min(0, { message: 'Gift amount must be a positive number' }).optional(),
    description: z.string().min(3, { message: 'Description needs to be more than 3 characters' }).optional()
})

export default function Page({ params }: IProps) {
    const { uuid } = params

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

    async function onSubmit(data: FormData) {
        setStatus(undefined)

        try {
            const updatedEvent = await updateEvent(uuid, {
                name: data.name,
                date: data.date.toLocaleDateString()
            })

            invalidate(uuid)
            toast.success('Event updated successfully')
        } catch (error) {
            setStatus({ type: 'error', message: 'Sorry, something went wrong. Please try again.' })
        }
    }

    return (
        <form className="card" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="font-semibold">Event</h2>
            <div className="flex flex-col gap-4 pt-4">
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
                    name="description"
                    control={control}
                    rules={{ required: false }}
                    render={({ field, fieldState }) => (
                        <TextInput
                            title={'Description'}
                            {...field}
                            error={fieldState?.error?.message}
                            key={'description'}
                        />
                    )}
                />
                <Controller
                    name="gift_amount"
                    control={control}
                    rules={{ required: true }}
                    render={({ field, fieldState }) => (
                        <TextInput
                            title={'Gift limit'}
                            {...field}
                            error={fieldState?.error?.message}
                            key={'gift_amount'}
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
    )
}
