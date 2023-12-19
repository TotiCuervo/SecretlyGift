import React from 'react'
import BaseButton, { BaseButtonProps } from './base-button'

type IProps = Omit<BaseButtonProps, 'customClasses'>

export default function PrimaryTextButton({ ...props }: IProps) {
    return (
        <BaseButton
            customClasses="text-gray-950 font-semibold hover:text-primary-800 hover:bg-primary-100"
            {...props}
        />
    )
}
