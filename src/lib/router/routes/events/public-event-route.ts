import { Event } from '@/types/events/Event'

export const publicEventRoute = (eventUUID: Event['uuid']) => `/events/${eventUUID}/join`
