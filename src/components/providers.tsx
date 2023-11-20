'use client'

import { SessionProvider } from '@/context/SessionContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { Toaster } from 'sonner'

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
                <body>
                    {children}
                    <Toaster position="top-right" richColors closeButton />
                </body>
            </SessionProvider>
        </QueryClientProvider>
    )
}
