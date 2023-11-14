import { SupabaseClient } from '@supabase/supabase-js'

export default async function getSession(supabase: SupabaseClient) {
    return supabase.auth.getSession
}
