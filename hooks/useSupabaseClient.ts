import { createClient } from '@supabase/supabase-js'
import { useSession } from '@clerk/nextjs'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export function useSupabaseClient() {
  const { session } = useSession()

  return createClient(supabaseUrl, supabaseAnonKey, {
    async accessToken() {
      return session?.getToken() ?? null
    },
  })
}
