'use client'

import { Event } from '@/types/events/Event'
import WhiteButton from '../buttons/white-button'
import { PencilIcon } from '@heroicons/react/24/outline'
import EventImageChangeModal from '../modal/event-image-change-modal'
import { useState } from 'react'
import useEventUUIDQuery from '@/lib/query/events/uuid/useEventUUIDQuery'

interface IProps {
    uuid: Event['uuid']
}

export default function EventImageChanger({ uuid }: IProps) {
    const { data: event } = useEventUUIDQuery(uuid)
    const [isOpen, setIsOpen] = useState(true)

    return (
        <>
            <EventImageChangeModal isOpen={isOpen} setIsOpen={setIsOpen} uuid={uuid} />
            <div
                className={`relative flex aspect-square w-full items-center justify-center bg-red-400 text-center shadow-sm heropattern-${event?.invite_theme}-red-100`}
            >
                <span className="text-6xl font-semibold text-white drop-shadow-xl sm:text-9xl">
                    {event?.invite_text}
                </span>
                <WhiteButton className="absolute bottom-4 right-4" onClick={() => setIsOpen(true)}>
                    <PencilIcon className="h-6 w-6" />
                </WhiteButton>
            </div>
        </>
    )
}
