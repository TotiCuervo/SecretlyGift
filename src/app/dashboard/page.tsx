import CreateExchangeCard from './_components/CreateExchangeCard'
import ExchangeDetailCard from './_components/ExchangeDetailCard'
import SupabaseServer from '@/lib/supabase/handlers/SupabaseServer'
import { fetchDashboardEvents } from '@/lib/supabase/api/events/fetch/fetchDashboardEvents'
import { redirect } from 'next/navigation'
import fetchProfile from '@/lib/supabase/api/profiles/fetch/fetchProfile'
import { Profile } from '@/types/Profile'
import getSessionOrRedirect from '@/lib/supabase/api/auth/getSessionOrRedirect'

async function getData() {
    const supabase = SupabaseServer()
    const session = await getSessionOrRedirect()

    const { data: profile } = (await fetchProfile(supabase, session.user.id)) as { data: Profile }

    if (profile && !profile.full_name) {
        redirect('/onboarding')
    }

    const { data: events, error } = await fetchDashboardEvents(supabase, session.user.id)
    return events
}

export default async function DashboardPage() {
    const data = await getData()
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {data.map((event, index) => (
                <ExchangeDetailCard key={index} event={event} />
            ))}
            <CreateExchangeCard />
        </div>
    )
}
