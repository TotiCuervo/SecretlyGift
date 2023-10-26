import React from 'react'

interface IProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children: React.ReactNode
}

export default function Button({ children, ...props }: IProps) {
    return (
        <button
            {...props}
            className="rounded-full border border-white bg-white px-4 py-2 font-semibold text-indigo-700 hover:shadow-lg focus:outline-none"
        >
            {children}
        </button>
    )
}
