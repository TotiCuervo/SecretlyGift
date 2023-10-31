'use client'
import Tooltip from '@/components/tooltip/tooltip'
import { useActivePath } from '@/lib/useActivePath'
import {
    AdjustmentsHorizontalIcon,
    CalendarDaysIcon,
    CogIcon,
    EnvelopeIcon,
    FlagIcon,
    UsersIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

interface Step {
    icon: React.JSXElementConstructor<any>
    active: boolean
    title: string
    path: string
}

export default function Steps() {
    const isActivePath = useActivePath()

    const steps: Step[] = [
        {
            icon: CalendarDaysIcon,
            active: isActivePath('/create'),
            title: 'Details of Event',
            path: '/create'
        },
        {
            icon: UsersIcon,
            active: isActivePath('/participants'),
            title: 'Participants',
            path: '/participants'
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

    return (
        <div className="inline-block bg-white p-4 rounded-full border-2">
            <div className="flex items-center justify-center divide-x-2">
                {steps.map((step, index) => (
                    <div className="flex items-center px-4">
                        <Link href={step.path}>
                            <Tooltip text={step.title}>
                                <div
                                    className={twMerge(
                                        'transition-all duration-300 ease-in-out p-2 rounded-full',
                                        step.active
                                            ? 'bg-primary-700 rounded-full shadow-lg'
                                            : 'bg-transparent hover:bg-gray-200'
                                    )}
                                >
                                    <step.icon
                                        className={twMerge(
                                            'transition-all duration-300 ease-in-out w-6 h-6',
                                            step.active ? 'text-white' : 'text-gray-500'
                                        )}
                                    />
                                </div>
                            </Tooltip>
                        </Link>

                        <div
                            className={twMerge(
                                'transition-all duration-500 ease-in-out flex flex-col justify-center',
                                step.active ? 'pl-4' : 'pl-0',
                                step.active ? `w-36 h-10` : `w-0 h-0`
                            )}
                        >
                            <div
                                className={twMerge(
                                    'transition-opacity duration-500 ease-in-out flex flex-col overflow-hidden',
                                    step.active ? 'delay-500 opacity-100 visible' : 'opacity-0 invisible'
                                )}
                            >
                                <div className="text-xs font-semibold text-primary-600">
                                    Step {index + 1}/{steps.length}
                                </div>
                                <div className="text-sm text-gray-900 font-bold">{step.title}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
