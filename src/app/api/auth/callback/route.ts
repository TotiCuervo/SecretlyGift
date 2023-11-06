import SupabaseRouteHandler from '@/lib/supabase/SupabaseRouteHandler'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    const supabase = SupabaseRouteHandler()
    const { searchParams } = new URL(req.url)
    const code = searchParams.get('code')

    if (code) {
        await supabase.auth.exchangeCodeForSession(code)
    }

    return NextResponse.redirect(new URL('/dashboard', req.url))
}
