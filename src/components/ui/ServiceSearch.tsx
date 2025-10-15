'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface ServiceSearchProps {
  services: Array<{
    id: string
    name: string
    slug: string
    category: string
    description?: string
  }>
}

export function ServiceSearch({ services }: ServiceSearchProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [showResults, setShowResults] = useState(false)
  const router = useRouter()

  const filteredServices = searchTerm
    ? services.filter(
        (service) =>
          service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : []

  const handleServiceClick = (slug: string) => {
    router.push(`/cotizar?servicio=${slug}`)
    setSearchTerm('')
    setShowResults(false)
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          placeholder="¿Qué servicio necesitas? (ej: plomero, electricista, pintor...)"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setShowResults(true)
          }}
          onFocus={() => setShowResults(true)}
          className="w-full px-6 py-4 text-lg rounded-full border-2 border-gray-300 focus:border-primary-500 focus:outline-none shadow-lg bg-white text-gray-900 placeholder:text-gray-500"
        />
        <svg
          className="absolute right-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Results dropdown */}
      {showResults && searchTerm && filteredServices.length > 0 && (
        <div className="absolute z-[9999] w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-y-auto">
          {filteredServices.map((service) => (
            <button
              key={service.id}
              onClick={() => handleServiceClick(service.slug)}
              className="w-full px-6 py-4 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-800">{service.name}</p>
                  {service.description && (
                    <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                  )}
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-primary-100 text-primary-700 font-medium">
                  {service.category}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* No results message */}
      {showResults && searchTerm && filteredServices.length === 0 && (
        <div className="absolute z-[9999] w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 px-6 py-4">
          <p className="text-gray-600 text-center">
            No se encontraron servicios. Intenta con otro término de búsqueda.
          </p>
        </div>
      )}

      {/* Click outside to close */}
      {showResults && (
        <div
          className="fixed inset-0 z-[9998]"
          onClick={() => setShowResults(false)}
        />
      )}
    </div>
  )
}

