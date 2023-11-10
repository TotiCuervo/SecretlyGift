import React from 'react'
import { twMerge } from 'tailwind-merge'

export interface BaseButtonProps
    extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children: React.ReactNode
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
    customClasses: string
    loading?: boolean
    loadingText?: string
}

export default function BaseButton({
    children,
    customClasses,
    size = 'md',
    loading,
    loadingText,
    ...props
}: BaseButtonProps) {
    return (
        <button
            {...props}
            className={twMerge(
                'rounded-lg text-center font-medium transition duration-200 ease-in-out focus:outline-none focus:ring-4',
                size === 'sm' && 'px-3 py-2 text-sm',
                size === 'md' && 'px-5 py-2.5 text-sm',
                size === 'lg' && 'px-5 py-3 text-base',
                size === 'xl' && 'px-6 py-3.5 text-base',
                size === '2xl' && 'px-7 py-4 text-lg',
                size === 'full' && 'h-full w-full text-base',
                customClasses
            )}
        >
            {loading ? (
                <div className="flex items-center justify-center">
                    <div
                        className={twMerge(
                            'inline-block animate-spin rounded-full border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]',
                            ['md', 'sm'].includes(size) && 'h-3 w-3 border-2',
                            loadingText && 'mr-2'
                        )}
                        role="status"
                    ></div>
                    {loadingText && <span>{loadingText}</span>}
                </div>
            ) : (
                children
            )}
        </button>
    )
}
