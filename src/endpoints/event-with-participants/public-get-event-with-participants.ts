import { Event } from '@/types/events/Event'
import client from '@/utils/client'

export default function publicGetEventWithParticipants(uuid: Event['uuid']) {
    return client.get(`/event-with-participants/${uuid}`)
}
