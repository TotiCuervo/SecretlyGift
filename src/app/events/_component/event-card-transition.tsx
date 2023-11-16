'use client'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import useWindowSize from 'react-use/lib/useWindowSize'

interface IProps {
    children: React.ReactNode
}

export default function EventCardTransition({ children }: IProps) {
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
            className="flex w-full items-center justify-center"
        >
            {children}
        </motion.div>
    )
}
