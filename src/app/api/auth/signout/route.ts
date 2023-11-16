import SupabaseRouteHandler from '@/lib/supabase/handlers/SupabaseRouteHandler'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    const supabase = SupabaseRouteHandler()

    const {
        data: { session }
    } = await supabase.auth.getSession()

    if (session) {
        await supabase.auth.signOut()
    }

    return NextResponse.redirect(new URL('/', req.url), {
        status: 302
    })
}
