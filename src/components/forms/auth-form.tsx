'use client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa, ThemeMinimal } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/schema'

export default function AuthForm() {
    const supabase = createClientComponentClient<Database>()

    return (
        <Auth
            supabaseClient={supabase}
            view="magic_link"
            appearance={{
                theme: ThemeSupa,
                className: {
                    label: '!text-md !font-medium !leading-6 !text-gray-900 !capitalize',
                    button: '!rounded-md !px-3 !py-3 !text-md !font-semibold !leading-6 !shadow-sm !focus-visible:outline !focus-visible:outline-2 !focus-visible:outline-offset-2',
                    input: '!rounded-md !border-0 !py-3 !text-gray-900 !shadow-sm !ring-1 !ring-inset !ring-gray-300 !placeholder:text-gray-400 !focus:ring-2 !focus:ring-inset focus:ring-black !sm:text-sm !sm:leading-6'
                },
                variables: {
                    default: {
                        colors: {
                            brand: 'rgb(67, 56, 202)',
                            brandAccent: 'rgb(55, 48, 163)'
                        }
                    }
                }
            }}
            showLinks={false}
            providers={[]}
            redirectTo={location.origin + '/api/auth/callback'}
        />
    )
}
