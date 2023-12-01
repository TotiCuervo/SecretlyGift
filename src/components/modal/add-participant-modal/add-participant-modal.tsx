import Modal, { ModalProps } from '../modal'
import { Event } from '@/types/events/Event'
import Confetti from '../../misc/confetti'
import Form from './_components/form'
import Success from './_components/success'
import { useEffect, useState } from 'react'

interface IProps extends ModalProps {
    onAddMultiple: () => void
    event: Event['uuid']
}

export interface AddedUser {
    name: string
    email: string
}

export default function AddParticipantModal({ setIsOpen, onAddMultiple, event, ...props }: IProps) {
    const [step, setStep] = useState<'Form' | 'Success'>('Form')
    const [addedUser, setAddedUser] = useState<AddedUser>({ name: '', email: '' })
    const [resetForm, setResetForm] = useState(false)
    const [runConfetti, setRunConfetti] = useState(false)

    useEffect(() => {
        if (props.isOpen) {
            setStep('Form')
            setAddedUser({ name: '', email: '' })
        }
    }, [props.isOpen])

    useEffect(() => {
        if (step === 'Success') {
            setRunConfetti(true)
        }
    }, [step])

    function reset() {
        setResetForm(true)
        setStep('Form')
    }

    const Render = {
        Form: (
            <Form
                isOpen={props.isOpen}
                setIsOpen={setIsOpen}
                event={event}
                setStep={setStep}
                setAddedUser={setAddedUser}
                resetForm={resetForm}
                setResetForm={setResetForm}
            />
        ),
        Success: <Success reset={reset} addedUser={addedUser} setIsOpen={setIsOpen} />
    }

    return (
        <>
            <Modal setIsOpen={setIsOpen} {...props} containerPadding="p-0">
                {Render[step]}
            </Modal>
            {runConfetti && <Confetti run={runConfetti} onConfettiComplete={() => setRunConfetti(false)} />}
        </>
    )
}
