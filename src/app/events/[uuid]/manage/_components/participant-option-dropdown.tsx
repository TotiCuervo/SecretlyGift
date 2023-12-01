import Dropdown, { MenuItem } from '@/components/dropdown/dropdown'
import { AdministrativeParticipantView } from '@/types/participant/AdministrativeParticipantView'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline'

interface IProps {
    participant: AdministrativeParticipantView
}

export default function ParticipantOptionDropdown({ participant }: IProps) {
    const menuItems: MenuItem[] = [
        {
            name: 'Make admin',
            type: 'button',
            action: () => {
                console.log('make admin')
            }
        }
    ]
    return (
        <Dropdown menuItems={menuItems}>
            <EllipsisHorizontalIcon className="h-6 w-6 text-gray-800" />
        </Dropdown>
    )
}
