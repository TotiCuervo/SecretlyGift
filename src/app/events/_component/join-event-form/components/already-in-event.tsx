'use client'
import React from 'react'
import Header from './header'
import { EventWithParticipants } from '@/types/events/EventWithParticipants'
import { useSessionContext } from '@/context/SessionContext'
import PrimaryButton from '@/components/buttons/primary-button'
import PrimaryOutlineButton from '@/components/buttons/primary-outline-button'
import Confetti from '@/components/misc/confetti'
import { Transition } from '@headlessui/react'

interface IProps {
    event: EventWithParticipants
}

export default function AlreadyInEvent({ event }: IProps) {
    const { profile } = useSessionContext()

    const [run, setRun] = React.useState(false)

    function celebrate() {
        setRun(false)
        setRun(true)
    }

    return (
        <>
            <div className="flex flex-col gap-4">
                <Header
                    title={
                        <>
                            You&apos;re in the party, <span className="text-primary-500">{profile?.full_name}!</span>
                        </>
                    }
                    subtitle="You are already in this event. Go to the event page to see the details, edit your event profile, and much more!"
                    event={event}
                />
                <div className="flex gap-2">
                    <PrimaryButton>Go to event</PrimaryButton>
                    <Transition
                        show={!run}
                        leave="transition duration-1000"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <PrimaryOutlineButton onClick={celebrate}>
                            {!run ? 'Celebrate!' : 'See ya there!'}
                        </PrimaryOutlineButton>
                    </Transition>
                </div>
            </div>
            <Confetti run={run} />
        </>
    )
}
