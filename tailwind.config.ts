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
                white: 'rgb(255, 255, 255)',
                primary: colors.indigo
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
