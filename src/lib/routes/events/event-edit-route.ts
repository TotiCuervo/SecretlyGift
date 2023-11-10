import { Event } from '@/types/events/Event'

export const EventManageRoute = (eventUUID: Event['uuid']) => `/events/${eventUUID}/manage`
