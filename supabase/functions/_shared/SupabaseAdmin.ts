import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

export default function SupabaseAdmin() {
    return createClient(Deno.env.get('PUBLIC_SUPABASE_URL'), Deno.env.get('SERVICE_ROLE_KEY'))
}
