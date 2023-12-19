import useAdministrativeParticipantsQuery from '@/lib/query/participants/administrative/useAdministrativeParticipantsQuery'
import { Event } from '@/types/events/Event'

interface IProps {
    event: Event['uuid']
}

export default function useDoAllParticipantsHavePossibleMatch({ event }: IProps) {
    const { data: participants = [] } = useAdministrativeParticipantsQuery(event)

    const participantsWithNoPossibleMatches = participants.filter((participant) => {
        const possibleExclusions = participants.filter((p) => {
            return (
                !(p.id === participant?.id) &&
                !p.exclusions.find((e) => e.cannot_have_participant.id === participant?.id)
            )
        })

        return possibleExclusions.length === 0
    })

    return {
        doAllParticipantsHavePossibleMatch: participantsWithNoPossibleMatches.length === 0,
        participantsWithNoPossibleMatches,
    }
}
