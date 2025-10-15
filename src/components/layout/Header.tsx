import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/Button'
import StarBorder from '@/components/ui/StarBorder'

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

          <div className="hidden md:flex items-center gap-4">
            <Link href="/servicios">
              <StarBorder
                as="div"
                color="#E87900"
                speed="5s"
                className="cursor-pointer hover:scale-105 transition-transform"
              >
                Servicios
              </StarBorder>
            </Link>
            <Link href="/ciudades">
              <StarBorder
                as="div"
                color="#D2B48C"
                speed="4.5s"
                className="cursor-pointer hover:scale-105 transition-transform"
              >
                Ciudades
              </StarBorder>
            </Link>
            <Link href="/como-funciona">
              <StarBorder
                as="div"
                color="#5D4037"
                speed="5.5s"
                className="cursor-pointer hover:scale-105 transition-transform"
              >
                Cómo Funciona
              </StarBorder>
            </Link>
            <Link href="/profesionales">
              <StarBorder
                as="div"
                color="#F5A641"
                speed="4s"
                className="cursor-pointer hover:scale-105 transition-transform"
              >
                Para Profesionales
              </StarBorder>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Link href="/dashboard">
                  <StarBorder
                    as="div"
                    color="#E87900"
                    speed="5s"
                    className="cursor-pointer hover:scale-105 transition-transform"
                  >
                    Dashboard
                  </StarBorder>
                </Link>
                <Link href="/api/auth/signout">
                  <StarBorder
                    as="div"
                    color="#5D4037"
                    speed="4s"
                    className="cursor-pointer hover:scale-105 transition-transform"
                  >
                    Salir
                  </StarBorder>
                </Link>
              </>
            ) : (
              <>
                <Link href="/auth/signin">
                  <StarBorder
                    as="div"
                    color="#D2B48C"
                    speed="5.5s"
                    className="cursor-pointer hover:scale-105 transition-transform"
                  >
                    Iniciar Sesión
                  </StarBorder>
                </Link>
                <Link href="/auth/signup">
                  <StarBorder
                    as="div"
                    color="#E87900"
                    speed="4.5s"
                    className="cursor-pointer hover:scale-105 transition-transform registro-button"
                  >
                    Registrarse
                  </StarBorder>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

