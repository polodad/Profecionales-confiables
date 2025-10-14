import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/Button'

export async function Header() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary-600">
            Profesionales Confiables
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/servicios" className="text-gray-700 hover:text-primary-600">
              Servicios
            </Link>
            <Link href="/como-funciona" className="text-gray-700 hover:text-primary-600">
              Cómo Funciona
            </Link>
            <Link href="/profesionales" className="text-gray-700 hover:text-primary-600">
              Para Profesionales
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost">Dashboard</Button>
                </Link>
                <Link href="/api/auth/signout">
                  <Button variant="outline" size="sm">Salir</Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/auth/signin">
                  <Button variant="ghost" size="sm">Iniciar Sesión</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm">Registrarse</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

