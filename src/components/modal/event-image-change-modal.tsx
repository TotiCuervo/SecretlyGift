import React, { useEffect, useState } from 'react'
import Modal, { ModalProps } from './modal'
import { z } from 'zod'
import { Control, Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import TextInput from '../inputs/text-input'
import PrimaryButton from '../buttons/primary-button'
import GhostButton from '../buttons/primary-ghost-button'
import { twMerge } from 'tailwind-merge'
import { StatusMessage } from '@/types/StatusMessage'
import ErrorAlert from '../alert/error-alert'
import { Event } from '@/types/events/Event'
import useEventUUIDQuery from '@/lib/query/events/uuid/useEventUUIDQuery'
import { updateEvent } from '@/endpoints/event/update-event'
import useEventUUIDInvalidation from '@/lib/query/events/uuid/useEventUUIDInvalidation'
import { toast } from 'sonner'
import ThemeInput from '../inputs/theme-input'
import BulletGroupInput from '../inputs/bullet-group-input'
import FileInput from '../inputs/file-input'
import { useSessionContext } from '@/context/SessionContext'
import Image from 'next/image'

interface IProps extends ModalProps {
    uuid: Event['uuid']
}

export interface FormData {
    inviteText: string
    inviteTheme: string
    inviteType: 'Text' | 'Image'
    inviteImage: string
}

const schema = z.object({
    inviteText: z.string().min(3, { message: 'Invite text must be more than 3 characters' }),
    inviteTheme: z.string().min(3, { message: 'Invite theme must be more than 3 characters' }),
    inviteType: z.enum(['Text', 'Image']),
    inviteImage: z.string().optional().nullable()
})

const options = ['Text', 'Image']

function TextForm({ control }: { control: Control<FormData> }) {
    return (
        <>
            <div className="mb-6">
                <Controller
                    name="inviteText"
                    control={control}
                    defaultValue=""
                    rules={{ required: true }}
                    render={({ field, fieldState }) => (
                        <TextInput
                            title={'Text'}
                            {...field}
                            error={fieldState?.error?.message}
                            key={'inviteText'}
                            ref={null}
                        />
                    )}
                />
            </div>
            <Controller
                name="inviteTheme"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                    <ThemeInput
                        title={'Theme'}
                        {...field}
                        error={fieldState?.error?.message}
                        key={'inviteTheme'}
                        ref={null}
                    />
                )}
            />
        </>
    )
}

function ImageForm({
    control,
    event,
    inviteImage
}: {
    control: Control<FormData>
    event: Event['uuid']
    inviteImage: string
}) {
    return (
        <>
            <Controller
                name="inviteImage"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                    <FileInput
                        title={'Image'}
                        {...field}
                        error={fieldState?.error?.message}
                        key={'Image'}
                        ref={null}
                        bucket="invite-covers"
                        pathLeader={`public/image-covers/${event}`}
                    />
                )}
            />
            <Image unoptimized alt="cover-image" src={inviteImage} width={200} height={200} fill />
            {inviteImage}
        </>
    )
}

export default function EventImageChangeModal({ uuid, setIsOpen, ...props }: IProps) {
    const { data: event } = useEventUUIDQuery(uuid)
    const invalidate = useEventUUIDInvalidation()

    const {
        handleSubmit,
        control,
        formState: { isSubmitting },
        watch,
        reset
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            inviteText: event?.invite_text || '',
            inviteTheme: event?.invite_theme || '',
            inviteImage: ''
        }
    })

    const [status, setStatus] = useState<StatusMessage>()

    const watchInviteType = watch('inviteType')
    const watchInviteImage = watch('inviteImage')

    useEffect(() => {
        if (props.isOpen) {
            reset()
        }
    }, [props.isOpen])

    useEffect(() => {
        if (event) {
            reset({
                inviteText: event?.invite_text || '',
                inviteTheme: event?.invite_theme || ''
            })
        }
    }, [event])

    function onClose() {
        setIsOpen(false)
    }

    async function onSubmit(data: FormData) {
        setStatus(undefined)

        try {
            const updatedEvent = await updateEvent(uuid, {
                invite_text: data.inviteText,
                invite_theme: data.inviteTheme
            })

            invalidate(uuid)
            setIsOpen(false)
            toast.success('Event updated successfully')
        } catch (error) {
            setStatus({ type: 'error', message: 'Sorry, something went wrong. Please try again.' })
        }
    }

    return (
        <Modal setIsOpen={setIsOpen} {...props} containerPadding="p-0">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="px-6 pt-6 text-center">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Event Invite Card</h3>
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
                                name="inviteType"
                                control={control}
                                defaultValue="Text"
                                rules={{ required: true }}
                                render={({ field, fieldState }) => (
                                    <BulletGroupInput
                                        title={'Invite Type'}
                                        {...field}
                                        error={fieldState?.error?.message}
                                        key={'inviteType'}
                                        ref={null}
                                        options={options}
                                    />
                                )}
                            />
                        </div>
                        {watchInviteType === 'Text' ? (
                            <TextForm control={control} />
                        ) : (
                            <ImageForm control={control} event={uuid} inviteImage={watchInviteImage} />
                        )}
                    </div>
                    <div className="flex justify-end gap-3 px-6 py-4">
                        <GhostButton onClick={onClose}>Cancel</GhostButton>
                        <PrimaryButton type="submit" loading={isSubmitting} loadingText="Saving...">
                            <div className="flex items-center">
                                <span>Save</span>
                            </div>
                        </PrimaryButton>
                    </div>
                </div>
            </form>
        </Modal>
    )
}
