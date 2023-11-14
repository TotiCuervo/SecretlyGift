'use client'

import React, { useContext, ReactNode, useState, useEffect, useCallback } from 'react'
import { Session, SupabaseClient } from '@supabase/supabase-js'
import { Database } from '@/types/schema'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Profile } from '@/types/profile/Profile'
import { useRouter } from 'next/navigation'

interface IContextProps {
    children: ReactNode
}

export interface SessionContextType {
    session: Session | null
    supabase: SupabaseClient<Database>
    profile: Profile | undefined
    setProfile: React.Dispatch<React.SetStateAction<Profile | undefined>>
    loading: boolean
    logout: () => Promise<void>
}

export const SessionContext = React.createContext<SessionContextType>({} as SessionContextType)

export function SessionProvider({ children }: IContextProps) {
    const router = useRouter()

    const supabase = createClientComponentClient<Database>()

    const [session, setSession] = useState<Session | null>(null)
    const [profile, setProfile] = useState<Profile>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getSession()
    }, [])

    useEffect(() => {
        if (session?.user) {
            getProfile()
        }
    }, [supabase, session])

    useEffect(() => {
        if (!profile) {
            return
        }

        const channel = supabase
            .channel('any')
            .on(
                'postgres_changes',
                { event: 'UPDATE', schema: 'public', table: 'profiles', filter: `id=eq.${profile.id}` },
                (payload) => {
                    const { new: newProfile } = payload
                    setProfile(newProfile as Profile)
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [profile, supabase])

    const getProfile = useCallback(async () => {
        try {
            setLoading(true)

            let { data, error, status } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session!.user?.id)
                .single()

            if (error && status !== 406) {
                throw error
            }

            if (data) {
                setProfile({
                    ...data,
                    id: session!.user!.id
                })
            }
        } catch (error) {
            router.push('/')
        } finally {
            setLoading(false)
        }
    }, [session?.user, supabase])

    async function getSession() {
        const {
            data: { session }
        } = await supabase.auth.getSession()

        setSession(session)
    }

    async function handleLogout() {
        await supabase.auth.signOut()
        router.refresh()
        getSession()
    }

    const contextValue = {
        session,
        supabase,
        profile,
        loading,
        setProfile,
        logout: handleLogout
    }

    return <SessionContext.Provider value={contextValue}>{children}</SessionContext.Provider>
}

export function useSessionContext() {
    return useContext(SessionContext)
}
