import React from 'react'
import BaseButton, { BaseButtonProps } from './base-button'

type IProps = Omit<BaseButtonProps, 'customClasses'>

export default function PrimaryOutlineButton({ ...props }: IProps) { 

    return (
        <BaseButton customClasses='border border-indigo-700 text-indigo-700 hover:bg-indigo-700 hover:text-white focus:ring-indigo-300' {...props} />
    )
}
