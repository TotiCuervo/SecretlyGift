'use client'
import { Event } from '@/types/events/Event'
import React, { useState } from 'react'
import PrimaryButton from '@/components/buttons/primary-button'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import AddParticipantModal from '@/components/modal/add-participant-modal'
import AddParticipantsSlideover from '@/components/slide-over/add-participants-slideover'

interface IProps {
    event: Event['uuid']
}

export default function AddParticipantButton({ event }: IProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSlideoverOpen, setIsSlideoverOpen] = useState(false)
    return (
        <>
            <div className="hidden sm:flex">
                <PrimaryButton size="sm" onClick={() => setIsModalOpen(true)}>
                    <PlusCircleIcon className="h-6 w-6 text-white" />
                    Add Participants
                </PrimaryButton>
            </div>
            <div className="flex h-full sm:hidden">
                <PrimaryButton size="full" onClick={() => setIsModalOpen(true)}>
                    <PlusCircleIcon className="h-6 w-6 text-white" />
                    Add Participants
                </PrimaryButton>
            </div>

            <AddParticipantModal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                onAddMultiple={() => {
                    setIsModalOpen(false)
                    setIsSlideoverOpen(true)
                }}
            />
            <AddParticipantsSlideover isOpen={isSlideoverOpen} setIsOpen={setIsSlideoverOpen} />
        </>
    )
}
