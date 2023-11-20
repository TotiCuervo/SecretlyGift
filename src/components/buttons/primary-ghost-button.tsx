import React from 'react'
import BaseButton, { BaseButtonProps } from './base-button'

type IProps = Omit<BaseButtonProps, 'customClasses'>

export default function PrimaryGhostButton({ ...props }: IProps) {
    return (
        <BaseButton
            customClasses="text-black hover:bg-primary-50 hover:text-primary-950 focus:ring-primary-300 border border-transparent hover:border-primary-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:ring-transparent"
            {...props}
        />
    )
}
