import { Event } from '@/types/Event'
import { EventInsert } from '@/types/EventInsert'
import client from '@/utils/client'
import { AxiosResponse } from 'axios'

export async function createEvent(event: EventInsert): Promise<AxiosResponse<Event, any>> {
    return client.post('/event', event)
}
