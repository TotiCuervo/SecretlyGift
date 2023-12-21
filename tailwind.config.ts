import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            fontFamily: {
                baloo: ['var(--font-baloo)'],
                display: ['var(--font-display)'],
            },
            colors: {
                background: 'rgb(249, 248, 247)',
                white: 'rgb(255, 255, 255)',
                primary: {
                    '50': '#fdf3f4',
                    '100': '#fbe8e9',
                    '200': '#f6d5d8',
                    '300': '#efb2b7',
                    '400': '#e58790',
                    '500': '#d85b6c',
                    '600': '#c33c54',
                    '700': '#a32d45',
                    '800': '#89283f',
                    '900': '#76253b',
                    '950': '#41101c',
                },
                secondary: colors.emerald,
            },
            transitionProperty: {
                width: 'width',
                height: 'height',
                'scale-x': 'scale-x',
                'translate-x': 'translate-x',
                flex: 'flex',
                'font-size': 'font-size',
            },
        },
    },
    plugins: [require('tailwindcss-hero-patterns')],
}
export default config
