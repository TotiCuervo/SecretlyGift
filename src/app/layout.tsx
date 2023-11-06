import type { Metadata } from 'next'
import GlobalLayout from '@/components/global-layout'
import NavbarLayout from '@/components/nav-bar/nav-bar-layout'
import Navbar from '../components/nav-bar/nav-bar'

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <GlobalLayout additionalClasses="bg-background">
            <NavbarLayout Navbar={Navbar} />
            {children}
        </GlobalLayout>
    )
}
