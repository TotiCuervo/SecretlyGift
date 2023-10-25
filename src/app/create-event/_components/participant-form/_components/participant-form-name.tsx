import React from 'react'

interface ParticipantFormNameProps {
    name: string
    error: boolean
    message: string
    updateName: (value: string) => void
}

export default function ParticipantFormName({ name, error, message, updateName }: ParticipantFormNameProps) {
    return (
        <div className="flex w-full flex-wrap items-center py-2">
            <input
                value={name}
                onChange={(e) => updateName(e.target.value)}
                maxLength={30}
                className={`border-b-1.5 appearance-none bg-transparent text-2xl ${
                    error ? 'border-red-600' : 'border-white'
                } mr-3 w-full px-2 py-2 leading-tight text-white focus:border-green-500 focus:outline-none`}
                type="text"
                placeholder="Naruto Uzumaki"
                aria-label="Full name"
            />
            <p className="w-full text-xs text-white">{30 - name.length}</p>
            {error && <p className="w-full text-sm font-extrabold text-red-600">{message}</p>}
        </div>
    )
}
