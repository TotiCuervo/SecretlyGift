import Modal, { ModalProps } from '../modal'
import ErrorAlert from '@/components/alert/error-alert'
import { useEffect, useState } from 'react'
import { StatusMessage } from '@/types/StatusMessage'
import PrimaryGhostButton from '@/components/buttons/primary-ghost-button'
import PrimaryButton from '@/components/buttons/primary-button'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import useAdministrativeParticipantsQuery from '@/lib/query/participants/administrative/useAdministrativeParticipantsQuery'
import { Event } from '@/types/events/Event'
import { AdministrativeParticipantView } from '@/types/participant/AdministrativeParticipantView'
import CannotBeMatchedWithSection from './_components/cannot-be-matched-with-section'
import AutocompleteInput from '@/components/inputs/autocomplete-input'
import { Participant } from '@/types/participant/Participant'

interface IProps extends ModalProps {
    event: Event['uuid']
}

export default function AddExclusionModal({ setIsOpen, event, ...props }: IProps) {
    const { data: participants = [] } = useAdministrativeParticipantsQuery(event)
    const [status, setStatus] = useState<StatusMessage>()

    const [selectedParticipant, setSelectedParticipant] = useState<AdministrativeParticipantView>()
    const [cannotBeMatchedWith, setCannotBeMatchedWith] = useState<Participant['id'][]>([])

    const exclusions = participants.filter((participant) =>
        cannotBeMatchedWith.some((exclusion) => exclusion === participant.id)
    )

    const possibleExclusions = participants.filter(
        (participant) =>
            participant.id !== selectedParticipant?.id ||
            !cannotBeMatchedWith.some((exclusion) => exclusion === participant.id)
    )

    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        if (selectedParticipant) {
            setCannotBeMatchedWith(
                selectedParticipant.exclusions.map((exclusion) => exclusion.cannot_have_participant.id)
            )
        }
    }, [selectedParticipant])

    function handleAPVDisplayValue(item: AdministrativeParticipantView | undefined) {
        return item ? (item.name ? item.name : item.profile.email) : ''
    }

    function handleExclusionOnSelect(item: AdministrativeParticipantView | undefined) {
        if (item) {
            setCannotBeMatchedWith([...cannotBeMatchedWith, item.id])
        }
    }

    function deleteExclusion(id: Participant['id']) {
        setCannotBeMatchedWith(cannotBeMatchedWith.filter((exclusion) => exclusion !== id))
    }

    return (
        <>
            <Modal setIsOpen={setIsOpen} {...props} containerPadding="p-0">
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
                            <AutocompleteInput<AdministrativeParticipantView>
                                title={'Participant'}
                                onSelect={setSelectedParticipant}
                                selectedItem={selectedParticipant}
                                key={'participant'}
                                list={participants}
                                displayValue={handleAPVDisplayValue}
                            />
                            <AutocompleteInput<AdministrativeParticipantView>
                                title={'Cannot be matched with'}
                                onSelect={handleExclusionOnSelect}
                                selectedItem={undefined}
                                key={'participant'}
                                list={possibleExclusions}
                                displayValue={handleAPVDisplayValue}
                            />
                            <CannotBeMatchedWithSection
                                data={exclusions}
                                profileSelected={selectedParticipant !== undefined}
                                onDelete={deleteExclusion}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end border-t border-gray-300 px-6 py-4">
                        <div className="flex justify-end gap-3">
                            <PrimaryGhostButton onClick={() => {}}>Cancel</PrimaryGhostButton>
                            <PrimaryButton loading={isSubmitting} loadingText="Adding...">
                                <div className="flex items-center">
                                    <PlusCircleIcon className="h-5 w-5" />
                                    <span className="ml-2">Add</span>
                                </div>
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}
