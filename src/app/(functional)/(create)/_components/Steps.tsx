'use client'
import Tooltip from '@/components/tooltip/tooltip'
import { useActivePath } from '@/lib/useActivePath'
import { Disclosure } from '@headlessui/react'
import { CalendarDaysIcon, CogIcon, EnvelopeIcon, FlagIcon, UsersIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

interface Step {
    icon: React.JSXElementConstructor<any>
    active: boolean
    title: string
    path: string
}

export default function Steps() {
    const isActivePath = useActivePath()
    const { uuid } = useParams()

    const steps: Step[] = [
        {
            icon: CalendarDaysIcon,
            active: isActivePath('/create'),
            title: 'Details of Event',
            path: '/create'
        },
        {
            icon: UsersIcon,
            active: isActivePath(`/${uuid}/participants`),
            title: 'Participants',
            path: `/${uuid}/participants`
        },
        {
            icon: FlagIcon,
            active: isActivePath('/exclusions'),
            title: 'Exclusions',
            path: '/exclusions'
        },
        {
            icon: CogIcon,
            active: isActivePath('/settings'),
            title: 'Settings',
            path: '/settings'
        },
        {
            icon: EnvelopeIcon,
            active: isActivePath('/confirmation'),
            title: 'Confirmation',
            path: '/confirmation'
        }
    ]

    const activeStep = steps.find((step) => step.active)
    const activeStepPosition = steps.indexOf(activeStep!)

    return (
        <>
            <div className="flex justify-center pb-2">
                <div
                    className={twMerge(
                        'visible flex overflow-hidden opacity-100 transition-opacity delay-500 duration-500 ease-in-out sm:invisible sm:opacity-0'
                    )}
                >
                    <span className="text-md font-bold text-gray-900">
                        <span className="text-primary-600">
                            Step {activeStepPosition + 1}/{steps.length}:{' '}
                        </span>
                        {activeStep!.title}
                    </span>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="inline-block w-11/12 rounded-full border-2 bg-white p-2 sm:w-full sm:p-4">
                    <div className="flex items-center justify-center divide-x-2">
                        {steps.map((step, index) => (
                            <Disclosure as="div" key={index}>
                                {({ open }) => (
                                    <div className="flex items-center px-3 sm:px-4">
                                        <Link href={step.path}>
                                            <Tooltip text={step.title}>
                                                <div
                                                    className={twMerge(
                                                        'rounded-full p-2 transition-all duration-300 ease-in-out',
                                                        step.active
                                                            ? 'rounded-full bg-primary-700 shadow-lg'
                                                            : 'bg-transparent hover:bg-gray-200'
                                                    )}
                                                >
                                                    <step.icon
                                                        className={twMerge(
                                                            'h-5 w-5 transition-all duration-300 ease-in-out sm:h-6 sm:w-6',
                                                            step.active ? 'text-white' : 'text-gray-500'
                                                        )}
                                                    />
                                                </div>
                                            </Tooltip>
                                        </Link>

                                        <div
                                            className={twMerge(
                                                'flex flex-col justify-center transition-all duration-500 ease-in-out',
                                                step.active ? 'pl-0 sm:pl-4' : 'pl-0',
                                                step.active ? `h-0 w-0 sm:h-10 sm:w-36` : `h-0 w-0`
                                            )}
                                        >
                                            <Disclosure.Panel static>
                                                <div
                                                    className={twMerge(
                                                        'flex flex-col overflow-hidden transition-opacity duration-500 ease-in-out',
                                                        step.active
                                                            ? 'invisible opacity-0 delay-500 sm:visible sm:opacity-100'
                                                            : 'invisible opacity-0'
                                                    )}
                                                >
                                                    <div className="text-xs font-semibold text-primary-600">
                                                        Step {index + 1}/{steps.length}
                                                    </div>
                                                    <div className="text-sm font-bold text-gray-900">{step.title}</div>
                                                </div>
                                            </Disclosure.Panel>
                                        </div>
                                    </div>
                                )}
                            </Disclosure>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
