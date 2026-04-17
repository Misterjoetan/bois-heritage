import { createClient } from '@supabase/supabase-js'

export type Annonce = {
  id: string
  created_at: string
  adresse: string
  latitude: number | null
  longitude: number | null
  surface_ha: number
  type_bois: string | null
  description: string | null
  contact_nom: string
  contact_email: string
  contact_tel: string | null
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://placeholder.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'placeholder'

export const supabase = createClient(supabaseUrl, supabaseKey)
