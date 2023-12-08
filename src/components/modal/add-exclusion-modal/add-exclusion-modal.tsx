import Modal, { ModalProps } from '../modal'
import ErrorAlert from '@/components/alert/error-alert'
import { useEffect, useState } from 'react'
import { StatusMessage } from '@/types/StatusMessage'
import PrimaryGhostButton from '@/components/buttons/primary-ghost-button'
import PrimaryButton from '@/components/buttons/primary-button'
import useAdministrativeParticipantsQuery from '@/lib/query/participants/administrative/useAdministrativeParticipantsQuery'
import { Event } from '@/types/events/Event'
import { AdministrativeParticipantView } from '@/types/participant/AdministrativeParticipantView'
import PillList from './_components/pill-list'
import AutocompleteInput from '@/components/inputs/autocomplete-input'
import { Participant } from '@/types/participant/Participant'
import InputLabel from '@/components/inputs/input-label'
import { updateExclusions } from '@/endpoints/event/update-exclusions'
import useAdministrativeParticipantsInvalidation from '@/lib/query/participants/administrative/useParticipantsByEventQueryInvalidation'

interface IProps extends ModalProps {
    event: Event['uuid']
}

export default function AddExclusionModal({ setIsOpen, event, ...props }: IProps) {
    const { data: participants = [] } = useAdministrativeParticipantsQuery(event)
    const invalidate = useAdministrativeParticipantsInvalidation()

    const [status, setStatus] = useState<StatusMessage>()
    const [selectedParticipant, setSelectedParticipant] = useState<AdministrativeParticipantView>()
    const [cannotBeMatchedWith, setCannotBeMatchedWith] = useState<Participant['id'][]>([])

    const exclusions = participants.filter((participant) =>
        cannotBeMatchedWith.some((exclusion) => exclusion === participant.id)
    )

    const possibleExclusions = participants.filter((participant) => {
        return !(
            participant.id === selectedParticipant?.id ||
            cannotBeMatchedWith.some((exclusion) => exclusion === participant.id)
        )
    })

    const onlyOnePossibleMatch = possibleExclusions.length === 1
    const noPossibleMatches = possibleExclusions.length === 0

    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        if (selectedParticipant) {
            setCannotBeMatchedWith(
                selectedParticipant.exclusions.map((exclusion) => exclusion.cannot_have_participant.id)
            )
        }
    }, [selectedParticipant])

    useEffect(() => {
        if (props.isOpen) {
            setStatus(undefined)
            setSelectedParticipant(undefined)
            setCannotBeMatchedWith([])
        }
    }, [props.isOpen])

    function handleAPVDisplayValue(item: AdministrativeParticipantView | undefined) {
        return item ? (item.name ? item.name : item.profile.email) : ''
    }

    function handleExclusionOnSelect(id: Participant['id']) {
        setCannotBeMatchedWith([...cannotBeMatchedWith, id])
        if (onlyOnePossibleMatch) {
            setStatus({
                type: 'error',
                message: 'Each participant must have at least one possible match'
            })
        }
    }

    function deleteExclusion(id: Participant['id']) {
        setCannotBeMatchedWith(cannotBeMatchedWith.filter((exclusion) => exclusion !== id))
        if (noPossibleMatches && status !== undefined) {
            setStatus(undefined)
        }
    }

    async function onSubmit() {
        setIsSubmitting(true)
        try {
            await updateExclusions({
                participant: selectedParticipant?.id as number,
                exclusions: cannotBeMatchedWith,
                event
            })
            invalidate(event)
            setIsSubmitting(false)
            setIsOpen(false)
        } catch (error) {
            setIsSubmitting(false)
            setStatus({
                type: 'error',
                message: 'Something went wrong. Please try again later.'
            })
        }
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
                            <div className="flex flex-col gap-2">
                                <InputLabel>Cannot be matched with</InputLabel>
                                <PillList
                                    data={exclusions}
                                    onClick={deleteExclusion}
                                    excluded
                                    clickTitle="Remove"
                                    backupcheck={exclusions.length === 0}
                                    backupText="This Participant does not have any exclusions yet"
                                />
                                <PillList
                                    data={possibleExclusions}
                                    onClick={handleExclusionOnSelect}
                                    excluded={false}
                                    clickTitle="Exclude"
                                    showIf={selectedParticipant !== undefined}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end border-t border-gray-300 px-6 py-4">
                        <div className="flex justify-end gap-3">
                            <PrimaryGhostButton onClick={() => setIsOpen(false)}>Cancel</PrimaryGhostButton>
                            <PrimaryButton
                                disabled={selectedParticipant === undefined || noPossibleMatches}
                                loading={isSubmitting}
                                loadingText="Updating..."
                                onClick={onSubmit}
                            >
                                Update
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}
