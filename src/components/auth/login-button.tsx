import React from 'react'
import PrimaryButton from '../buttons/primary-button'
import { StatusMessage } from '@/types/StatusMessage'
import { twMerge } from 'tailwind-merge'
interface IProps {
    isSubmitting: boolean
    status: StatusMessage | undefined
}

export default function LoginButton({ isSubmitting, status }: IProps) {
    return (
        <>
            <PrimaryButton
                type="submit"
                loading={isSubmitting}
                loadingText="Sending..."
                className="text-lg sm:text-base"
            >
                Send Magic Link
            </PrimaryButton>
            {status && (
                <div
                    className={twMerge(
                        `mt-4 rounded-md border-2 p-4 text-center text-sm sm:text-base`,
                        status.type === 'success'
                            ? 'border-green-500 bg-green-50 text-green-500 '
                            : 'border-red-500 bg-red-50 text-red-500'
                    )}
                >
                    {status.message}
                </div>
            )}
        </>
    )
}
