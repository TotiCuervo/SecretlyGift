import PrimaryOutlineButton from '@/components/buttons/primary-outline-button'
import { publicEventRoute } from '@/lib/router/routes/events/public-event-route'
import { Event } from '@/types/events/Event'
import { ClipboardIcon } from '@heroicons/react/24/solid'
import React from 'react'

interface IProps {
    event: Event['uuid']
}

export default function ShareButton({ event }: IProps) {
    return <PrimaryOutlineButton size="sm">Share</PrimaryOutlineButton>
}
