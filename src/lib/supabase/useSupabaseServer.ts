import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/schema'
import { cookies } from 'next/headers'

export default function useSupabaseServer() {
    return createServerComponentClient<Database>({ cookies })
}
