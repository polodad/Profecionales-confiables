import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-primary-900 text-beige-100 py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">
              Profesionales Confiables
            </h3>
            <p className="text-sm text-beige-100">
              La plataforma más confiable para contratar servicios del hogar en México
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Para Clientes</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/cotizar" className="text-beige-100 hover:text-orange-400 transition-colors">
                  Cotizar Servicio
                </Link>
              </li>
              <li>
                <Link href="/servicios" className="text-beige-100 hover:text-orange-400 transition-colors">
                  Ver Servicios
                </Link>
              </li>
              <li>
                <Link href="/como-funciona" className="text-beige-100 hover:text-orange-400 transition-colors">
                  Cómo Funciona
                </Link>
              </li>
              <li>
                <Link href="/garantias" className="text-beige-100 hover:text-orange-400 transition-colors">
                  Garantías
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Para Profesionales</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/profesionales" className="text-beige-100 hover:text-orange-400 transition-colors">
                  Registrarse
                </Link>
              </li>
              <li>
                <Link href="/profesionales/beneficios" className="text-beige-100 hover:text-orange-400 transition-colors">
                  Beneficios
                </Link>
              </li>
              <li>
                <Link href="/profesionales/requisitos" className="text-beige-100 hover:text-orange-400 transition-colors">
                  Requisitos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terminos" className="text-beige-100 hover:text-orange-400 transition-colors">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link href="/privacidad" className="text-beige-100 hover:text-orange-400 transition-colors">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/disputas" className="text-beige-100 hover:text-orange-400 transition-colors">
                  Política de Disputas
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-beige-100 hover:text-orange-400 transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-700 mt-8 pt-8 text-sm text-center">
          <p className="text-beige-100">© {new Date().getFullYear()} Profesionales Confiables. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

