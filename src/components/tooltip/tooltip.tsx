import React, { useState } from 'react'

interface TooltipProps {
    text: string
    children: React.ReactNode
}

const Tooltip: React.FC<TooltipProps> = ({ children, text }) => {
    const [show, setShow] = useState<boolean>(false)

    return (
        <div className="relative">
            <span onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
                {children}
            </span>
            {show ? (
                <>
                    <div className="absolute z-10 p-2 bottom-full mb-2.5 left-1/2 transform -translate-x-1/2 text-xs font-bold text-white bg-black rounded-md shadow-lg whitespace-nowrap transition-opacity duration-300 opacity-100">
                        {text}
                        <div className="bg-black h-3 w-3 absolute bottom-[-4px] transform -translate-x-1/2 left-1/2 rotate-45 transition-opacity duration-300 opacity-100" />
                    </div>
                </>
            ) : (
                <>
                    <div className="absolute z-10 p-2 bottom-full mb-2.5 left-1/2 transform -translate-x-1/2 text-xs font-bold text-white bg-black rounded-md shadow-lg whitespace-nowrap transition-opacity duration-300 opacity-0 pointer-events-none">
                        {text}
                        <div className="bg-black h-3 w-3 absolute bottom-[-4px] transform -translate-x-1/2 left-1/2 rotate-45 transition-opacity duration-300 opacity-0 pointer-events-none" />
                    </div>
                </>
            )}
        </div>
    )
}

export default Tooltip
