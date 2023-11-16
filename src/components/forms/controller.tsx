import React from 'react'
import { Controller as _C, ControllerProps } from 'react-hook-form'

export default function Controller({ ...props }: ControllerProps<any, any>) {
    return (
        <_C
            {...props}
            render={({ ...renderProps }) =>
                React.cloneElement(props.render(renderProps), {
                    ...renderProps.field,
                    ref: null
                })
            }
        />
    )
}
