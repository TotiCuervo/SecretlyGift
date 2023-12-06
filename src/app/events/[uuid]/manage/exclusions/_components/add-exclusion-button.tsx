'use client'
import React, { useState } from 'react'
import PrimaryButton from '@/components/buttons/primary-button'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import AddExclusionModal from '@/components/modal/add-exclusion-modal/add-exclusion-modal'

export default function AddExclusionButton() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
            <div className="hidden sm:flex">
                <PrimaryButton size="sm" onClick={() => setIsModalOpen(true)}>
                    <PlusCircleIcon className="h-6 w-6 text-white" />
                    Add Exclusion
                </PrimaryButton>
            </div>
            <div className="flex h-full sm:hidden">
                <PrimaryButton size="full" onClick={() => setIsModalOpen(true)}>
                    <PlusCircleIcon className="h-6 w-6 text-white" />
                    Add Exclusion
                </PrimaryButton>
            </div>

            <AddExclusionModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
        </>
    )
}
