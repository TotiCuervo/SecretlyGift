import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
            },
            fontFamily: {
                baloo: ['var(--font-baloo)']
            },
            colors: {
                background: 'rgb(241, 239, 238)',
                // background: 'rgb(248, 249, 250)',
                white: 'rgb(255, 255, 255)',
                primary: {
                    '50': '#fef3f2',
                    '100': '#ffe2e1',
                    '200': '#ffcbc8',
                    '300': '#ffa7a2',
                    '400': '#fc746d',
                    '500': '#f55951',
                    '600': '#e12a21',
                    '700': '#be1f17',
                    '800': '#9d1e17',
                    '900': '#821f1a',
                    '950': '#470b08'
                },
                secondary: colors.emerald
            },
            transitionProperty: {
                width: 'width',
                height: 'height',
                'scale-x': 'scale-x',
                'translate-x': 'translate-x',
                flex: 'flex',
                'font-size': 'font-size'
            }
        }
    },
    plugins: []
}
export default config
