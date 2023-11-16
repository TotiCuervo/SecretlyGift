import { SignInWithPasswordlessCredentials, SupabaseClient } from '@supabase/supabase-js'

export default async function signInWithOtpRedirect(
    supabase: SupabaseClient,
    redirect: string,
    credentials: SignInWithPasswordlessCredentials
) {
    return supabase.auth.signInWithOtp({
        ...credentials,
        options: {
            //@ts-ignore
            emailRedirectTo: location.origin + `/api/auth/callback?redirect=${redirect}&`,
            ...credentials.options
        }
    })
}
