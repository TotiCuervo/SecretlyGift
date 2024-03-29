import { createClient } from '@supabase/supabase-js'

export default function SupabaseEdge() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL as string,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
    )
}
