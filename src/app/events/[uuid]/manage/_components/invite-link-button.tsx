import PrimaryButton from '@/components/buttons/primary-button'
import PrimaryOutlineButton from '@/components/buttons/primary-outline-button'
import { publicEventRoute } from '@/lib/router/routes/events/public-event-route'
import { Event } from '@/types/events/Event'
import { ClipboardIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { toast } from 'sonner'

interface IProps {
    event: Event['uuid']
}

export default function InviteLinkButton({ event }: IProps) {
    function copyLink() {
        navigator.clipboard.writeText(`${location.origin}${publicEventRoute(event)}`)
        toast.success('Copied link to clipboard')
    }

    return (
        <div>
            <div
                onClick={copyLink}
                className="flex shrink cursor-pointer items-center justify-center gap-2 rounded-lg bg-gray-100 px-2 py-2 text-sm text-gray-700 transition duration-150 ease-in-out hover:bg-gray-200"
            >
                {`${location.origin}${publicEventRoute(event)}`}
                <PrimaryButton size="sm" onClick={copyLink}>
                    Copy
                </PrimaryButton>
            </div>
        </div>
    )
}
