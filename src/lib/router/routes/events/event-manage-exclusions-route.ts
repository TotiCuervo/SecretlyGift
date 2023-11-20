import { Event } from '@/types/events/Event'

export const eventManageExclusionsRoute = (eventUUID: Event['uuid']) => `/events/${eventUUID}/manage/exclusions`
