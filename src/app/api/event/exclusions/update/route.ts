import SupabaseServer from '@/lib/supabase/handlers/SupabaseServer'
import { Event } from '@/types/events/Event'
import { Participant } from '@/types/participant/Participant'
import { type NextRequest, NextResponse } from 'next/server'

export interface UpdateEventBody {
    participant: Participant['id']
    exclusions: Participant['id'][]
    event: Event['uuid']
}

export async function POST(req: NextRequest) {
    const supabase = SupabaseServer()

    const { participant, exclusions: exclusionIds, event } = (await req.json()) as UpdateEventBody

    const { data: exclusions, error: exclusionsError } = await supabase
        .from('exclusions')
        .select('*')
        .eq('participant', participant)
        .eq('event', event)

    if (exclusionsError) {
        console.error(exclusionsError)
        return NextResponse.error()
    }

    const idsToRemove = exclusions
        .filter((exclusion) => !exclusionIds.includes(exclusion.cannot_have_participant))
        .map((exclusion) => exclusion.id)

    const participantsToAdd = exclusionIds.filter(
        (exclusionId) => !exclusions.map((exclusion) => exclusion.cannot_have_participant).includes(exclusionId)
    )

    console.log({ idsToRemove, participantsToAdd })

    const { error: removedExclusionsError } = await supabase.from('exclusions').delete().in('id', idsToRemove)

    if (removedExclusionsError) {
        console.error(removedExclusionsError)
        return NextResponse.error()
    }

    const { data: addedExclusions, error: addedExclusionsError } = await supabase.from('exclusions').insert([
        ...participantsToAdd.map((participantId) => ({
            participant,
            cannot_have_participant: participantId,
            event
        }))
    ])

    if (addedExclusionsError) {
        console.error(addedExclusionsError)
        return NextResponse.error()
    }

    return NextResponse.json({})
}
