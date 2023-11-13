import { useRouter as rt } from 'next/navigation'
import events from './routers/events'

type RouterHook = ReturnType<typeof events>

export default function useRouter() {
    const router = rt()

    const categories = [events]

    return Object.assign({ router }, ...categories.map((category) => category(router))) as RouterHook
}
