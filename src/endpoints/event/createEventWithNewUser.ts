import { Event } from '@/types/events/Event'
import { EventInsert } from '@/types/events/EventInsert'
import client from '@/utils/client'
import { AxiosResponse } from 'axios'

interface UserEmailAndName {
    email: string
    name: string
}

export async function createEventWithNewUser(
    event: EventInsert,
    user: UserEmailAndName
): Promise<AxiosResponse<Event, any>> {
    return client.post('/event/withnewuser', {
        event,
        user
    })
}
