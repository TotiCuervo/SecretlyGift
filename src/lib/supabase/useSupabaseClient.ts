import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/schema'

export default function useSupabaseClient() {
    return createClientComponentClient<Database>()
}
