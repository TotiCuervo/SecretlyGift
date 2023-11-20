import { Event } from '@/types/events/Event'

export const eventManageRoute = (eventUUID: Event['uuid']) => `/events/${eventUUID}/manage`
