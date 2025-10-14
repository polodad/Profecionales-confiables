# Arquitectura del Sistema

Documentación técnica de la arquitectura de Profesionales Confiables.

## 🏗 Arquitectura General

```
┌─────────────────────────────────────────────────────────────┐
│                         FRONTEND                            │
│  Next.js 14 (App Router) + TypeScript + Tailwind          │
│  - Server Components (RSC)                                 │
│  - Client Components                                       │
│  - Server Actions                                          │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ├──────────┬──────────────┬─────────────┐
                   │          │              │             │
┌──────────────────▼─┐   ┌────▼───┐   ┌─────▼────┐  ┌─────▼─────┐
│   Supabase         │   │ Mercado│   │WhatsApp  │  │  Vercel   │
│   - Postgres+RLS   │   │  Pago  │   │Cloud API │  │Edge Funcs │
│   - Auth           │   │  (Pay) │   │  (Msgs)  │  │  (API)    │
│   - Storage        │   └────────┘   └──────────┘  └───────────┘
└────────────────────┘
```

## 📁 Estructura de Carpetas

```
src/
├── app/                        # Next.js App Router
│   ├── layout.tsx             # Layout raíz
│   ├── page.tsx               # Homepage
│   ├── globals.css            # Estilos globales
│   │
│   ├── [ciudad]/[servicio]/   # SEO dinámicas
│   │   └── page.tsx           # Landing page ciudad+servicio
│   │
│   ├── cotizar/               # Cotizador
│   │   └── page.tsx           # Formulario de cotización
│   │
│   ├── dashboard/             # Dashboards
│   │   ├── pro/               # Dashboard profesional
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx       # Trabajos disponibles
│   │   │   ├── mis-trabajos/  # Trabajos asignados
│   │   │   └── trabajos/[id]/ # Detalle de trabajo
│   │   └── ...                # Dashboard cliente
│   │
│   ├── api/                   # API Routes
│   │   ├── cities/
│   │   ├── services/
│   │   ├── quotes/
│   │   └── webhooks/
│   │       ├── mercadopago/
│   │       └── whatsapp/
│   │
│   ├── auth/                  # Autenticación
│   │   ├── signin/
│   │   └── signup/
│   │
│   └── [legal pages]/         # Páginas legales
│       ├── terminos/
│       ├── privacidad/
│       └── garantias/
│
├── components/
│   ├── ui/                    # Componentes UI base
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Card.tsx
│   │
│   └── layout/                # Layout components
│       ├── Header.tsx
│       └── Footer.tsx
│
├── lib/
│   ├── supabase/              # Clientes Supabase
│   │   ├── client.ts          # Cliente navegador
│   │   └── server.ts          # Cliente servidor
│   │
│   ├── pricing/               # Motor de precios
│   │   └── calculator.ts      # Algoritmo cotización
│   │
│   ├── payments/              # Integraciones pago
│   │   └── mercadopago.ts     # MP SDK
│   │
│   ├── notifications/         # Notificaciones
│   │   └── whatsapp.ts        # WhatsApp API
│   │
│   ├── actions/               # Server Actions
│   │   ├── quotes.ts          # CRUD cotizaciones
│   │   ├── bookings.ts        # CRUD reservas
│   │   ├── reviews.ts         # CRUD reseñas
│   │   └── auth.ts            # Autenticación
│   │
│   └── utils.ts               # Utilidades
│
├── types/
│   ├── database.ts            # Tipos DB generados
│   └── index.ts               # Tipos compartidos
│
└── test/
    ├── setup.ts               # Config Vitest
    └── pricing/
        └── calculator.test.ts # Tests pricing
```

## 🔐 Seguridad y Autenticación

### Row Level Security (RLS)

Todas las tablas implementan RLS:

```sql
-- Ejemplo: users table
CREATE POLICY "Users can read their own data"
ON users FOR SELECT
USING (id = auth.uid());

CREATE POLICY "Users can update their own data"
ON users FOR UPDATE
USING (id = auth.uid());
```

### Políticas Clave

**Usuarios:**
- ✓ Usuarios leen/editan solo sus datos
- ✓ Admins tienen acceso completo

**Profesionales:**
- ✓ Clientes ven solo pros aprobados
- ✓ Pros editan solo su perfil
- ✓ Admins gestionan KYC

**Trabajos:**
- ✓ Clientes ven sus trabajos
- ✓ Pros ven trabajos en su área/trades
- ✓ Solo dueño puede editar

**Cotizaciones:**
- ✓ Solo cliente del trabajo y pro cotizando pueden ver
- ✓ Pro solo edita sus cotizaciones

**Reservas:**
- ✓ Solo cliente y pro involucrados
- ✓ Cliente libera pago
- ✓ Pro sube evidencia

## 💰 Flujo de Pagos (Escrow)

```
1. Cliente crea reserva
   ↓
2. Paga ANTICIPO (20%) → Mercado Pago
   ↓
3. MP webhook confirma → payment_status = 'paid'
   ↓
4. Pro realiza trabajo
   ↓
5. Pro sube fotos/completa checklist
   ↓
6. Cliente aprueba → release_status = 'released'
   ↓
7. SALDO (80%) se libera al pro en 24-48h
```

### Estados de Pago

**payment_status:**
- `pending` - Esperando pago
- `paid` - Pago confirmado
- `refunded` - Reembolsado
- `failed` - Pago falló

**release_status:**
- `held` - Retenido en escrow
- `released` - Liberado al profesional
- `disputed` - En disputa

## 🧮 Motor de Precios

### Algoritmo Base

```typescript
// 1. Calcular base
base = base_visit + (tarifa * cantidad)

// 2. Aplicar recargos
urgency_fee = base * recargo_urgencia
height_fee = base * recargo_altura
zone_fee = recargo_zona_lejana (fijo)

// 3. Calcular subtotal
subtotal = base + urgency_fee + height_fee + zone_fee

// 4. Aplicar mínimo
total = max(subtotal, min_total)

// 5. Aplicar multiplicador de ciudad
total = total * city_multiplier

// 6. Calcular rango
rango = [total * 0.9, total * 1.15]
```

### Configuración de Servicio

```json
{
  "base_visit": 250,
  "tarifa_m2": 55,
  "min_total": 800,
  "recargo_urgencia": {
    "2-6h": 0.35,
    "mismo_dia": 0.2,
    "24-48h": 0.1
  },
  "recargo_altura": 0.15,
  "recargo_zona_lejana": 80
}
```

### Personalización por Ciudad

```json
{
  "city_id": "cdmx-uuid",
  "service_id": "pintura-uuid",
  "overrides_json": {
    "price_multiplier": 1.15  // +15% en CDMX
  }
}
```

## 📡 Integraciones

### Mercado Pago

**Flujo de Pago:**

```typescript
// 1. Crear preferencia
const preference = await createPaymentPreference({
  title: 'Anticipo - Trabajo #123',
  amount: 1000,
  metadata: { booking_id: '...' }
})

// 2. Cliente paga en MP
window.location.href = preference.init_point

// 3. Webhook recibe notificación
POST /api/webhooks/mercadopago
{
  type: 'payment',
  data: { id: 'payment-id' }
}

// 4. Actualizar booking
await updatePaymentStatus(booking_id, 'paid')
```

**Métodos Soportados:**
- Tarjeta de crédito/débito
- OXXO Pay
- Transferencia bancaria

### WhatsApp Cloud API

**Templates:**

```typescript
// nuevo_trabajo
sendWhatsAppMessage(proPhone, 'nuevo_trabajo', {
  job_id: '123',
  service: 'Pintura',
  city: 'CDMX'
})

// cotizacion_recibida
sendWhatsAppMessage(clientPhone, 'cotizacion_recibida', {
  pro_name: 'Juan',
  amount: '$5,000'
})
```

## 🗄 Modelo de Datos

### Tablas Core

```
cities
├─ id (PK)
├─ name
├─ slug (unique)
├─ zones (jsonb)
└─ is_active

services
├─ id (PK)
├─ trade
├─ name
├─ slug (unique)
├─ rules_json (jsonb)
└─ base_price

users
├─ id (PK, FK → auth.users)
├─ role (enum)
├─ full_name
└─ phone

pros
├─ id (PK)
├─ user_id (FK → users)
├─ trades (array)
├─ city_ids (array)
├─ kyc_status (enum)
├─ rating
└─ review_count

jobs
├─ id (PK)
├─ user_id (FK → users)
├─ city_id (FK → cities)
├─ service_id (FK → services)
├─ status (enum)
└─ inputs_json (jsonb)

quotes
├─ id (PK)
├─ job_id (FK → jobs)
├─ pro_id (FK → pros)
├─ amount
└─ breakdown_json (jsonb)

bookings
├─ id (PK)
├─ quote_id (FK → quotes)
├─ payment_status (enum)
├─ release_status (enum)
└─ escrow_amount

reviews
├─ id (PK)
├─ booking_id (FK → bookings)
├─ rating (1-5)
└─ photos (array)
```

### Relaciones

```
users (1) ─┬─ (N) jobs
           └─ (1) pros

pros (1) ── (N) quotes

jobs (1) ── (N) quotes

quotes (1) ── (1) bookings

bookings (1) ── (1) reviews
```

## 🚀 Performance

### Optimizaciones Aplicadas

**1. Server Components (RSC)**
- Rendering en servidor
- Reducción de JavaScript enviado al cliente
- Mejor SEO

**2. Streaming**
```typescript
// Layout se envía inmediatamente
// Contenido se carga progresivamente
export default async function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <SlowComponent />
    </Suspense>
  )
}
```

**3. Static Generation**
```typescript
// Páginas SEO se pre-generan
export async function generateStaticParams() {
  // Genera todas las combinaciones ciudad+servicio
}
```

**4. Imágenes Optimizadas**
```typescript
import Image from 'next/image'
// Automático: lazy load, webp, resize
```

**5. Índices de Base de Datos**
```sql
CREATE INDEX idx_jobs_user_id ON jobs(user_id);
CREATE INDEX idx_jobs_city_service ON jobs(city_id, service_id);
CREATE INDEX idx_pros_kyc_available ON pros(kyc_status, is_available);
```

### Métricas Target

- **TTFB:** < 200ms (Vercel Edge)
- **FCP:** < 1.5s
- **LCP:** < 2.5s
- **CLS:** < 0.1

## 🧪 Testing

### Estrategia

**Unit Tests:**
```typescript
// lib/pricing/calculator.test.ts
test('calcula cotización básica', () => {
  const quote = calculateQuote(service, { m2: 50 })
  expect(quote.total).toBe(3000)
})
```

**Integration Tests (futuro):**
- Flujo completo de reserva
- Webhooks de pago
- RLS policies

**E2E Tests (futuro):**
- Playwright para flujos críticos

### Coverage Target

- **Pricing Engine:** 100%
- **Server Actions:** >80%
- **Components:** >70%

## 📊 Monitoreo

### Logs

**Vercel:**
- Request logs
- Function logs
- Error tracking

**Supabase:**
- Query logs
- Auth logs
- Database performance

### Métricas

**Custom Events:**
```typescript
// Track cotización generada
analytics.track('quote_generated', {
  service_id,
  city_id,
  amount,
})
```

## 🔄 CI/CD

### Pipeline

```
Push to GitHub
    ↓
GitHub Actions
    ├─ Lint
    ├─ TypeCheck
    ├─ Tests
    └─ Build
    ↓
Deploy to Vercel
    ├─ Preview (PRs)
    └─ Production (main)
```

### Environments

- **Development:** Local
- **Preview:** Vercel preview per PR
- **Production:** Vercel production

## 🔐 Secrets Management

**Vercel:**
- Environment variables en dashboard
- Diferentes por environment

**Supabase:**
- API keys en Settings > API
- Service role key solo en servidor

## 📈 Escalamiento

### Horizontal

**Next.js/Vercel:**
- Auto-scaling
- Edge network global
- Serverless functions

**Supabase:**
- Connection pooling
- Read replicas (plan Pro+)
- Point-in-time recovery

### Vertical

**Database:**
- Upgrade plan Supabase
- Más CPU/RAM
- Más conexiones

**Storage:**
- CDN para assets
- Image optimization

### Límites Actuales

**Supabase Free Tier:**
- 500 MB database
- 1 GB storage
- 50 MB file uploads
- 2 GB bandwidth

**Vercel Hobby:**
- 100 GB bandwidth
- Serverless functions
- Automatic SSL

## 🆘 Error Handling

### Client-Side

```typescript
try {
  const result = await createBooking(data)
  if (result.error) {
    toast.error(result.error)
  }
} catch (error) {
  toast.error('Error inesperado')
  logger.error(error)
}
```

### Server-Side

```typescript
export async function serverAction() {
  try {
    // ...
  } catch (error) {
    console.error('Action failed:', error)
    return { error: 'Error interno' }
  }
}
```

### Database

```sql
-- Constraints previenen datos inválidos
ALTER TABLE bookings 
ADD CONSTRAINT check_payment_status 
CHECK (payment_status IN ('pending', 'paid', 'refunded', 'failed'));
```

---

**Arquitectura diseñada para escalar y mantener** 🏗️

