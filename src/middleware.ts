import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextRequest, NextResponse } from 'next/server'
import { Database } from './types/schema'

const excludeFromAuth = ['/create']

const excludeFromAuthAfterProfileComplete = ['/onboarding']

export const config = {
    matcher: ['/dashboard/', ...excludeFromAuth]
}

export async function middleware(req: NextRequest) {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient<Database>({ req, res })

    const {
        data: { user }
    } = await supabase.auth.getUser()

    if (user) {
        let { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
        if (profile && profile.full_name && excludeFromAuthAfterProfileComplete.includes(req.nextUrl.pathname)) {
            return NextResponse.redirect(new URL('/dashboard/', req.url))
        }
    }

    if (user && excludeFromAuth.includes(req.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/dashboard/', req.url))
    }

    // if user is not signed in and the current path is not / redirect the user to /
    if (!user && req.nextUrl.pathname !== '/') {
        return NextResponse.redirect(new URL('/', req.url))
    }

    return res
}
