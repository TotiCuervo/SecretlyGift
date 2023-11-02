import { ElementType } from 'react'
import useSupabase from '@/lib/supabase/useSupabase'

interface IProps {
    Navbar: ElementType
}
export default async function NavbarLayout({ Navbar }: IProps) {
    const supabase = useSupabase('server')

    const {
        data: { session }
    } = await supabase.auth.getSession()

    return <header className="p-5">{<Navbar isSessioned={session ? true : false} />}</header>
}
