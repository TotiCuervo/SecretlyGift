import { z } from 'zod'
import Modal, { ModalProps } from '../modal'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import ErrorAlert from '@/components/alert/error-alert'
import { useState } from 'react'
import { StatusMessage } from '@/types/StatusMessage'
import Controller from '@/components/forms/controller'
import TextInput from '@/components/inputs/text-input'
import PrimaryGhostButton from '@/components/buttons/primary-ghost-button'
import PrimaryButton from '@/components/buttons/primary-button'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import useAdministrativeParticipantsQuery from '@/lib/query/participants/administrative/useAdministrativeParticipantsQuery'
import Autocomplete from '@/components/autocomplete/autocomplete'

interface IProps extends ModalProps {
    event: string
}

interface FormData {
    participant: string
    exclusions: string[]
}

const schema = z.object({
    participant: z.string().min(1, { message: 'Must select a participant' }),
    exclusions: z.array(z.string()).min(1, { message: 'Must select at least one exclusion' })
})

export default function AddExclusionModal({ setIsOpen, event, ...props }: IProps) {
    const { data: participants = [] } = useAdministrativeParticipantsQuery(event)

    const [status, setStatus] = useState<StatusMessage>()

    const {
        handleSubmit,
        control,
        formState: { isSubmitting },
        reset
    } = useForm<FormData>({
        resolver: zodResolver(schema)
    })
    async function onSubmit(data: FormData) {
        const {} = data
    }
    return (
        <>
            <Modal setIsOpen={setIsOpen} {...props} containerPadding="p-0">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="px-6 pt-6 text-center">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Manage Exclusions</h3>
                        <div className="px-7 py-3">
                            <p className="text-sm text-gray-500">
                                Enter the name and email of the person you want to add to your event.
                            </p>
                        </div>
                    </div>
                    {status && status.type === 'error' && (
                        <div className="mt-4 px-6">
                            <ErrorAlert>{status.message}</ErrorAlert>
                        </div>
                    )}
                    <div className="mt-4">
                        <div className="px-6 pb-6">
                            <div className="flex flex-col gap-4">
                                <Controller
                                    name="name"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: true }}
                                    render={({ field, fieldState }) => <Autocomplete />}
                                />
                                <Controller
                                    name="email"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: true }}
                                    render={({ field, fieldState }) => (
                                        <TextInput
                                            title={'Email'}
                                            {...field}
                                            error={fieldState?.error?.message}
                                            key={'email'}
                                            ref={null}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end border-t border-gray-300 px-6 py-4">
                            <div className="flex justify-end gap-3">
                                <PrimaryGhostButton onClick={() => {}}>Cancel</PrimaryGhostButton>
                                <PrimaryButton type="submit" loading={isSubmitting} loadingText="Adding...">
                                    <div className="flex items-center">
                                        <PlusCircleIcon className="h-5 w-5" />
                                        <span className="ml-2">Add</span>
                                    </div>
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>
                </form>
            </Modal>
        </>
    )
}
