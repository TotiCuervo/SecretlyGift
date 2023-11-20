'use client'
import ParticipantSection from './_components/participation-section/participant-section'

interface IProps {
    params: {
        uuid: string
    }
}

export default function Page({ params }: IProps) {
    const { uuid } = params
    return <ParticipantSection event={uuid} />
}
