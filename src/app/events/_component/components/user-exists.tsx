import React from 'react'
import Header from './header'
import PrimaryButton from '@/components/buttons/primary-button'
import GhostButton from '@/components/buttons/ghost-button'
import { FormState } from '../join-event-form'

interface IProps {
    setState: React.Dispatch<React.SetStateAction<FormState>>
}

export default function UserExists({ setState }: IProps) {
    return (
        <div className="flex flex-col gap-4">
            <Header
                title="Looks like this email already exists!"
                subtitle="If this is you, we can send you a confirmation email to join the event."
            />
            <div className="flex flex-col gap-4">
                <div>
                    <PrimaryButton>Send Confirmation</PrimaryButton>
                </div>
                <div>
                    <GhostButton
                        onClick={() => {
                            setState('Form')
                        }}
                    >
                        Not you? Go back and change email.
                    </GhostButton>
                </div>
            </div>
        </div>
    )
}
