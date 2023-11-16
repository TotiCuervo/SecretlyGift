import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { FormData } from '../join-event-form'
import { EventWithParticipants } from '@/types/events/EventWithParticipants'
import Confetti from '@/components/misc/confetti'
import PrimaryButton from '@/components/buttons/primary-button'

interface IProps {
    form: UseFormReturn<FormData, any, undefined>
    event: EventWithParticipants
}

export default function AuthConfirmation({ form, event }: IProps) {
    const { name } = form.getValues()

    return (
        <div className="flex flex-col gap-4">
            <h1 className="font-display text-4xl font-bold text-gray-800">
                <span className=" text-primary-500">{name}!</span> You've been added to {event.name}!
            </h1>
            <p className="text-lg text-gray-600">
                Are you ready? Go to the event to get draw your name, edit your event profile, and more!
            </p>
            <div>
                <PrimaryButton>Go to Event</PrimaryButton>
            </div>
            <Confetti run />
        </div>
    )
}
