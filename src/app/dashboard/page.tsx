import CreateExchangeCard from './_components/CreateExchangeCard'
import ExchangeDetailCard from './_components/ExchangeDetailCard'
import SupabaseServer from '@/lib/supabase/SupabaseServer'
import { selectEventsWithParticipants } from '@/lib/selectEventWithParticipants'
import { redirect } from 'next/navigation'

async function getData() {
    const supabase = SupabaseServer()
    const {
        data: { session }
    } = await supabase.auth.getSession()

    if (!session) {
        return []
    }

    const { data: profile } = await supabase.from('profiles').select('*').eq('id', session.user.id).single()

    if (profile && !profile.full_name) {
        redirect('/onboarding')
    }

    const { data: events } = await selectEventsWithParticipants(supabase, session.user.id)

    return events
}

export default async function DashboardPage() {
    const data = await getData()
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {data.map((event, index) => (
                <ExchangeDetailCard key={index} />
            ))}
            <CreateExchangeCard />
        </div>
    )
}
