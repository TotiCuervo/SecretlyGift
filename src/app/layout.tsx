import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import localFont from 'next/font/local'
import Navbar from '@/components/nav-bar'

const myFont = localFont({
    src: './Baloo-Regular.ttf',
    display: 'swap',
    variable: '--font-baloo'
})

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${myFont.variable}`}>
            <body>{children}</body>
        </html>
    )
}
