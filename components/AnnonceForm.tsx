'use client'

import { useState, useTransition } from 'react'
import { createAnnonce } from '@/app/actions'

export default function AnnonceForm() {
  const [lat, setLat] = useState('')
  const [lng, setLng] = useState('')
  const [geoStatus, setGeoStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [isPending, startTransition] = useTransition()

  const getLocation = () => {
    if (!navigator.geolocation) return
    setGeoStatus('loading')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude.toFixed(6))
        setLng(pos.coords.longitude.toFixed(6))
        setGeoStatus('done')
      },
      () => setGeoStatus('error')
    )
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    startTransition(() => createAnnonce(formData))
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label className="label-field">Adresse ou lieu-dit *</label>
        <input
          name="adresse"
          required
          placeholder="Ex : Forêt communale de Mézières, 08300"
          className="input-field"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="label-field">Localisation GPS (optionnel)</label>
        <div className="flex gap-2">
          <input
            name="latitude"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            placeholder="Latitude"
            className="input-field w-1/2 text-sm"
          />
          <input
            name="longitude"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            placeholder="Longitude"
            className="input-field w-1/2 text-sm"
          />
        </div>
        <button
          type="button"
          onClick={getLocation}
          className="self-start text-sm text-green-700 underline underline-offset-2 flex items-center gap-1"
        >
          {geoStatus === 'loading' ? '⏳ Localisation…' : geoStatus === 'done' ? '✅ Position détectée' : geoStatus === 'error' ? '❌ Erreur GPS' : '📍 Utiliser ma position'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="label-field">Surface (ha) *</label>
          <input
            name="surface_ha"
            type="number"
            step="0.01"
            min="0.01"
            required
            placeholder="Ex : 3.5"
            className="input-field"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="label-field">Type de bois</label>
          <select name="type_bois" className="input-field">
            <option value="">— choisir —</option>
            <option value="feuillu">Feuillu</option>
            <option value="conifere">Conifère</option>
            <option value="mixte">Mixte</option>
            <option value="taillis">Taillis</option>
            <option value="autre">Autre</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="label-field">Description</label>
        <textarea
          name="description"
          rows={4}
          placeholder="Accès, état de la forêt, essences principales, motivations de vente…"
          className="input-field resize-none"
        />
      </div>

      <div className="border-t border-stone-100 pt-4 flex flex-col gap-4">
        <p className="text-sm font-semibold text-stone-600 uppercase tracking-wide">Contact</p>
        <div className="flex flex-col gap-1.5">
          <label className="label-field">Nom *</label>
          <input name="contact_nom" required placeholder="Jean Dupont" className="input-field" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="label-field">Email *</label>
          <input name="contact_email" type="email" required placeholder="jean@exemple.fr" className="input-field" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="label-field">Téléphone</label>
          <input name="contact_tel" type="tel" placeholder="06 00 00 00 00" className="input-field" />
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="mt-2 bg-green-700 hover:bg-green-800 disabled:opacity-60 text-white font-semibold rounded-xl py-3.5 transition-colors"
      >
        {isPending ? 'Publication en cours…' : 'Publier l\'annonce'}
      </button>
    </form>
  )
}
