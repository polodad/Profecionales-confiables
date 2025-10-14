import { Database } from './database'

export type City = Database['public']['Tables']['cities']['Row']
export type Service = Database['public']['Tables']['services']['Row']
export type User = Database['public']['Tables']['users']['Row']
export type Pro = Database['public']['Tables']['pros']['Row']
export type Job = Database['public']['Tables']['jobs']['Row']
export type Quote = Database['public']['Tables']['quotes']['Row']
export type Booking = Database['public']['Tables']['bookings']['Row']
export type Review = Database['public']['Tables']['reviews']['Row']

export interface ServiceRules {
  base_visit?: number
  tarifa_m2?: number
  tarifa_hora?: number
  tarifa_punto?: number
  tarifa_unidad?: number
  min_total: number
  incluye_materiales?: boolean
  recargo_urgencia?: {
    '2-6h'?: number
    'mismo_dia'?: number
    '24-48h'?: number
  }
  recargo_altura?: number
  recargo_zona_lejana?: number
  [key: string]: any
}

export interface QuoteInputs {
  m2?: number
  puntos?: number
  unidades?: number
  horas?: number
  altura_mayor_3m?: boolean
  zona_lejana?: boolean
  descripcion?: string
  [key: string]: any
}

export interface QuoteBreakdown {
  base_visit: number
  labor: number
  materials?: number
  urgency_fee: number
  height_fee: number
  zone_fee: number
  subtotal: number
  total: number
  min_range: number
  max_range: number
}

export interface ProWithUser extends Pro {
  users?: User
}

export interface JobWithRelations extends Job {
  cities?: City
  services?: Service
  quotes?: Quote[]
}

export interface QuoteWithRelations extends Quote {
  jobs?: JobWithRelations
  pros?: ProWithUser
}

export interface BookingWithRelations extends Booking {
  quotes?: QuoteWithRelations
}

export interface ReviewWithRelations extends Review {
  bookings?: BookingWithRelations
}

