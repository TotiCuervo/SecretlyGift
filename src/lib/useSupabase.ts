import { createClientComponentClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/schema";
import { cookies } from "next/headers";

type SupabaseType = "client" | "server";

export default function useSupabase(type: SupabaseType) {
    const clientSupabase = createClientComponentClient<Database>();
    const serverSupabase = createServerComponentClient<Database>({ cookies });

    return type === "client" ? clientSupabase : serverSupabase;
}
