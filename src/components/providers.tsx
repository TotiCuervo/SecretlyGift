'use client'

import { SessionProvider } from '@/context/SessionContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

interface IProps {
    children: React.ReactNode
}

export default function Providers({ children }: IProps) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 60 * 1000
                    }
                }
            })
    )

    return (
        <QueryClientProvider client={queryClient}>
            <SessionProvider>
                <body>{children}</body>
            </SessionProvider>
        </QueryClientProvider>
    )
}
