import { SignInWithPasswordlessCredentials, SupabaseClient } from '@supabase/supabase-js'

export default async function signInWithOtp(supabase: SupabaseClient, credentials: SignInWithPasswordlessCredentials) {
    return supabase.auth.signInWithOtp({
        ...credentials,
        options: {
            //@ts-ignore
            emailRedirectTo: location.origin + '/api/auth/callback',
            ...credentials.options
        }
    })
}
