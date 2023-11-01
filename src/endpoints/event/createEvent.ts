import { EventInsert } from '@/types/Event copy'
import client from '@/utils/client'

export async function createEvent(event: EventInsert) {
    return client.post('/event', event)
}
