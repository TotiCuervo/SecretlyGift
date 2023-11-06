import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/schema'
import { cookies } from 'next/headers'

export default function SupabaseServer() {
    return createServerComponentClient<Database>({ cookies })
}
