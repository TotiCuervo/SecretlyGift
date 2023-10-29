import React from 'react'

interface ParticipantFormEmailProps {
    email: string
    error: boolean
    message: string
    updateEmail: (value: string) => void
}

export default function ParticipantFormEmail({ email, error, message, updateEmail }: ParticipantFormEmailProps) {
    return (
        <div className="flex w-full flex-wrap items-center py-2">
            <input
                value={email}
                onChange={(e) => updateEmail(e.target.value)}
                className={`w-full appearance-none text-2xl ${
                    error ? 'border-red-600' : 'border-white'
                } border-b-1.5 mr-3 w-full bg-transparent px-2 py-2 leading-tight text-white focus:border-green-500 focus:outline-none`}
                type="text"
                placeholder="RamenLover3000@hokage.com"
                aria-label="Full name"
            />
            {error && <p className="w-full pt-2 text-sm font-extrabold text-red-600">{message}</p>}
        </div>
    )
}
