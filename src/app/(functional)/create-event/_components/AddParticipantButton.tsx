'use client'
import React from 'react'

interface AddParticipantButtonProps {}

export default function AddParticipantButton({}: AddParticipantButtonProps) {
    return (
        <button className="fa-1x active:bounce-sm transition-fast cursor-pointer bg-transparent text-green-400 hover:text-green-500 focus:outline-none">
            <i className="fas fa-plus-circle"></i>
            <span className="font-baloo text-white">Add Person</span>
        </button>
    )
}
