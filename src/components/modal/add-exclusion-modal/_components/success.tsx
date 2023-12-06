import { EnvelopeIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import PrimaryButton from '../../../buttons/primary-button'
import PrimaryOutlineButton from '../../../buttons/primary-outline-button'
import { AddedUser } from '../add-exclusion-modal'

interface IProps {
    addedUser: AddedUser
    reset: () => void
    setIsOpen: (isOpen: boolean) => void
}

export default function Success({ addedUser, reset, setIsOpen }: IProps) {
    return (
        <div className="flex flex-col pt-6 text-center">
            <div className="flex grow flex-col gap-4 px-6 pb-4">
                <EnvelopeIcon className="mx-auto h-10 w-10  text-primary-500" />

                <span className="text-xl font-bold leading-6 text-gray-900">
                    <span className="text-primary-500">{addedUser.name}</span> has been added!
                </span>
                <span className="text-sm text-gray-500">
                    We have sent an email to <span className="text-primary-500">{addedUser.email}</span> with
                    instructions on how to access the event, customize their profile, and more.
                </span>
            </div>
            <div className="flex justify-end gap-2 border-t border-gray-300 px-6 py-4">
                <PrimaryOutlineButton
                    onClick={() => {
                        setIsOpen(false)
                    }}
                >
                    Close
                </PrimaryOutlineButton>
                <PrimaryButton onClick={reset}>
                    <div className="flex items-center">
                        <PlusCircleIcon className="h-5 w-5" />
                        <span className="ml-2">Add another</span>
                    </div>
                </PrimaryButton>
            </div>
        </div>
    )
}
