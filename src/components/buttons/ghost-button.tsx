import React from 'react'
import BaseButton, { BaseButtonProps } from './base-button'

type IProps = Omit<BaseButtonProps, 'customClasses'>

export default function GhostButton({ ...props }: IProps) {
    return (
        <BaseButton
            customClasses="text-black hover:bg-indigo-50 hover:text-indigo-950 focus:ring-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:ring-transparent"
            {...props}
        />
    )
}
