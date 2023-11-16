import { EventJoinNewUserParam } from '@/app/api/event/join/new-user/route'
import { Participant } from '@/types/participant/Participant'
import client from '@/utils/client'
import { AxiosResponse } from 'axios'

export async function joinEventWithNewUser(props: EventJoinNewUserParam): Promise<AxiosResponse<Participant, any>> {
    return client.post('/event/join/new-user', props)
}
