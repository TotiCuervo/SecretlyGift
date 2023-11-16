import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { FormData } from '../join-event-form'
import { EventWithParticipants } from '@/types/events/EventWithParticipants'
import EventCard from '../../event-card'
import Confetti from '@/components/misc/confetti'

interface IProps {
    form: UseFormReturn<FormData, any, undefined>
    event: EventWithParticipants
}

export default function AnonConfirmation({ form, event }: IProps) {
    const { name, email } = form.getValues()
    return (
        <>
            <h1 className="font-display text-4xl font-bold text-gray-800">
                Welcome to {event.name}, <span className=" text-primary-500">{name}!</span>
            </h1>
            <p className="pt-4 text-lg text-gray-600">
                We have sent a confirmation email to <span className="font-bold text-primary-500">{email}</span>. If you
                are not ready to login yet, please login later as your email link may expire.
            </p>
            {event && (
                <div className="flex justify-center pt-4 sm:hidden">
                    <EventCard event={event} />
                </div>
            )}
            <Confetti run />
        </>
    )
}
