import '../app/globals.css'
import { SessionProvider } from '@/context/SessionContext'
import { twMerge } from 'tailwind-merge'
import localFont from 'next/font/local'

const myFont = localFont({
    src: '../app/Baloo-Regular.ttf',
    display: 'swap',
    variable: '--font-baloo'
})

interface IProps {
    children: React.ReactNode
    additionalClasses?: string
}

export default function GlobalLayout({ children, additionalClasses }: IProps) {
    return (
        <html lang="en" className={twMerge(`${myFont.variable}`, additionalClasses ? additionalClasses : null)}>
            <SessionProvider>
                <body>{children}</body>
            </SessionProvider>
        </html>
    )
}
