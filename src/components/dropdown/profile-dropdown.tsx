import { useSessionContext } from '@/context/SessionContext'
import Dropdown from './dropdown'
import { UserIcon } from '@heroicons/react/24/solid'

export interface MenuItem {
    name: string
    type: 'link' | 'button' | 'info'
    action?: () => void
    href?: string
}

export default function ProfileDropdown() {
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
        <Dropdown menuItems={menuItems}>
            <UserIcon className="h-12 w-12 rounded-full border p-2" />
        </Dropdown>
    )
}
