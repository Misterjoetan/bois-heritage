import Link from 'next/link'
import { supabase, Annonce } from '@/lib/supabase'
import AnnonceCard from '@/components/AnnonceCard'

export const revalidate = 0

export default async function HomePage() {
  const { data: annonces } = await supabase
    .from('annonces')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-green-50">
      <header className="sticky top-0 z-10 bg-white border-b border-green-100 shadow-sm">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-bold text-green-800 text-xl leading-tight">🌲 Bois Héritage</h1>
            <p className="text-xs text-stone-400">Achetez et vendez vos parcelles forestières</p>
          </div>
          <Link
            href="/nouvelle"
            className="bg-green-700 hover:bg-green-800 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
          >
            + Annonce
          </Link>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6">
        {!annonces || annonces.length === 0 ? (
          <div className="text-center py-20 flex flex-col items-center gap-4">
            <span className="text-5xl">🌳</span>
            <p className="text-stone-500 text-base">Aucune annonce pour l&apos;instant.</p>
            <Link
              href="/nouvelle"
              className="bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Soyez le premier à publier
            </Link>
          </div>
        ) : (
          <>
            <p className="text-sm text-stone-400 mb-4">
              {annonces.length} annonce{annonces.length > 1 ? 's' : ''}
            </p>
            <div className="flex flex-col gap-4">
              {(annonces as Annonce[]).map((a) => (
                <AnnonceCard key={a.id} annonce={a} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  )
}
