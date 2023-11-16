import GhostButton from '@/components/buttons/ghost-button'
import { Datepicker } from '@aliakbarazizi/headless-datepicker'
import React, { ElementType } from 'react'
import { twMerge } from 'tailwind-merge'

interface InputProps {
    onChange: (value: Date | null) => void
    onBlur: (value: Date | null) => void
    value: Date
    ref?: React.Ref<ElementType>
}

export default function DatepickerPicker({ onChange, value, ...props }: InputProps) {
    return (
        <Datepicker onChange={onChange} value={value} {...props}>
            <Datepicker.Picker alwaysOpen defaultType="day" className="z-10 rounded-md bg-white p-4 shadow-md">
                {({ monthName, hour, minute, year }) => (
                    <>
                        <div className="flex w-full items-center justify-between space-x-6 py-2 rtl:space-x-reverse">
                            <Datepicker.Button
                                type="button"
                                action="prev"
                                className="rounded-full p-2 text-sm font-medium transition duration-150 ease-in-out hover:bg-primary-700 hover:text-white rtl:rotate-180"
                            >
                                Prev
                            </Datepicker.Button>
                            <div className="flex">
                                <Datepicker.Button
                                    type="button"
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
                                type="button"
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
                        <div className="mt-4 flex items-center justify-center gap-2">
                            <GhostButton
                                type="button"
                                onClick={() => {
                                    onChange(value)
                                }}
                            >
                                Close
                            </GhostButton>

                            <Datepicker.Button
                                action="today"
                                type="button"
                                className="w-full rounded-md bg-primary-600 p-2 text-base font-medium text-white transition duration-150 ease-in-out hover:bg-primary-700"
                            >
                                Today
                            </Datepicker.Button>
                        </div>
                    </>
                )}
            </Datepicker.Picker>
        </Datepicker>
    )
}
