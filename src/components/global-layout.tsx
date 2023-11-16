import '../app/globals.css'
import { twMerge } from 'tailwind-merge'
import localFont from 'next/font/local'
import Providers from './providers'
import Head from 'next/head'
import { Nunito } from 'next/font/google'

const myFont = localFont({
    src: '../app/Baloo-Regular.ttf',
    display: 'swap',
    variable: '--font-baloo'
})

const display = Nunito({
    subsets: ['latin'],
    weight: ['500', '700', '800', '900'],
    variable: '--font-display'
})

interface IProps {
    children: React.ReactNode
    additionalClasses?: string
}

export default function GlobalLayout({ children, additionalClasses }: IProps) {
    return (
        <html
            lang="en"
            className={twMerge(myFont.variable, display.variable, additionalClasses ? additionalClasses : null)}
        >
            <Head>
                <link rel="icon" href="/icon" type="image/<generated>" sizes="<generated>" />
            </Head>
            <Providers>
                <body>{children}</body>
            </Providers>
        </html>
    )
}
