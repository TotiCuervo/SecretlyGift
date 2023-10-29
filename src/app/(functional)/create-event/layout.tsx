import React from 'react'

interface IProps {
    children: React.ReactNode
}

export default function layout({ children }: IProps) {
    return (
        <div className="p-5 text-white">
            {/* <LogoNav /> */}
            {/* {page !== 'SubmitPage' && <StepNav />} */}

            <div className="container mx-auto">
                <div className="mx-auto w-full md:w-4/6">{children}</div>
            </div>
        </div>
    )
}
