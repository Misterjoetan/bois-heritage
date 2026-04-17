import { Annonce } from '@/lib/supabase'

const TYPE_BOIS_LABELS: Record<string, string> = {
  feuillu: 'Feuillu',
  conifere: 'Conifère',
  mixte: 'Mixte',
  taillis: 'Taillis',
  autre: 'Autre',
}

export default function AnnonceCard({ annonce }: { annonce: Annonce }) {
  const date = new Date(annonce.created_at).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-semibold text-stone-800 text-base leading-tight">{annonce.adresse}</p>
          <p className="text-xs text-stone-400 mt-0.5">{date}</p>
        </div>
        <span className="shrink-0 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full">
          {annonce.surface_ha} ha
        </span>
      </div>

      {annonce.type_bois && (
        <span className="self-start bg-amber-50 text-amber-700 text-xs font-medium px-2.5 py-1 rounded-full border border-amber-200">
          {TYPE_BOIS_LABELS[annonce.type_bois] ?? annonce.type_bois}
        </span>
      )}

      {annonce.description && (
        <p className="text-sm text-stone-600 line-clamp-3">{annonce.description}</p>
      )}

      <div className="pt-2 border-t border-stone-100 flex flex-col gap-1">
        <p className="text-sm font-medium text-stone-700">{annonce.contact_nom}</p>
        <a
          href={`mailto:${annonce.contact_email}`}
          className="text-sm text-green-700 underline underline-offset-2 break-all"
        >
          {annonce.contact_email}
        </a>
        {annonce.contact_tel && (
          <a href={`tel:${annonce.contact_tel}`} className="text-sm text-stone-500">
            {annonce.contact_tel}
          </a>
        )}
      </div>
    </div>
  )
}
