import Link from 'next/link'
import AnnonceForm from '@/components/AnnonceForm'

export const metadata = { title: 'Déposer une annonce — Bois Héritage' }

export default function NouvellePage() {
  return (
    <div className="min-h-screen bg-green-50">
      <header className="sticky top-0 z-10 bg-white border-b border-green-100 shadow-sm">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/" className="text-green-700 text-lg">←</Link>
          <h1 className="font-bold text-stone-800 text-lg">Déposer une annonce</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-8">
        <AnnonceForm />
      </main>
    </div>
  )
}
