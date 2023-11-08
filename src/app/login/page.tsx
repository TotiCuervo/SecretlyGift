import Form from './_components/form'

export default function Page() {
    return (
        <div className="h-screen p-5 sm:p-0">
            <div className="pt-20">
                <div className="mx-auto w-full max-w-xl rounded-xl bg-white p-8 shadow-lg">
                    <Form />
                </div>
            </div>
        </div>
    )
}
