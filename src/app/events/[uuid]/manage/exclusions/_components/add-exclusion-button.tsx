'use client'
import React, { useState } from 'react'
import PrimaryButton from '@/components/buttons/primary-button'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import AddExclusionModal from '@/components/modal/add-exclusion-modal/add-exclusion-modal'
import { Event } from '@/types/events/Event'
import PrimaryOutlineButton from '@/components/buttons/primary-outline-button'

interface IProps {
    event: Event['uuid']
    disabled: boolean
}

export default function AddExclusionButton({ event, disabled }: IProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
            <div className="hidden h-10 w-full sm:flex">
                <PrimaryOutlineButton disabled={disabled} size="full" onClick={() => setIsModalOpen(true)}>
                    Manage Exclusion
                </PrimaryOutlineButton>
            </div>
            <div className="flex h-full sm:hidden">
                <PrimaryButton disabled={disabled} size="full" onClick={() => setIsModalOpen(true)}>
                    Manage Exclusion
                </PrimaryButton>
            </div>

            <AddExclusionModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} event={event} />
        </>
    )
}
