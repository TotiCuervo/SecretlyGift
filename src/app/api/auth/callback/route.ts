import SupabaseRouteHandler from '@/lib/supabase/handlers/SupabaseRouteHandler'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    const supabase = SupabaseRouteHandler()
    const { searchParams } = new URL(req.url)
    const code = searchParams.get('code')
    const redirect = searchParams.get('redirect')

    if (code) {
        await supabase.auth.exchangeCodeForSession(code)
    }

    if (redirect) {
        return NextResponse.redirect(new URL(redirect, req.url))
    }

    return NextResponse.redirect(new URL('/dashboard', req.url))
}
