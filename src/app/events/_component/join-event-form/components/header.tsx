import { EventWithParticipants } from '@/types/events/EventWithParticipants'
import EventCardTransition from '../../event-card-transition'
import EventCard from '../../event-card'

interface IProps {
    title: string | React.ReactNode
    subtitle: string | React.ReactNode
    event?: EventWithParticipants
}

export default function Header({ title, subtitle, event }: IProps) {
    return (
        <>
            <h1 className="font-display text-4xl font-black tracking-wide text-gray-800">{title}</h1>
            <p className="text-lg text-gray-600">{subtitle}</p>
            {event && (
                <div className="flex sm:hidden">
                    <EventCardTransition>
                        <EventCard event={event} />
                    </EventCardTransition>
                </div>
            )}
        </>
    )
}
