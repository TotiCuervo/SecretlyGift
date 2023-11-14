'use client'

import React, { useContext, ReactNode, useState, useEffect, useCallback } from 'react'
import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from '@/types/schema'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Profile } from '@/types/profile/Profile'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { SubmitHandler, UseFormHandleSubmit, UseFormRegister, useForm } from 'react-hook-form'

interface IContextProps {
    children: ReactNode
}

export interface FormData {
    eventName: string
    eventDate: Date
}

const schema = z.object({
    eventName: z.string().min(3, { message: 'Event needs to be more than 3 characters' }).default('Howdy')
    // eventDate: z.date()
})

export interface CreateContextType {
    register: UseFormRegister<FormData>
    handleSubmit: UseFormHandleSubmit<FormData, undefined>
}

export const CreateContext = React.createContext<CreateContextType>({} as CreateContextType)

export function CreateProvider({ children }: IContextProps) {
    const router = useRouter()

    const supabase = createClientComponentClient<Database>()

    const { register, handleSubmit } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    const contextValue = {
        register,
        handleSubmit
    }

    return <CreateContext.Provider value={contextValue}>{children}</CreateContext.Provider>
}

export function useCreateContext() {
    return useContext(CreateContext)
}
