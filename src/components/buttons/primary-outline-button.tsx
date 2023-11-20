import React from 'react'
import BaseButton, { BaseButtonProps } from './base-button'

type IProps = Omit<BaseButtonProps, 'customClasses'>

export default function PrimaryOutlineButton({ ...props }: IProps) {
    return (
        <BaseButton
            customClasses="border border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white focus:ring-primary-300"
            {...props}
        />
    )
}
