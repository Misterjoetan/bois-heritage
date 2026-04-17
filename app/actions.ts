'use server'

import { redirect } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export async function createAnnonce(formData: FormData) {
  const adresse = formData.get('adresse') as string
  const latStr = formData.get('latitude') as string
  const lngStr = formData.get('longitude') as string
  const surface_ha = parseFloat(formData.get('surface_ha') as string)
  const type_bois = (formData.get('type_bois') as string) || null
  const description = (formData.get('description') as string) || null
  const contact_nom = formData.get('contact_nom') as string
  const contact_email = formData.get('contact_email') as string
  const contact_tel = (formData.get('contact_tel') as string) || null

  const { error } = await supabase.from('annonces').insert({
    adresse,
    latitude: latStr ? parseFloat(latStr) : null,
    longitude: lngStr ? parseFloat(lngStr) : null,
    surface_ha,
    type_bois,
    description,
    contact_nom,
    contact_email,
    contact_tel,
  })

  if (error) throw new Error(error.message)
  redirect('/')
}
