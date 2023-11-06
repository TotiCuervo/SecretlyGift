import { useSessionContext } from '@/context/SessionContext'
import Link from 'next/link'

export interface MenuItem {
    name: string
    type: 'link' | 'button' | 'info'
    action?: () => void
    href?: string
}

interface IProps {
    closeMenu: () => void
}

export default function MobileProfileDropdown({ closeMenu }: IProps) {
    const { logout } = useSessionContext()

    const menuItems: MenuItem[] = [
        {
            name: 'Profile',
            type: 'link',
            href: '/profile'
        },
        {
            name: 'Settings',
            type: 'link',
            href: '/settings'
        },
        {
            name: 'Sign Out',
            type: 'button',
            action: logout
        }
    ]

    return (
        <>
            {menuItems.map((menuItem, index) => {
                if (menuItem.type === 'link') {
                    return (
                        <Link
                            key={index}
                            href={menuItem.href!}
                            className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            onClick={closeMenu}
                        >
                            {menuItem.name}
                        </Link>
                    )
                } else {
                    return (
                        <div
                            onClick={() => {
                                menuItem.action && menuItem.action()
                                closeMenu()
                            }}
                            key={index}
                            className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        >
                            {menuItem.name}
                        </div>
                    )
                }
            })}
        </>
    )
}
