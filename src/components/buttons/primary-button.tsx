import React from 'react'
import BaseButton, { BaseButtonProps } from './base-button'

type IProps = Omit<BaseButtonProps, 'customClasses'>

export default function PrimaryButton({ ...props }: IProps) { 

    return (
        <BaseButton customClasses='text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-indigo-300' {...props} />
    )
}
