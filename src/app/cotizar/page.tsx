'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/Card'
import { formatCurrency } from '@/lib/utils'
import type { City, Service, QuoteInputs } from '@/types'

export default function CotizarPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [step, setStep] = useState(1)
  const [cities, setCities] = useState<City[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(false)

  // Form state
  const [selectedCity, setSelectedCity] = useState<City | null>(null)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [inputs, setInputs] = useState<QuoteInputs>({})
  const [urgency, setUrgency] = useState<string>('')
  const [quote, setQuote] = useState<any>(null)

  // Load cities and services
  useEffect(() => {
    async function loadData() {
      const [citiesRes, servicesRes] = await Promise.all([
        fetch('/api/cities'),
        fetch('/api/services'),
      ])

      const citiesData = await citiesRes.json()
      const servicesData = await servicesRes.json()

      setCities(citiesData)
      setServices(servicesData)

      // Pre-select from URL params
      const citySlug = searchParams.get('ciudad')
      const serviceSlug = searchParams.get('servicio')

      if (citySlug) {
        const city = citiesData.find((c: City) => c.slug === citySlug)
        if (city) setSelectedCity(city)
      }

      if (serviceSlug) {
        const service = servicesData.find((s: Service) => s.slug === serviceSlug)
        if (service) setSelectedService(service)
      }

      if (citySlug && serviceSlug) {
        setStep(2)
      }
    }

    loadData()
  }, [searchParams])

  const handleGenerateQuote = async () => {
    if (!selectedCity || !selectedService) return

    setLoading(true)

    try {
      const response = await fetch('/api/quotes/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cityId: selectedCity.id,
          serviceId: selectedService.id,
          inputs,
          urgency,
        }),
      })

      const result = await response.json()

      if (result.error) {
        alert(result.error)
      } else {
        setQuote(result.data)
        setStep(3)
      }
    } catch (error) {
      alert('Error al generar la cotización')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-4">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      step >= s
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    {s}
                  </div>
                  {s < 3 && (
                    <div
                      className={`w-16 h-1 mx-2 ${
                        step > s ? 'bg-primary-600' : 'bg-gray-300'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between max-w-md mx-auto mt-2 text-sm text-gray-600">
              <span>Servicio</span>
              <span>Detalles</span>
              <span>Cotización</span>
            </div>
          </div>

          {/* Step 1: Select City & Service */}
          {step === 1 && (
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold">¿Qué servicio necesitas?</h2>
                <p className="text-gray-600 mt-1">
                  Selecciona tu ciudad y el tipo de servicio
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Ciudad</label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                    value={selectedCity?.id || ''}
                    onChange={(e) => {
                      const city = cities.find((c) => c.id === e.target.value)
                      setSelectedCity(city || null)
                    }}
                  >
                    <option value="">Selecciona una ciudad</option>
                    {cities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Servicio</label>
                  <div className="grid md:grid-cols-2 gap-4">
                    {services.map((service) => (
                      <button
                        key={service.id}
                        onClick={() => setSelectedService(service)}
                        className={`p-4 border-2 rounded-lg text-left transition-all ${
                          selectedService?.id === service.id
                            ? 'border-primary-600 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <h3 className="font-semibold">{service.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Desde {formatCurrency(service.base_price)}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => setStep(2)}
                  disabled={!selectedCity || !selectedService}
                  className="ml-auto"
                >
                  Continuar
                </Button>
              </CardFooter>
            </Card>
          )}

          {/* Step 2: Service Details */}
          {step === 2 && selectedService && (
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold">Detalles del servicio</h2>
                <p className="text-gray-600 mt-1">
                  Cuéntanos más sobre {selectedService.name.toLowerCase()}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Dynamic inputs based on service rules */}
                {(selectedService.rules_json as any).tarifa_m2 && (
                  <Input
                    type="number"
                    label="Metros cuadrados (m²)"
                    placeholder="Ej: 50"
                    value={inputs.m2 || ''}
                    onChange={(e) =>
                      setInputs({ ...inputs, m2: parseFloat(e.target.value) })
                    }
                    required
                  />
                )}

                {(selectedService.rules_json as any).tarifa_punto && (
                  <Input
                    type="number"
                    label="Número de puntos"
                    placeholder="Ej: 5"
                    value={inputs.puntos || ''}
                    onChange={(e) =>
                      setInputs({ ...inputs, puntos: parseInt(e.target.value) })
                    }
                    required
                  />
                )}

                {(selectedService.rules_json as any).tarifa_unidad && (
                  <Input
                    type="number"
                    label="Número de unidades"
                    placeholder="Ej: 3"
                    value={inputs.unidades || ''}
                    onChange={(e) =>
                      setInputs({ ...inputs, unidades: parseInt(e.target.value) })
                    }
                    required
                  />
                )}

                <div>
                  <label className="block text-sm font-medium mb-2">
                    ¿Qué tan urgente es?
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value)}
                  >
                    <option value="">Flexible (sin recargo)</option>
                    <option value="24-48h">En 24-48 horas (+10-15%)</option>
                    <option value="mismo_dia">Mismo día (+20-25%)</option>
                    <option value="2-6h">Urgente 2-6 horas (+30-35%)</option>
                  </select>
                </div>

                {(selectedService.rules_json as any).recargo_altura && (
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="altura"
                      checked={inputs.altura_mayor_3m || false}
                      onChange={(e) =>
                        setInputs({ ...inputs, altura_mayor_3m: e.target.checked })
                      }
                      className="w-4 h-4"
                    />
                    <label htmlFor="altura" className="text-sm">
                      Trabajo en altura mayor a 3 metros (+15%)
                    </label>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="zona"
                    checked={inputs.zona_lejana || false}
                    onChange={(e) =>
                      setInputs({ ...inputs, zona_lejana: e.target.checked })
                    }
                    className="w-4 h-4"
                  />
                  <label htmlFor="zona" className="text-sm">
                    Zona foránea o de difícil acceso (cargo adicional)
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Descripción del trabajo (opcional)
                  </label>
                  <textarea
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                    rows={4}
                    placeholder="Describe cualquier detalle adicional..."
                    value={inputs.descripcion || ''}
                    onChange={(e) =>
                      setInputs({ ...inputs, descripcion: e.target.value })
                    }
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Atrás
                </Button>
                <Button onClick={handleGenerateQuote} disabled={loading}>
                  {loading ? 'Generando...' : 'Generar Cotización'}
                </Button>
              </CardFooter>
            </Card>
          )}

          {/* Step 3: Quote Result */}
          {step === 3 && quote && (
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold">Tu Cotización</h2>
                <p className="text-gray-600 mt-1">
                  Precio estimado para {selectedService?.name}
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Price Range */}
                <div className="bg-primary-50 border-2 border-primary-200 rounded-lg p-6 text-center">
                  <p className="text-sm text-gray-600 mb-2">Rango estimado</p>
                  <p className="text-4xl font-bold text-primary-600 mb-2">
                    {formatCurrency(quote.min_range)} - {formatCurrency(quote.max_range)}
                  </p>
                  <p className="text-sm text-gray-600">
                    Precio base: {formatCurrency(quote.total)}
                  </p>
                </div>

                {/* Breakdown */}
                <div className="space-y-2">
                  <h3 className="font-semibold">Desglose:</h3>
                  <div className="space-y-1 text-sm">
                    {quote.base_visit > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Visita base:</span>
                        <span>{formatCurrency(quote.base_visit)}</span>
                      </div>
                    )}
                    {quote.labor > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Mano de obra:</span>
                        <span>{formatCurrency(quote.labor)}</span>
                      </div>
                    )}
                    {quote.urgency_fee > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Cargo por urgencia:</span>
                        <span className="text-orange-600">
                          +{formatCurrency(quote.urgency_fee)}
                        </span>
                      </div>
                    )}
                    {quote.height_fee > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Cargo por altura:</span>
                        <span className="text-orange-600">
                          +{formatCurrency(quote.height_fee)}
                        </span>
                      </div>
                    )}
                    {quote.zone_fee > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Cargo por zona:</span>
                        <span className="text-orange-600">
                          +{formatCurrency(quote.zone_fee)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Next Steps */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Próximos pasos:</h3>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
                    <li>Crea tu cuenta o inicia sesión</li>
                    <li>Completa los detalles de la solicitud</li>
                    <li>Paga un anticipo del 20% ({formatCurrency(quote.total * 0.2)})</li>
                    <li>Un profesional verificado realizará el trabajo</li>
                    <li>Paga el saldo restante al finalizar</li>
                  </ol>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Modificar
                </Button>
                <Button onClick={() => router.push('/auth/signup')}>
                  Continuar con la Reserva
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

