import { describe, it, expect } from 'vitest'
import { calculateQuote, validateInputs, calculateDeposit, calculateBalance } from '@/lib/pricing/calculator'
import type { Service, QuoteInputs } from '@/types'

describe('Pricing Calculator', () => {
  const mockServicePintura: Service = {
    id: '1',
    trade: 'pintura',
    name: 'Pintura Interior',
    slug: 'pintura-interior',
    description: 'Pintura de interiores',
    unit: 'm2',
    base_price: 55,
    rules_json: {
      base_visit: 250,
      tarifa_m2: 55,
      min_total: 800,
      incluye_materiales: false,
      recargo_urgencia: {
        '2-6h': 0.35,
        'mismo_dia': 0.2,
        '24-48h': 0.1,
      },
      recargo_altura: 0.15,
      recargo_zona_lejana: 80,
    },
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  const mockServiceElectricidad: Service = {
    id: '2',
    trade: 'electricidad',
    name: 'Instalación Eléctrica',
    slug: 'instalacion-electrica',
    description: 'Instalación eléctrica',
    unit: 'punto',
    base_price: 200,
    rules_json: {
      base_visit: 300,
      tarifa_punto: 200,
      min_total: 500,
      recargo_urgencia: {
        '2-6h': 0.4,
        'mismo_dia': 0.25,
        '24-48h': 0.15,
      },
      recargo_zona_lejana: 100,
    },
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  describe('calculateQuote', () => {
    it('should calculate basic quote for painting service', () => {
      const inputs: QuoteInputs = { m2: 50 }
      const quote = calculateQuote(mockServicePintura, inputs)

      // base_visit (250) + tarifa_m2 * m2 (55 * 50 = 2750) = 3000
      expect(quote.base_visit).toBe(250)
      expect(quote.labor).toBe(2750)
      expect(quote.total).toBe(3000)
      expect(quote.min_range).toBe(Math.round(3000 * 0.9)) // 2700
      expect(quote.max_range).toBe(Math.round(3000 * 1.15)) // 3450
    })

    it('should apply minimum total when calculated is below minimum', () => {
      const inputs: QuoteInputs = { m2: 5 }
      const quote = calculateQuote(mockServicePintura, inputs)

      // base_visit (250) + labor (55 * 5 = 275) = 525
      // But min_total is 800, so total should be 800
      expect(quote.total).toBe(800)
    })

    it('should apply urgency fee correctly', () => {
      const inputs: QuoteInputs = { m2: 20 }
      const quote = calculateQuote(mockServicePintura, inputs, 'mismo_dia')

      // base_visit (250) + labor (55 * 20 = 1100) = 1350
      // urgency_fee = 1350 * 0.2 = 270
      // total = 1350 + 270 = 1620
      expect(quote.urgency_fee).toBe(270)
      expect(quote.total).toBe(1620)
    })

    it('should apply height fee when specified', () => {
      const inputs: QuoteInputs = { m2: 30, altura_mayor_3m: true }
      const quote = calculateQuote(mockServicePintura, inputs)

      // base_visit (250) + labor (55 * 30 = 1650) = 1900
      // height_fee = 1900 * 0.15 = 285
      // total = 1900 + 285 = 2185
      expect(quote.height_fee).toBe(285)
      expect(quote.total).toBe(2185)
    })

    it('should apply zone fee for remote areas', () => {
      const inputs: QuoteInputs = { m2: 20, zona_lejana: true }
      const quote = calculateQuote(mockServicePintura, inputs)

      // base_visit (250) + labor (55 * 20 = 1100) + zone_fee (80) = 1430
      expect(quote.zone_fee).toBe(80)
      expect(quote.total).toBe(1430)
    })

    it('should apply city price multiplier', () => {
      const inputs: QuoteInputs = { m2: 20 }
      const multiplier = 1.15 // CDMX multiplier
      const quote = calculateQuote(mockServicePintura, inputs, undefined, multiplier)

      // base_visit (250 * 1.15 = 287.5) + labor (55 * 20 * 1.15 = 1265) = 1552.5
      // min_total (800 * 1.15 = 920)
      // total = 1553 (rounded)
      expect(quote.total).toBeGreaterThan(1430) // Should be higher than base
    })

    it('should calculate quote for electrical service with points', () => {
      const inputs: QuoteInputs = { puntos: 5 }
      const quote = calculateQuote(mockServiceElectricidad, inputs)

      // base_visit (300) + tarifa_punto * puntos (200 * 5 = 1000) = 1300
      expect(quote.base_visit).toBe(300)
      expect(quote.labor).toBe(1000)
      expect(quote.total).toBe(1300)
    })

    it('should apply multiple fees correctly', () => {
      const inputs: QuoteInputs = {
        m2: 40,
        altura_mayor_3m: true,
        zona_lejana: true,
      }
      const quote = calculateQuote(mockServicePintura, inputs, 'mismo_dia')

      // base_visit (250) + labor (55 * 40 = 2200) = 2450
      // urgency_fee = 2450 * 0.2 = 490
      // height_fee = 2450 * 0.15 = 367.5
      // zone_fee = 80
      // total = 2450 + 490 + 367.5 + 80 = 3387.5 -> 3388
      expect(quote.urgency_fee).toBe(490)
      expect(quote.height_fee).toBe(367.5)
      expect(quote.zone_fee).toBe(80)
      expect(quote.total).toBe(3388)
    })
  })

  describe('validateInputs', () => {
    it('should validate m2 input is required', () => {
      const inputs: QuoteInputs = {}
      const result = validateInputs(mockServicePintura, inputs)

      expect(result.valid).toBe(false)
      expect(result.errors).toContain('Se requiere ingresar los metros cuadrados')
    })

    it('should validate m2 is greater than 0', () => {
      const inputs: QuoteInputs = { m2: 0 }
      const result = validateInputs(mockServicePintura, inputs)

      expect(result.valid).toBe(false)
      expect(result.errors).toContain('Los metros cuadrados deben ser mayores a 0')
    })

    it('should validate puntos input is required for electrical service', () => {
      const inputs: QuoteInputs = {}
      const result = validateInputs(mockServiceElectricidad, inputs)

      expect(result.valid).toBe(false)
      expect(result.errors).toContain('Se requiere ingresar el número de puntos')
    })

    it('should pass validation with valid inputs', () => {
      const inputs: QuoteInputs = { m2: 50 }
      const result = validateInputs(mockServicePintura, inputs)

      expect(result.valid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })
  })

  describe('calculateDeposit', () => {
    it('should calculate 20% deposit', () => {
      const total = 5000
      const deposit = calculateDeposit(total)

      expect(deposit).toBe(1000)
    })

    it('should round deposit to integer', () => {
      const total = 5550
      const deposit = calculateDeposit(total)

      expect(deposit).toBe(1110)
    })
  })

  describe('calculateBalance', () => {
    it('should calculate 80% balance', () => {
      const total = 5000
      const balance = calculateBalance(total)

      expect(balance).toBe(4000)
    })

    it('should round balance to integer', () => {
      const total = 5550
      const balance = calculateBalance(total)

      expect(balance).toBe(4440)
    })
  })

  describe('Edge cases', () => {
    it('should handle zero base visit', () => {
      const service = {
        ...mockServicePintura,
        rules_json: {
          ...mockServicePintura.rules_json,
          base_visit: 0,
        },
      }
      const inputs: QuoteInputs = { m2: 20 }
      const quote = calculateQuote(service, inputs)

      expect(quote.base_visit).toBe(0)
      expect(quote.labor).toBe(1100)
    })

    it('should handle large values', () => {
      const inputs: QuoteInputs = { m2: 1000 }
      const quote = calculateQuote(mockServicePintura, inputs)

      // base_visit (250) + labor (55 * 1000 = 55000) = 55250
      expect(quote.total).toBe(55250)
    })

    it('should handle decimal m2 values', () => {
      const inputs: QuoteInputs = { m2: 15.5 }
      const quote = calculateQuote(mockServicePintura, inputs)

      // base_visit (250) + labor (55 * 15.5 = 852.5) = 1102.5
      // Should apply minimum of 800, so total = 1103
      expect(quote.total).toBe(1103)
    })
  })
})

