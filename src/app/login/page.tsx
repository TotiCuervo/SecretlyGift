import AuthForm from '@/components/forms/auth-form'

export default function () {
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full">
                <h1 className="mt-10 text-center text-4xl font-bold text-gray-900">
                    Sign in to your account
                </h1>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <AuthForm />
            </div>
        </div>
    )
}
