import '../app/globals.css'
import { twMerge } from 'tailwind-merge'
import localFont from 'next/font/local'
import Providers from './providers'
import Head from 'next/head'

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
            <Head>
                <link rel="icon" href="/icon" type="image/<generated>" sizes="<generated>" />
            </Head>
            <Providers>
                <body>{children}</body>
            </Providers>
        </html>
    )
}
