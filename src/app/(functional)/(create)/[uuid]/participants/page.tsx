'use client'
import useParticipantByEventQuery from '@/lib/query/participants/event/useParticipantsByEventQuery'
import React from 'react'

export default function page({ params }: { params: { uuid: string } }) {
    const { data, isLoading, isError } = useParticipantByEventQuery(params.uuid)
    console.log({ data, isLoading, isError })
    return <div>page</div>
}
