import { Event } from '@/types/events/Event'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'
import { eventManageRoute } from '../routes/events/event-edit-route'

export default function events(router: AppRouterInstance) {
    function goToEventManage(eventUUID: Event['uuid']) {
        return router.push(eventManageRoute(eventUUID))
    }

    return {
        goToEventManage
    }
}
