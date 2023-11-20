import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

interface IProps {
    children: React.ReactNode
    menuItems: MenuItem[]
}

export interface MenuItem {
    name: string
    type: 'link' | 'button' | 'info'
    action?: () => void
    href?: string
}

export default function Dropdown({ children, menuItems }: IProps) {
    return (
        <Menu as="div" className="relative ml-3">
            <div>
                <Menu.Button className="relative flex rounded-full text-sm focus:outline-none ">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    {children}
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {menuItems.map((item) => (
                        <Menu.Item key={item.name}>
                            {({ active }) => (
                                <a
                                    href={item.href}
                                    onClick={item.action}
                                    className={classNames(
                                        active ? 'bg-gray-100' : '',
                                        'block cursor-pointer px-4 py-2 text-sm text-gray-700'
                                    )}
                                >
                                    {item.name}
                                </a>
                            )}
                        </Menu.Item>
                    ))}
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
