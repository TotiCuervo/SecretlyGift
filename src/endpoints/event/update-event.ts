import { Event } from '@/types/events/Event'
import { EventUpdate } from '@/types/events/EventUpdate'
import client from '@/utils/client'
import { AxiosResponse } from 'axios'

export async function updateEvent(uuid: Event['uuid'], event: EventUpdate): Promise<AxiosResponse<Event, any>> {
    return client.patch(`/event/${uuid}`, event)
}
