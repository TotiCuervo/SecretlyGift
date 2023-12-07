import { UpdateEventBody } from '@/app/api/event/exclusions/update/route'
import { Event } from '@/types/events/Event'
import client from '@/utils/client'
import { AxiosResponse } from 'axios'

export async function updateExclusions({ ...props }: UpdateEventBody): Promise<AxiosResponse<Event, any>> {
    return client.post(`/event/exclusions/update`, props)
}
