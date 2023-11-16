'use client'
import ConfettiCannon from 'react-confetti'
import { IConfettiOptions } from 'react-confetti/dist/types/Confetti'
import useWindowSize from 'react-use/lib/useWindowSize'

interface IProps extends Partial<IConfettiOptions> {
    run: boolean
}

export default function Confetti({ run, numberOfPieces = 400, recycle = false, width, height, ...props }: IProps) {
    const { width: wWidth, height: wHeight } = useWindowSize()

    return (
        <ConfettiCannon
            numberOfPieces={400}
            width={width ?? wWidth}
            height={height ?? wHeight}
            run={run}
            recycle={recycle}
            {...props}
        />
    )
}
