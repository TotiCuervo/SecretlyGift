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
import { Participant } from '@/types/participant/Participant'
import InputLabel from '@/components/inputs/input-label'
import { updateExclusions } from '@/endpoints/event/update-exclusions'
import useAdministrativeParticipantsInvalidation from '@/lib/query/participants/administrative/useParticipantsByEventQueryInvalidation'
import ParticipantProfile from '@/app/events/[uuid]/manage/_components/participant-profile'

interface IProps extends ModalProps {
    event: Event['uuid']
    participant: AdministrativeParticipantView
}

export default function AddExclusionModal({ setIsOpen, event, participant, ...props }: IProps) {
    const { data: participants = [] } = useAdministrativeParticipantsQuery(event)
    const invalidate = useAdministrativeParticipantsInvalidation()

    const [status, setStatus] = useState<StatusMessage>()
    const [cannotBeMatchedWith, setCannotBeMatchedWith] = useState<Participant['id'][]>([])

    const exclusions = participants.filter((participant) =>
        cannotBeMatchedWith.some((exclusion) => exclusion === participant.id)
    )

    const possibleExclusions = participants.filter((p) => {
        return !(p.id === participant?.id || cannotBeMatchedWith.some((exclusion) => exclusion === p.id))
    })

    const atLeastOnePossibleMatch = possibleExclusions.length >= 1

    const disabled = !atLeastOnePossibleMatch

    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        if (props.isOpen) {
            if (atLeastOnePossibleMatch) {
                setStatus(undefined)
            }
            setCannotBeMatchedWith(participant.exclusions.map((exclusion) => exclusion.cannot_have_participant.id))
        }
    }, [props.isOpen])

    useEffect(() => {
        if (atLeastOnePossibleMatch) {
            setStatus(undefined)
        } else {
            setStatus({
                type: 'error',
                message: 'You must have at least one possible match'
            })
        }
    }, [atLeastOnePossibleMatch])

    function handleExclusionOnSelect(id: Participant['id']) {
        setCannotBeMatchedWith([...cannotBeMatchedWith, id])
    }

    function deleteExclusion(id: Participant['id']) {
        setCannotBeMatchedWith(cannotBeMatchedWith.filter((exclusion) => exclusion !== id))
    }

    async function onSubmit() {
        setIsSubmitting(true)
        try {
            await updateExclusions({
                participant: participant?.id as number,
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
                            Add or remove people that {participant.name} cannot be matched with.
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
                            <div className="flex flex-col">
                                <InputLabel>Participant</InputLabel>
                                <ParticipantProfile profile={participant.profile} name={participant.name} />
                            </div>
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
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end border-t border-gray-300 px-6 py-4">
                        <div className="flex justify-end gap-3">
                            <PrimaryGhostButton onClick={() => setIsOpen(false)}>Cancel</PrimaryGhostButton>
                            <PrimaryButton
                                disabled={disabled}
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
