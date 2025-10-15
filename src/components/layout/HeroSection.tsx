'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { ServiceSearch } from '@/components/ui/ServiceSearch'
import { ToolsBackground } from '@/components/ui/ToolsBackground'
import SplitText from '@/components/ui/SplitText'
import GlareHover from '@/components/ui/GlareHover'
import { SERVICES_CATALOG } from '@/lib/services-catalog'

export function HeroSection() {
  return (
    <section className="relative text-white py-20 overflow-hidden bg-gradient-to-br from-primary-600 to-primary-800">
      <ToolsBackground />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <SplitText
            text="Profesionales Confiables para tu Proyecto"
            tag="h1"
            className="text-4xl md:text-6xl font-bold mb-6"
            delay={30}
            duration={0.8}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 50, rotationX: -90 }}
            to={{ opacity: 1, y: 0, rotationX: 0 }}
            threshold={0.2}
            rootMargin="0px"
            textAlign="center"
          />
          
          <p className="text-xl md:text-2xl mb-8 text-beige-50 opacity-0 animate-fade-in-up">
            Cotizaciones instantáneas, profesionales verificados y pago seguro
          </p>
          
          {/* Buscador de servicios */}
          <div className="mb-8 opacity-0 animate-fade-in-up animation-delay-200 relative z-[10000]">
            <ServiceSearch services={SERVICES_CATALOG} />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in-up animation-delay-400">
            <GlareHover
              width="auto"
              height="auto"
              background="transparent"
              borderRadius="8px"
              borderColor="transparent"
              glareColor="#ffffff"
              glareOpacity={0.3}
              glareAngle={-30}
              glareSize={300}
              transitionDuration={800}
              playOnce={false}
            >
              <Link href="/cotizar">
                <Button size="lg" className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white border-0">
                  Cotizar Servicio
                </Button>
              </Link>
            </GlareHover>
            
            <GlareHover
              width="auto"
              height="auto"
              background="transparent"
              borderRadius="8px"
              borderColor="transparent"
              glareColor="#ffffff"
              glareOpacity={0.3}
              glareAngle={-30}
              glareSize={300}
              transitionDuration={800}
              playOnce={false}
            >
              <Link href="/profesionales">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary-600">
                  Registrarse como Profesional
                </Button>
              </Link>
            </GlareHover>
          </div>
        </div>
      </div>
    </section>
  )
}

