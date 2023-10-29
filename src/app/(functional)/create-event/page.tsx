import React from 'react'

import ParticipantForm from './_components/participant-form/participant-form'
import AddParticipantButton from './_components/AddParticipantButton'

export default function page() {
    return (
        <div>
            <h1 className="font-baloo text-2xl font-bold">Step 1: Add People</h1>

            <ParticipantForm index={1} />

            <div className="pb-10 pt-4">
                <AddParticipantButton />
                <button className="active:bounce-sm transition-fast float-right rounded bg-green-400 px-4 py-2 font-bold text-indigo-700 hover:bg-green-500 focus:outline-none">
                    Next
                </button>
            </div>
        </div>
    )
}
