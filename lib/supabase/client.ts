// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

export const supabase = createBrowserClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
)
// export const supabaseService = createBrowserClient(
//   process.env.SUPABASE_URL!,
//   process.env.SUPABASE_SERVICE_ROLE_KEY!
// )