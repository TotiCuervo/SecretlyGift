import React from 'react'
import BaseButton, { BaseButtonProps } from './base-button'

type IProps = Omit<BaseButtonProps, 'customClasses'>

export default function SecondaryButton({ ...props }: IProps) {
    return <BaseButton customClasses="text-white bg-green-600 hover:bg-green-700 focus:ring-green-300" {...props} />
}
