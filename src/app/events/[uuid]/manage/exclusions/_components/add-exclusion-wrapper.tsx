'use client'
import React, { useState } from 'react'
import AddExclusionModal from '@/components/modal/add-exclusion-modal/add-exclusion-modal'
import { Event } from '@/types/events/Event'
import { AdministrativeParticipantView } from '@/types/participant/AdministrativeParticipantView'

interface IProps {
    event: Event['uuid']
    children: React.ReactNode
    className?: string
    participant: AdministrativeParticipantView
}

export default function AddExclusionWrapper({ event, children, className, participant }: IProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
            <div className={className} onClick={() => setIsModalOpen(true)}>
                {children}
            </div>
            <AddExclusionModal
                participant={participant}
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                event={event}
            />
        </>
    )
}
