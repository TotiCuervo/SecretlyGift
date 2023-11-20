import InputLabel from '@/components/inputs/input-label'
import { Datepicker } from '@aliakbarazizi/headless-datepicker'
import React from 'react'
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

export default function DatepickerInput({ error, title, onChange, onBlur, value, ...props }: InputProps) {
    return (
        <div>
            <InputLabel error={Boolean(error)}>{title}</InputLabel>

            <div className=" flex items-center">
                <Datepicker onChange={onChange} value={value}>
                    <Datepicker.Input
                        format="EEEE, MMMM dd, yyyy"
                        className={twMerge(
                            'input-field',
                            !error && 'input-field-default',
                            error && 'input-field-error'
                        )}
                        placeholder="Select a date"
                    />
                    <Datepicker.Picker defaultType="day" className="z-10 rounded-md bg-white p-4 shadow-md">
                        {({ monthName, hour, minute, year }) => (
                            <>
                                <div className="flex w-full items-center justify-between space-x-6 py-2 rtl:space-x-reverse">
                                    <Datepicker.Button
                                        action="prev"
                                        className="rounded-full p-2 text-sm font-medium transition duration-150 ease-in-out hover:bg-primary-700 hover:text-white rtl:rotate-180"
                                    >
                                        Prev
                                    </Datepicker.Button>
                                    <div className="flex">
                                        <Datepicker.Button
                                            action="toggleMonth"
                                            className="leading-2 p-2 text-lg font-semibold transition duration-150 ease-in-out hover:bg-primary-700 hover:text-white"
                                        >
                                            {monthName}
                                        </Datepicker.Button>
                                        <Datepicker.Button
                                            action="toggleYear"
                                            className="leading-2 p-2 text-lg font-semibold transition duration-150 ease-in-out hover:bg-primary-700 hover:text-white"
                                        >
                                            {year}
                                        </Datepicker.Button>
                                    </div>
                                    <Datepicker.Button
                                        action="next"
                                        className="rounded-full p-2 text-sm font-medium transition duration-150 ease-in-out hover:bg-primary-700 hover:text-white rtl:rotate-180"
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
                                                        : 'transition duration-150 ease-in-out hover:bg-primary-700 hover:text-white',
                                                    item.disabled ? 'text-gray-500' : 'hover:text-white',
                                                    item.type === 'day' && 'h-8 w-8',
                                                    item.isSelected &&
                                                        'border border-primary-700 bg-primary-200 text-center text-primary-950 shadow',
                                                    item.isToday && 'border border-primary-500'
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
                                    className="mt-4 w-full rounded-md bg-primary-600 p-2 text-sm font-medium text-white transition duration-150 ease-in-out hover:bg-primary-700"
                                >
                                    Today
                                </Datepicker.Button>
                            </>
                        )}
                    </Datepicker.Picker>
                </Datepicker>
            </div>
            {error && <span className="block p-2 text-xs text-red-700">{error}</span>}
        </div>
    )
}
