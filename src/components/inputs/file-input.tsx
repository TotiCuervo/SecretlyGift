import React, { InputHTMLAttributes } from 'react'
import InputLabel from './input-label'
import SupabaseClient from '@/lib/supabase/handlers/SupabaseClient'

interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
    value: string
    name: string
    title?: string
    ref?: React.Ref<HTMLInputElement>
    error?: string
    helperText?: string
    size?: 'sm' | 'md' | 'lg'
    bucket: string
    pathLeader: string
}

export default function FileInput({
    error,
    title,
    helperText,
    size,
    value,
    onChange,
    bucket,
    pathLeader,
    ...props
}: TextInputProps) {
    const supabase = SupabaseClient()

    async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
        // @ts-ignore
        const file = e.target.files[0]
        const { data, error } = await supabase.storage.from(bucket).upload(`${pathLeader}/${file.name}`, file, {
            upsert: true
        })
        if (error) {
            console.error(error)
        }
        if (data) {
            const { data: publicData } = supabase.storage.from(bucket).getPublicUrl(data.path)
            onChange({ target: { value: publicData.publicUrl } } as any)
        }
    }

    return (
        <div>
            {title && <InputLabel error={Boolean(error)}>{title}</InputLabel>}
            <div className="flex items-center">
                <input
                    className="focus:border-primary focus:shadow-te-primary dark:focus:border-primary relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:text-neutral-700 focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100"
                    type="file"
                    id="formFile"
                    {...props}
                    onChange={handleUpload}
                />
            </div>
            {helperText && !error && <span className="p-2 text-xs text-gray-700">{helperText}</span>}
            {error && <span className="p-2 text-xs text-red-700">{error}</span>}
        </div>
    )
}
