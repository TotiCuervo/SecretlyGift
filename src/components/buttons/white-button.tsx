import React from 'react'
import BaseButton, { BaseButtonProps } from './base-button'

type IProps = Omit<BaseButtonProps, 'customClasses'>

export default function WhiteButton({ ...props }: IProps) {
    return (
        <BaseButton
            customClasses="text-black bg-white hover:bg-gray-200 focus:bg-gray-300 focus:ring-gray-300"
            {...props}
        />
    )
}
