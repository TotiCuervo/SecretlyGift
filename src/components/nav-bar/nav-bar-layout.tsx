import { ElementType } from 'react'
import SupabaseServer from '@/lib/supabase/SupabaseServer'

interface IProps {
    Navbar: ElementType
}
export default async function NavbarLayout({ Navbar }: IProps) {
    const supabase = SupabaseServer()

    const {
        data: { session }
    } = await supabase.auth.getSession()

    return <header className="p-5">{<Navbar isSessioned={session ? true : false} />}</header>
}
