import { Event } from '@/types/events/Event'

export const eventManageSettingsRoute = (eventUUID: Event['uuid']) => `/events/${eventUUID}/manage/settings`
