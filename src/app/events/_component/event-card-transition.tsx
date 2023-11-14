'use client'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import EventCard from './event-card'
import { EventWithParticipants } from '@/types/events/EventWithParticipants'
import useWindowSize from 'react-use/lib/useWindowSize'

interface IProps {
    event: EventWithParticipants
}

export default function EventCardTransition({ event }: IProps) {
    const { width: windowWidth } = useWindowSize()

    const [width, setWidth] = useState<number>()

    useEffect(() => {
        setWidth(windowWidth)
    }, [])
    return (
        <motion.div
            animate={{ x: [width, 0], rotate: [50, 0], opacity: 1 }}
            initial={{ x: width, rotate: 50, opacity: 0 }}
            transition={{ duration: 1.5, type: 'spring', bounce: 0.25 }}
        >
            <EventCard event={event} />
        </motion.div>
    )
}
