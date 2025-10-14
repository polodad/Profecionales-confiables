import type { Service, QuoteInputs, ServiceRules, QuoteBreakdown } from '@/types'

/**
 * Calcula la cotización de un servicio basado en reglas y inputs del usuario
 */
export function calculateQuote(
  service: Service,
  inputs: QuoteInputs,
  urgency?: string,
  cityPriceMultiplier: number = 1.0
): QuoteBreakdown {
  const rules = service.rules_json as ServiceRules

  // Base visit fee
  const baseVisit = (rules.base_visit || 0) * cityPriceMultiplier

  // Labor cost calculation
  let labor = 0

  if (rules.tarifa_m2 && inputs.m2) {
    labor += rules.tarifa_m2 * inputs.m2
  }

  if (rules.tarifa_hora && inputs.horas) {
    labor += rules.tarifa_hora * inputs.horas
  }

  if (rules.tarifa_punto && inputs.puntos) {
    labor += rules.tarifa_punto * inputs.puntos
  }

  if (rules.tarifa_unidad && inputs.unidades) {
    labor += rules.tarifa_unidad * inputs.unidades
  }

  labor *= cityPriceMultiplier

  // Calculate fees
  let urgencyFee = 0
  if (urgency && rules.recargo_urgencia) {
    const urgencyRate = rules.recargo_urgencia[urgency as keyof typeof rules.recargo_urgencia] || 0
    urgencyFee = (baseVisit + labor) * urgencyRate
  }

  let heightFee = 0
  if (inputs.altura_mayor_3m && rules.recargo_altura) {
    heightFee = (baseVisit + labor) * rules.recargo_altura
  }

  let zoneFee = 0
  if (inputs.zona_lejana && rules.recargo_zona_lejana) {
    zoneFee = rules.recargo_zona_lejana * cityPriceMultiplier
  }

  // Calculate subtotal and apply minimum
  const subtotal = baseVisit + labor + urgencyFee + heightFee + zoneFee
  const minTotal = rules.min_total * cityPriceMultiplier
  const total = Math.max(subtotal, minTotal)

  // Calculate range (±10% to +15%)
  const minRange = total * 0.9
  const maxRange = total * 1.15

  return {
    base_visit: baseVisit,
    labor,
    urgency_fee: urgencyFee,
    height_fee: heightFee,
    zone_fee: zoneFee,
    subtotal,
    total: Math.round(total),
    min_range: Math.round(minRange),
    max_range: Math.round(maxRange),
  }
}

/**
 * Calcula el anticipo (20%)
 */
export function calculateDeposit(total: number): number {
  return Math.round(total * 0.2)
}

/**
 * Calcula el saldo restante (80%)
 */
export function calculateBalance(total: number): number {
  return Math.round(total * 0.8)
}

/**
 * Valida que los inputs sean válidos para el servicio
 */
export function validateInputs(
  service: Service,
  inputs: QuoteInputs
): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  const rules = service.rules_json as ServiceRules

  if (rules.tarifa_m2 && !inputs.m2) {
    errors.push('Se requiere ingresar los metros cuadrados')
  }

  if (rules.tarifa_punto && !inputs.puntos) {
    errors.push('Se requiere ingresar el número de puntos')
  }

  if (rules.tarifa_unidad && !inputs.unidades) {
    errors.push('Se requiere ingresar el número de unidades')
  }

  if (inputs.m2 && inputs.m2 <= 0) {
    errors.push('Los metros cuadrados deben ser mayores a 0')
  }

  if (inputs.puntos && inputs.puntos <= 0) {
    errors.push('El número de puntos debe ser mayor a 0')
  }

  if (inputs.unidades && inputs.unidades <= 0) {
    errors.push('El número de unidades debe ser mayor a 0')
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

