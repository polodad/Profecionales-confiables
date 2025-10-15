import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/Button'

export async function Header() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <header className="bg-white border-b border-beige-200 sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo-profecione.png"
              alt="Profesionales Confiables"
              width={250}
              height={75}
              className="h-16 w-auto"
            />
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/servicios" className="text-primary-600 hover:text-orange-500 transition-colors">
              Servicios
            </Link>
            <Link href="/como-funciona" className="text-primary-600 hover:text-orange-500 transition-colors">
              Cómo Funciona
            </Link>
            <Link href="/profesionales" className="text-primary-600 hover:text-orange-500 transition-colors">
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
                  <Button variant="outline" size="sm" className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">Salir</Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/auth/signin">
                  <Button variant="ghost" size="sm">Iniciar Sesión</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white border-0">Registrarse</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

