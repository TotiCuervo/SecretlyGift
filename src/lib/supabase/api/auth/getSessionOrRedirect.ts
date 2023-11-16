import { redirect } from 'next/navigation'
import SupabaseServer from '../../handlers/SupabaseServer'

export default async function getSessionOrRedirect() {
    const supabase = SupabaseServer()
    const {
        data: { session }
    } = await supabase.auth.getSession()

    if (!session) {
        redirect('/')
    }

    return session
}
