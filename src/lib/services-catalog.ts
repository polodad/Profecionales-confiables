// Catálogo completo de servicios organizados por categoría

export interface ServiceItem {
  id: string
  name: string
  slug: string
  description: string
  category: string
  keywords?: string[]
}

export const SERVICE_CATEGORIES = {
  'obra-civil': {
    name: 'Obra Civil y Estructura',
    icon: '🏗️',
    description: 'Construcción, remodelación y trabajos estructurales',
  },
  'acabados': {
    name: 'Acabados e Interiores',
    icon: '🎨',
    description: 'Pisos, azulejos, pintura y acabados decorativos',
  },
  'carpinteria': {
    name: 'Carpintería y Mobiliario',
    icon: '🪚',
    description: 'Muebles a medida, puertas, closets y cocinas',
  },
  'instalaciones': {
    name: 'Instalaciones Técnicas',
    icon: '🔧',
    description: 'Electricidad, plomería, gas y sistemas especializados',
  },
  'metalmecánica': {
    name: 'Metalmecánica y Cerramientos',
    icon: '⚒️',
    description: 'Herrería, soldadura, cerrajería y vidriería',
  },
  'exteriores': {
    name: 'Exteriores y Áreas Verdes',
    icon: '🌳',
    description: 'Jardinería, paisajismo y mantenimiento exterior',
  },
  'mantenimiento': {
    name: 'Mantenimiento y Limpieza',
    icon: '🧹',
    description: 'Limpieza profesional y mantenimiento general',
  },
  'automotriz': {
    name: 'Automotriz y Transporte',
    icon: '🚗',
    description: 'Mecánica, transporte y servicios vehiculares',
  },
} as const

export const SERVICES_CATALOG: ServiceItem[] = [
  // 1) Obra Civil y Estructura
  {
    id: 'albanileria',
    name: 'Albañilería',
    slug: 'albanileria',
    description: 'Obra negra y ligera, construcción y reparación de muros',
    category: 'Obra Civil y Estructura',
    keywords: ['construcción', 'muros', 'obra negra', 'cimientos'],
  },
  {
    id: 'techado',
    name: 'Techado e Impermeabilización',
    slug: 'techado',
    description: 'Instalación de techos, impermeabilización (cotización por m²)',
    category: 'Obra Civil y Estructura',
    keywords: ['techo', 'impermeabilizar', 'goteras', 'láminas'],
  },

  // 2) Acabados e Interiores
  {
    id: 'albanileria-acabados',
    name: 'Albañilería de Acabados',
    slug: 'albanileria-acabados',
    description: 'Instalación de piso, loseta y recubrimientos',
    category: 'Acabados e Interiores',
    keywords: ['piso', 'loseta', 'recubrimientos', 'acabados'],
  },
  {
    id: 'azulejeria',
    name: 'Azulejería',
    slug: 'azulejeria',
    description: 'Instalación especializada de azulejos y recubrimientos cerámicos',
    category: 'Acabados e Interiores',
    keywords: ['azulejo', 'cerámica', 'mosaico', 'baño', 'cocina'],
  },
  {
    id: 'yeseria',
    name: 'Yesería',
    slug: 'yeseria',
    description: 'Aplicación y acabados de yeso, plafones y detalles',
    category: 'Acabados e Interiores',
    keywords: ['yeso', 'plafón', 'molduras', 'escayola'],
  },
  {
    id: 'pintura',
    name: 'Pintura',
    slug: 'pintura',
    description: 'Pintura de interiores y exteriores, decorativa y protectora',
    category: 'Acabados e Interiores',
    keywords: ['pintor', 'pintura', 'color', 'fachada'],
  },
  {
    id: 'tapiceria',
    name: 'Tapicería',
    slug: 'tapiceria',
    description: 'Tapizado de muebles y paredes acústicas',
    category: 'Acabados e Interiores',
    keywords: ['tapiz', 'muebles', 'tela', 'retapizado', 'acústico'],
  },

  // 3) Carpintería y Mobiliario
  {
    id: 'carpinteria',
    name: 'Carpintería',
    slug: 'carpinteria',
    description: 'Puertas, closets, cocinas y muebles a medida',
    category: 'Carpintería y Mobiliario',
    keywords: ['madera', 'puertas', 'closet', 'cocina', 'muebles'],
  },

  // 4) Instalaciones Técnicas
  {
    id: 'electricidad',
    name: 'Electricidad',
    slug: 'electricidad',
    description: 'Instalación y reparación de sistemas eléctricos residenciales',
    category: 'Instalaciones Técnicas',
    keywords: ['electricista', 'luz', 'corto circuito', 'tablero', 'contactos'],
  },
  {
    id: 'plomeria',
    name: 'Plomería / Fontanería',
    slug: 'plomeria',
    description: 'Reparación de fugas, instalaciones hidráulicas y sanitarias',
    category: 'Instalaciones Técnicas',
    keywords: ['plomero', 'fontanero', 'agua', 'fuga', 'tubería', 'baño'],
  },
  {
    id: 'instalacion-gas',
    name: 'Instalación de Gas',
    slug: 'instalacion-gas',
    description: 'Instalación y mantenimiento de sistemas de gas LP y natural',
    category: 'Instalaciones Técnicas',
    keywords: ['gas', 'tubería', 'calentador', 'estufa'],
  },
  {
    id: 'aire-acondicionado',
    name: 'Aire Acondicionado',
    slug: 'aire-acondicionado',
    description: 'Instalación, mantenimiento y reparación de sistemas de climatización',
    category: 'Instalaciones Técnicas',
    keywords: ['clima', 'aire', 'minisplit', 'refrigeración', 'climatización'],
  },
  {
    id: 'cctv',
    name: 'Instalación de CCTV',
    slug: 'cctv',
    description: 'Sistemas de videovigilancia y cámaras de seguridad',
    category: 'Instalaciones Técnicas',
    keywords: ['cámaras', 'seguridad', 'vigilancia', 'video'],
  },
  {
    id: 'paneles-solares',
    name: 'Paneles Solares',
    slug: 'paneles-solares',
    description: 'Instalación de sistemas de energía solar fotovoltaica',
    category: 'Instalaciones Técnicas',
    keywords: ['solar', 'energía', 'fotovoltaico', 'sustentable'],
  },

  // 5) Metalmecánica y Cerramientos
  {
    id: 'herreria',
    name: 'Herrería',
    slug: 'herreria',
    description: 'Fabricación e instalación de rejas, portones y estructuras metálicas',
    category: 'Metalmecánica y Cerramientos',
    keywords: ['herrero', 'reja', 'portón', 'metal', 'hierro'],
  },
  {
    id: 'soldadura',
    name: 'Soldadura',
    slug: 'soldadura',
    description: 'Trabajos de soldadura y reparación de estructuras metálicas',
    category: 'Metalmecánica y Cerramientos',
    keywords: ['soldar', 'metal', 'acero', 'reparación'],
  },
  {
    id: 'cerrajeria',
    name: 'Cerrajería',
    slug: 'cerrajeria',
    description: 'Apertura, instalación y cambio de cerraduras y chapas',
    category: 'Metalmecánica y Cerramientos',
    keywords: ['cerrajero', 'cerradura', 'chapa', 'llave', 'abrir puerta'],
  },
  {
    id: 'vidrieria',
    name: 'Vidriería',
    slug: 'vidrieria',
    description: 'Instalación de cristales, cancelería y espejos',
    category: 'Metalmecánica y Cerramientos',
    keywords: ['vidrio', 'cristal', 'ventana', 'espejo', 'cancelería'],
  },

  // 6) Exteriores y Áreas Verdes
  {
    id: 'jardineria',
    name: 'Jardinería',
    slug: 'jardineria',
    description: 'Paisajismo, poda, riego y mantenimiento de áreas verdes',
    category: 'Exteriores y Áreas Verdes',
    keywords: ['jardín', 'plantas', 'poda', 'césped', 'paisajismo', 'riego'],
  },

  // 7) Mantenimiento y Limpieza
  {
    id: 'limpieza',
    name: 'Limpieza y Mantenimiento',
    slug: 'limpieza',
    description: 'Limpieza profunda, multiservicio y mantenimiento preventivo',
    category: 'Mantenimiento y Limpieza',
    keywords: ['limpieza', 'aseo', 'mantenimiento', 'intendencia'],
  },

  // 8) Automotriz y Transporte
  {
    id: 'mecanica',
    name: 'Mecánica',
    slug: 'mecanica',
    description: 'Reparación y mantenimiento de vehículos ligeros y pesados',
    category: 'Automotriz y Transporte',
    keywords: ['mecánico', 'auto', 'carro', 'reparación', 'servicio'],
  },
  {
    id: 'chofer',
    name: 'Chofer',
    slug: 'chofer',
    description: 'Servicio de conductor particular, reparto y plataforma',
    category: 'Automotriz y Transporte',
    keywords: ['conductor', 'transporte', 'manejo', 'delivery'],
  },
]

// Función para obtener servicios por categoría
export function getServicesByCategory() {
  const grouped: Record<string, ServiceItem[]> = {}
  
  SERVICES_CATALOG.forEach((service) => {
    if (!grouped[service.category]) {
      grouped[service.category] = []
    }
    grouped[service.category].push(service)
  })
  
  return grouped
}

// Función para buscar servicios
export function searchServices(query: string): ServiceItem[] {
  const lowerQuery = query.toLowerCase()
  
  return SERVICES_CATALOG.filter(
    (service) =>
      service.name.toLowerCase().includes(lowerQuery) ||
      service.description.toLowerCase().includes(lowerQuery) ||
      service.category.toLowerCase().includes(lowerQuery) ||
      service.keywords?.some((keyword) => keyword.toLowerCase().includes(lowerQuery))
  )
}

