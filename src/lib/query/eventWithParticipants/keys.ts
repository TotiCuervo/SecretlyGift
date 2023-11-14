import { EventWithParticipants } from '@/types/events/EventWithParticipants'

export const EventWithParticipantsKeys = {
    uuid: (uuid: EventWithParticipants['uuid']) => ['event', uuid]
}
