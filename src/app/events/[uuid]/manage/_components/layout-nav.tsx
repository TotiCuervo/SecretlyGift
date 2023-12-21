'use client'
import { eventManageExclusionsRoute } from '@/lib/router/routes/events/event-manage-exclusions-route'
import { eventManageRoute } from '@/lib/router/routes/events/event-manage-route'
import { eventManageSettingsRoute } from '@/lib/router/routes/events/event-manage-settings-route'
import Link from 'next/link'
import { redirect, usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

interface IProps {
    uuid: string
}

interface Path {
    route: string
    title: string
}

export default function LayoutNav({ uuid }: IProps) {
    const paths: Path[] = [
        {
            route: eventManageRoute(uuid),
            title: 'Participants',
        },
        {
            route: eventManageExclusionsRoute(uuid),
            title: 'Exclusions',
        },
        {
            route: eventManageSettingsRoute(uuid),
            title: 'Settings',
        },
    ]

    const pathname = usePathname()

    return (
        <button className="flex gap-6 border-b">
            {paths.map((path) => (
                <Link
                    href={path.route}
                    key={path.route}
                >
                    <p
                        className={twMerge(
                            'border-b-2 px-2 pb-2 font-semibold',
                            pathname === path.route
                                ? 'border-primary-600 text-primary-600'
                                : 'border-transparent text-gray-500 transition duration-150 ease-in-out hover:border-primary-400 hover:text-gray-600'
                        )}
                        onClick={() => redirect(path.route)}
                    >
                        {path.title}
                    </p>
                </Link>
            ))}
        </button>
    )
}
