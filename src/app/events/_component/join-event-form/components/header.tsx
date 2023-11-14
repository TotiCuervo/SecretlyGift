import { EventWithParticipants } from '@/types/events/EventWithParticipants'
import EventCardTransition from '../../event-card-transition'

interface IProps {
    title: string
    subtitle: string
    event?: EventWithParticipants
}

export default function Header({ title, subtitle, event }: IProps) {
    return (
        <>
            <h1 className="text-4xl font-bold text-gray-800">{title}</h1>
            <p className="text-lg text-gray-600">{subtitle}</p>
            {event && (
                <div className="flex sm:hidden">
                    <EventCardTransition event={event} />
                </div>
            )}
        </>
    )
}
