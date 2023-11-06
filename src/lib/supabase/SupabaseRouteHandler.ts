import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export default function SupabaseRouteHandler() {
    const cookieStore = cookies()
    return createRouteHandlerClient({ cookies: () => cookieStore })
}
