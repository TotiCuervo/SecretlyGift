import { Profile } from '@/types/Profile'
import { Database } from '@/types/schema'
import { SupabaseClient } from '@supabase/supabase-js'

export default async function fetchCheckIfProfileExists(supabase: SupabaseClient, email: Profile['email']) {
    const { count, error } = await supabase
        .from<'profiles', Database>('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('email', email)
    return { count, error }
}
