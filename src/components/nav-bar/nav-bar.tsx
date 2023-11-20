'use client'
import { Fragment, useState } from 'react'
import Link from 'next/link'
import { Dialog, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import PrimaryOutlineButton from '@/components/buttons/primary-outline-button'
import ProfileDropdown from '../dropdown/profile/profile-dropdown'
import GhostButton from '../buttons/primary-ghost-button'
import MobileProfileDropdown from '../dropdown/profile/mobile-profile-dropdown'

interface IProps {
    isSessioned: boolean
}

export default function Navbar({ isSessioned }: IProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    return (
        <>
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 sm:p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5">
                        <span className="font-baloo text-2xl sm:text-4xl">Secretly</span>
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-8 w-8 sm:h-12 sm:w-12" aria-hidden="true" />
                    </button>
                </div>
                {isSessioned && (
                    <>
                        <div className="hidden sm:gap-x-12 lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
                            <Link href="/dashboard" className="text-sm font-semibold leading-6 text-gray-900">
                                <GhostButton className="text-xs sm:text-sm">Dashboard</GhostButton>
                            </Link>
                            <ProfileDropdown />
                        </div>
                    </>
                )}
                {!isSessioned && (
                    <div className="hidden items-center sm:gap-x-12 lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
                        <Link href="/login" className="text-base font-semibold leading-6 text-gray-900 sm:text-xl">
                            Log in
                        </Link>
                        <Link href="/login" className="text-sm font-semibold leading-6 text-gray-900">
                            <PrimaryOutlineButton size="sm" className="sm:size-xl">
                                Try for free
                            </PrimaryOutlineButton>
                        </Link>
                    </div>
                )}
            </nav>
            <Transition.Root show={mobileMenuOpen} as={Fragment}>
                <Dialog as="div" className="lg:hidden" onClose={setMobileMenuOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 z-10" />
                    </Transition.Child>
                    <Transition.Child
                        as={Fragment}
                        enter="transform transition ease-in-out duration-500 sm:duration-700"
                        enterFrom="translate-x-full"
                        enterTo="translate-x-0"
                        leave="transform transition ease-in-out duration-500 sm:duration-700"
                        leaveFrom="translate-x-0"
                        leaveTo="translate-x-full"
                    >
                        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                            <div className="flex items-center justify-between">
                                <a href="#" className="-m-1.5 p-1.5">
                                    <span className="sr-only">Secretly</span>
                                </a>
                                <button
                                    type="button"
                                    className="-m-2.5 rounded-md p-2.5 text-gray-700"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <span className="sr-only">Close menu</span>
                                    <XMarkIcon className="h-6 w-6 sm:h-8 sm:w-8" aria-hidden="true" />
                                </button>
                            </div>
                            <div className="mt-6 flow-root">
                                {isSessioned ? (
                                    <MobileProfileDropdown closeMenu={() => setMobileMenuOpen(false)} />
                                ) : (
                                    <div className="-my-6 divide-y divide-gray-500/10">
                                        <div className="py-6">
                                            <a
                                                href="#"
                                                className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                            >
                                                Log in
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </Dialog>
            </Transition.Root>
        </>
    )
}
