import React from 'react'
import BaseButton, { BaseButtonProps } from './base-button'

type IProps = Omit<BaseButtonProps, 'customClasses'>

export default function PrimaryButton({ ...props }: IProps) {
    return (
        <BaseButton
            customClasses="text-white bg-primary-500 hover:bg-primary-600 focus:bg-primary-700 focus:ring-primary-300"
            {...props}
        />
    )
}
