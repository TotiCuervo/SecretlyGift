import { Event } from '@/types/Event'

export const EventKeys = {
    uuid: (uuid: Event['uuid']) => ['event', uuid]
}
