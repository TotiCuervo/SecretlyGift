'use client'
import EventPreview from './EventPreview'
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'

interface IProps {
    userEmail: string
    userName: string
    eventName: string
    eventDate: Date
}

export default function Confirmation({ userEmail, userName, eventName, eventDate }: IProps) {
    const { width, height } = useWindowSize()

    return (
        <>
            <div className="flex h-screen flex-col items-center">
                <h1 className="mb-8 text-4xl font-bold text-primary-700">Congratulations, {userName}!</h1>
                <p className="mb-8 text-lg">Please check your email ({userEmail}) to get started!</p>
                <EventPreview eventName={eventName} eventDate={eventDate} userName={userName} />
            </div>
            <Confetti numberOfPieces={400} width={width} height={height} run={true} recycle={false} />
        </>
    )
}
