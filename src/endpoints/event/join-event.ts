import { EventJoinParam } from '@/app/api/event/join/route'
import { Participant } from '@/types/participant/Participant'
import client from '@/utils/client'
import { AxiosResponse } from 'axios'

export async function joinEvent(props: EventJoinParam): Promise<AxiosResponse<Participant, any>> {
    return client.post('/event/join', props)
}
