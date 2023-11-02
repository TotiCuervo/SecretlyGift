import useSupabaseClient from './useSupabaseClient'
import useSupabaseServer from './useSupabaseServer'

type SupabaseType = 'client' | 'server'

export default function useSupabase(type: SupabaseType) {
    return type === 'client' ? useSupabaseClient() : useSupabaseServer()
}
