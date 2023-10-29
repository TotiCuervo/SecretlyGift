'use client'
import React from 'react'
import ParticipantFormEmail from './_components/participant-form-email'
import ParticipantFormName from './_components/participant-form-name'

// Import your React components (e.g., ParticipantFormName and ParticipantFormEmail)

interface IProps {
    index: number
}

export default function ParticipantForm({ index }: IProps) {
    const name = '' // Replace with your data
    const email = '' // Replace with your data

    const updateParticipantName = (value: any) => {
        // Add your logic to update the name here
    }

    const updateParticipantEmail = (value: any) => {
        // Add your logic to update the email here
    }

    return (
        <div className="w-full pt-4">
            <span className="font-baloo text-2xl font-bold">
                Person {index + 1}
                {index > 2 && (
                    <button
                        onClick={() => {
                            // Add your deleteParticipant logic here
                        }}
                        className="font-baloo active:bounce-sm cursor-pointer bg-transparent text-xl font-bold text-red-600 hover:text-red-700 focus:outline-none"
                    >
                        Delete
                    </button>
                )}
            </span>

            <form className="flex w-full flex-wrap">
                <div className="w-full p-2 sm:w-2/4">
                    <label className="block text-xs font-bold uppercase tracking-wide text-white">Name</label>
                    <ParticipantFormName name={name} updateName={updateParticipantName} error={false} message={''} />
                </div>
                <div className="w-full p-2 sm:w-2/4">
                    <label className="block text-xs font-bold uppercase tracking-wide text-white">Email</label>
                    <ParticipantFormEmail
                        email={email}
                        updateEmail={updateParticipantEmail}
                        error={false}
                        message={''}
                    />
                </div>
            </form>
        </div>
    )
}
