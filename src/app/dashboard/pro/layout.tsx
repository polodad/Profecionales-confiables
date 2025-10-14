import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function ProDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/signin')
  }

  // Verificar que el usuario es un profesional
  const { data: pro } = await supabase
    .from('pros')
    .select('*, users!inner(*)')
    .eq('user_id', user.id)
    .single()

  if (!pro) {
    redirect('/profesionales/registro')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard/pro" className="text-xl font-bold text-primary-600">
              Panel Profesional
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {(pro.users as any)?.full_name}
              </span>
              {pro.kyc_status === 'pending' && (
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
                  Verificación pendiente
                </span>
              )}
              {pro.kyc_status === 'approved' && (
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                  ✓ Verificado
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex gap-6">
            <Link
              href="/dashboard/pro"
              className="py-4 px-2 border-b-2 border-transparent hover:border-primary-600 text-gray-600 hover:text-primary-600"
            >
              Trabajos Disponibles
            </Link>
            <Link
              href="/dashboard/pro/mis-trabajos"
              className="py-4 px-2 border-b-2 border-transparent hover:border-primary-600 text-gray-600 hover:text-primary-600"
            >
              Mis Trabajos
            </Link>
            <Link
              href="/dashboard/pro/historial"
              className="py-4 px-2 border-b-2 border-transparent hover:border-primary-600 text-gray-600 hover:text-primary-600"
            >
              Historial
            </Link>
            <Link
              href="/dashboard/pro/perfil"
              className="py-4 px-2 border-b-2 border-transparent hover:border-primary-600 text-gray-600 hover:text-primary-600"
            >
              Mi Perfil
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  )
}

