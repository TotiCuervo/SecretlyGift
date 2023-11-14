import { Profile as ProfileSelect } from '@/lib/select/Profile'
import { Profile } from '@/types/profile/Profile'
import { Database } from '@/types/schema'
import { PostgrestMaybeSingleResponse, PostgrestSingleResponse, SupabaseClient } from '@supabase/supabase-js'

export default async function fetchProfile(supabase: SupabaseClient, id: Profile['id']) {
    return supabase.from('profiles').select(ProfileSelect).eq('id', id).single()
}
