import React from 'react'
import { twMerge } from 'tailwind-merge'

type IProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export default function TextInput({ ...props }: IProps) {

    const error = false
  return (
    <div className="mb-6">
                <label htmlFor="phone" className={twMerge("block text-sm font-medium mb-2",
                !error && "text-indigo-900",
                error && "text-red-700")}>
                    Please enter a phone numbers
                </label>
                <div className="flex items-center">
                    <input 
                        className={twMerge("mt-1 p-2.5 flex-grow outline-none rounded-lg border focus:ring-1 shadow transition duration-150 ease-in-out",
                            !error && "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500",
                            error && "border-red-700 bg-red-50 focus:border-red-500 focus:ring-red-500"
                        )} 
                        {...props}
                    />
                </div>
                <span className="p-2 text-xs text-red-700">Error message</span>
            </div>
  )
}
