import { Datepicker } from '@aliakbarazizi/headless-datepicker'
import React, { useState } from 'react'
import { twMerge } from 'tailwind-merge'

interface InputProps {
    onChange: (value: Date | null) => void
    onBlur: (value: Date | null) => void
    value: Date
    name: string
    title: string
    ref?: React.Ref<HTMLInputElement>
    error?: string
}

export default function DatepickerInput({ error, title, onChange, value, ...props }: InputProps) {
    return (
        <div className="mb-6">
            <label
                htmlFor="phone"
                className={twMerge(
                    'mb-2 block text-sm font-medium',
                    !error && 'text-indigo-900',
                    error && 'text-red-700'
                )}
            >
                {title}
            </label>
            <Datepicker onChange={onChange} value={value}>
                <Datepicker.Input
                    format="EEEE, MMMM dd, yyyy"
                    className={twMerge(
                        'mt-1 w-[300px] flex-grow rounded-lg border p-2.5 shadow outline-none transition duration-150 ease-in-out focus:ring-1',
                        !error && 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500',
                        error && 'border-red-700 bg-red-50 focus:border-red-500 focus:ring-red-500'
                    )}
                    placeholder="Select a date"
                />
                <Datepicker.Picker defaultType="day" className="rounded-md bg-white p-4 shadow-md">
                    {({ monthName, hour, minute, year }) => (
                        <>
                            <div className="flex w-full items-center justify-between space-x-6 py-2 rtl:space-x-reverse">
                                <Datepicker.Button
                                    action="prev"
                                    className="rounded-full p-2 text-sm font-medium transition duration-150 ease-in-out hover:bg-indigo-700 hover:text-white rtl:rotate-180"
                                >
                                    Prev
                                </Datepicker.Button>
                                <div className="flex">
                                    <Datepicker.Button
                                        action="toggleMonth"
                                        className="leading-2 p-2 text-lg font-semibold transition duration-150 ease-in-out hover:bg-indigo-700 hover:text-white"
                                    >
                                        {monthName}
                                    </Datepicker.Button>
                                    <Datepicker.Button
                                        action="toggleYear"
                                        className="leading-2 p-2 text-lg font-semibold transition duration-150 ease-in-out hover:bg-indigo-700 hover:text-white"
                                    >
                                        {year}
                                    </Datepicker.Button>
                                </div>
                                <Datepicker.Button
                                    action="next"
                                    className="rounded-full p-2 text-sm font-medium transition duration-150 ease-in-out hover:bg-indigo-700 hover:text-white rtl:rotate-180"
                                >
                                    Next
                                </Datepicker.Button>
                            </div>
                            <Datepicker.Items
                                className={({ type }) =>
                                    twMerge(
                                        'grid w-full auto-rows-max gap-4 overflow-y-auto scroll-smooth',
                                        type == 'day' && 'grid-cols-7',
                                        type == 'month' && 'grid-cols-3',
                                        type == 'year' && 'max-h-[274px] grid-cols-4'
                                    )
                                }
                            >
                                {({ items }) =>
                                    items.map((item) => (
                                        <Datepicker.Item
                                            key={item.key}
                                            item={item}
                                            className={twMerge(
                                                'grid select-none items-center justify-center rounded-full py-1.5 text-sm font-medium',
                                                item.isHeader
                                                    ? 'cursor-default'
                                                    : 'transition duration-150 ease-in-out hover:bg-indigo-700 hover:text-white',
                                                item.disabled ? 'text-gray-500' : 'hover:text-white',
                                                item.type === 'day' && 'h-8 w-8',
                                                item.isSelected &&
                                                    'border border-indigo-700 bg-indigo-200 text-center text-indigo-950 shadow',
                                                item.isToday && 'border border-indigo-500'
                                            )}
                                            action={
                                                item.type === 'day'
                                                    ? 'close'
                                                    : item.type === 'month'
                                                    ? 'showDay'
                                                    : 'showMonth'
                                            }
                                        >
                                            {item.isHeader ? item.text.substring(0, 2) : item.text}
                                        </Datepicker.Item>
                                    ))
                                }
                            </Datepicker.Items>
                            <Datepicker.Button
                                action="today"
                                className="mt-4 w-full rounded-md bg-indigo-600 p-2 text-sm font-medium text-white transition duration-150 ease-in-out hover:bg-indigo-700"
                            >
                                Today
                            </Datepicker.Button>
                        </>
                    )}
                </Datepicker.Picker>
            </Datepicker>
            {error && <span className="block p-2 text-xs text-red-700">{error}</span>}
        </div>
    )
}
