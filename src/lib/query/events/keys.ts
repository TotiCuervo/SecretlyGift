import { Event } from '@/types/events/Event'
import { Profile } from '@/types/profile/Profile'

export const EventKeys = {
    uuid: (uuid: Event['uuid']) => ['event', uuid],
    profile: (profileId: Profile['id']) => ['event', 'profile', profileId]
}
