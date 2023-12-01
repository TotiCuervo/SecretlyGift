import { EventInviteParam } from '@/app/api/event/invite/route'
import { Participant } from '@/types/participant/Participant'
import client from '@/utils/client'
import { AxiosResponse } from 'axios'

export async function inviteToEvent(props: EventInviteParam): Promise<AxiosResponse<Participant, any>> {
    return client.post('/event/invite', props)
}
