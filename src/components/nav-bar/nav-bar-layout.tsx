import { ElementType } from 'react'
import useSupabaseServer from '@/lib/supabase/useSupabaseServer'

interface IProps {
    Navbar: ElementType
}
export default async function NavbarLayout({ Navbar }: IProps) {
    const supabase = useSupabaseServer()

    const {
        data: { session }
    } = await supabase.auth.getSession()

    return <header className="p-5">{<Navbar isSessioned={session ? true : false} />}</header>
}
