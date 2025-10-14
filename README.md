# Profesionales Confiables

> Marketplace de servicios del hogar con profesionales verificados en México

## 🚀 MVP Features

- ✅ Cotizador instantáneo con algoritmo de precios dinámico
- ✅ Sistema de reservas con anticipo del 20%
- ✅ Escrow básico para protección de pagos
- ✅ Verificación de profesionales (KYC)
- ✅ Reseñas con fotos
- ✅ Landings SEO por ciudad + servicio
- ✅ Páginas legales (términos, privacidad, garantías, disputas)
- ✅ Integración con Mercado Pago (OXXO Pay y tarjeta)
- ✅ WhatsApp Cloud API para notificaciones
- ✅ Row Level Security (RLS) en Supabase

## 🛠 Stack Tecnológico

**Frontend:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion

**Backend:**
- Supabase (Postgres + Auth + Storage)
- Edge Functions
- Row Level Security (RLS)

**Pagos:**
- Mercado Pago (Tarjeta + OXXO Pay)

**Notificaciones:**
- WhatsApp Cloud API

**Infraestructura:**
- Vercel (Frontend + Edge Functions)
- Supabase (Database + Storage)

## 📋 Requisitos Previos

- Node.js 20+
- npm o yarn
- Cuenta de Supabase
- Cuenta de Mercado Pago
- WhatsApp Business API (opcional para notificaciones)

## 🏗 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/profesionales-confiables.git
cd profesionales-confiables
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copia `.env.local.example` a `.env.local`:

```bash
cp .env.local.example .env.local
```

Completa las variables de entorno:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key

# Mercado Pago
NEXT_PUBLIC_MP_PUBLIC_KEY=tu-public-key
MP_ACCESS_TOKEN=tu-access-token
MP_WEBHOOK_SECRET=tu-webhook-secret

# WhatsApp Cloud API (opcional)
WHATSAPP_PHONE_NUMBER_ID=tu-phone-number-id
WHATSAPP_ACCESS_TOKEN=tu-access-token
WHATSAPP_VERIFY_TOKEN=tu-verify-token

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Configurar Supabase

#### Ejecutar migraciones

Las migraciones crearán todas las tablas, índices, triggers y políticas RLS.

**Opción A: Desde la UI de Supabase**

1. Ve a `SQL Editor` en tu proyecto de Supabase
2. Copia y pega el contenido de cada archivo en `supabase/migrations/` en orden
3. Ejecuta cada script

**Opción B: Usando el CLI de Supabase**

```bash
# Instalar CLI
npm install -g supabase

# Login
supabase login

# Link project
supabase link --project-ref tu-project-ref

# Push migrations
supabase db push
```

**Opción C: Usando el script personalizado**

```bash
npm run db:migrate
```

#### Hacer seed de la base de datos

```bash
npm run db:seed
```

Esto creará:
- 3 ciudades de ejemplo (CDMX, Guadalajara, Monterrey)
- 6 servicios (plomería, electricidad, pintura, albañilería, carpintería, yesería)
- Precios específicos por ciudad

### 5. Ejecutar en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🧪 Testing

### Ejecutar tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm run test -- --coverage
```

### Tests incluidos

- ✅ Algoritmo de cotización con múltiples escenarios
- ✅ Validaciones de inputs
- ✅ Cálculo de anticipo y saldo
- ✅ Casos edge: valores grandes, decimales, mínimos

## 📦 Deploy a Producción

### Deploy en Vercel

1. **Conectar repositorio**

```bash
npm install -g vercel
vercel login
vercel
```

2. **Configurar variables de entorno**

En el dashboard de Vercel, agrega todas las variables de entorno de `.env.local`.

3. **Deploy**

```bash
vercel --prod
```

### Configurar Webhooks

#### Mercado Pago Webhooks

1. Ve a tu dashboard de Mercado Pago
2. Configura el webhook URL: `https://tu-dominio.com/api/webhooks/mercadopago`
3. Selecciona eventos: `payment`
4. Guarda el secret en `MP_WEBHOOK_SECRET`

#### WhatsApp Webhooks (Opcional)

1. Configura el webhook URL en Meta Developer Console
2. Verify token: usa el mismo valor que `WHATSAPP_VERIFY_TOKEN`

## 📁 Estructura del Proyecto

```
profesionales-confiables/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── [ciudad]/[servicio]/ # SEO landing pages
│   │   ├── cotizar/            # Cotizador
│   │   ├── api/                # API routes
│   │   │   ├── cities/
│   │   │   ├── services/
│   │   │   ├── quotes/
│   │   │   └── webhooks/
│   │   ├── terminos/           # Legal pages
│   │   ├── privacidad/
│   │   ├── garantias/
│   │   └── layout.tsx
│   ├── components/
│   │   ├── ui/                 # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Card.tsx
│   │   └── layout/             # Layout components
│   │       ├── Header.tsx
│   │       └── Footer.tsx
│   ├── lib/
│   │   ├── supabase/           # Supabase clients
│   │   │   ├── client.ts
│   │   │   └── server.ts
│   │   ├── pricing/            # Pricing engine
│   │   │   └── calculator.ts
│   │   ├── payments/           # Payment integrations
│   │   │   └── mercadopago.ts
│   │   ├── notifications/      # Notification services
│   │   │   └── whatsapp.ts
│   │   ├── actions/            # Server actions
│   │   │   ├── quotes.ts
│   │   │   ├── bookings.ts
│   │   │   └── reviews.ts
│   │   └── utils.ts
│   ├── types/                  # TypeScript types
│   │   ├── database.ts
│   │   └── index.ts
│   └── test/                   # Tests
│       ├── setup.ts
│       └── pricing/
│           └── calculator.test.ts
├── supabase/
│   └── migrations/             # Database migrations
│       ├── 001_initial_schema.sql
│       └── 002_rls_policies.sql
├── scripts/
│   ├── migrate.js              # Run migrations
│   └── seed.js                 # Seed database
├── .github/
│   └── workflows/              # CI/CD
│       ├── ci.yml
│       └── deploy-preview.yml
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
├── vitest.config.ts
└── README.md
```

## 🔐 Seguridad

### Row Level Security (RLS)

Todas las tablas tienen políticas RLS configuradas:

- **Usuarios:** Solo pueden ver/editar sus propios datos
- **Profesionales:** Clientes ven solo pros aprobados, pros pueden editar su perfil
- **Trabajos:** Clientes ven sus trabajos, pros ven trabajos en su área
- **Cotizaciones:** Solo cliente del trabajo y pro que cotiza pueden ver
- **Reservas:** Solo participantes pueden ver/editar
- **Reseñas:** Públicas, pero solo cliente puede crear

### Validación Server-Side

Todas las acciones críticas tienen validación en el servidor:

- Verificación de permisos
- Validación de precios
- Verificación de estados
- Auditoría de cambios

### Webhooks Firmados

Los webhooks de Mercado Pago se verifican con signature HMAC.

## 🎯 Modelo de Datos

### Tablas Principales

- **cities** - Ciudades disponibles con zonas
- **services** - Catálogo de servicios con reglas de precio
- **city_prices** - Precios específicos por ciudad
- **users** - Usuarios (extendido de auth.users)
- **pros** - Profesionales con verificación KYC
- **jobs** - Solicitudes de trabajo
- **quotes** - Cotizaciones de profesionales
- **bookings** - Reservas con escrow
- **reviews** - Reseñas con fotos
- **audit_logs** - Logs de auditoría
- **notifications** - Notificaciones push

## 🧮 Algoritmo de Cotización

```typescript
total = max(
  min_total,
  base_visit +
  (tarifa_m2 * m2) +
  (tarifa_hora * horas) +
  urgency_fee +
  height_fee +
  zone_fee
) * city_multiplier

rango = [total * 0.9, total * 1.15]
anticipo = total * 0.2
saldo = total * 0.8
```

### Recargos por Urgencia

- **2-6 horas:** +35%
- **Mismo día:** +20-25%
- **24-48 horas:** +10-15%
- **Flexible:** Sin recargo

### Otros Recargos

- **Altura >3m:** +15%
- **Zona foránea:** $80-150 fijo

## 🔄 Flujo de Trabajo

### Para Clientes

1. **Cotizar:** Ingresa detalles y obtén precio estimado
2. **Reservar:** Paga anticipo del 20%
3. **Confirmar:** Se asigna profesional verificado
4. **Recibir servicio:** Profesional realiza el trabajo
5. **Aprobar:** Revisa fotos y checklist
6. **Liberar pago:** Se libera el 80% restante al profesional
7. **Reseñar:** Califica el servicio

### Para Profesionales

1. **Registro:** Envía documentos para verificación KYC
2. **Aprobación:** Equipo revisa y aprueba
3. **Recibir notificación:** WhatsApp/Email con nuevo trabajo
4. **Cotizar:** Envía cotización personalizada (opcional)
5. **Aceptar trabajo:** Cliente acepta cotización
6. **Realizar servicio:** Sube fotos antes/después
7. **Completar:** Marca trabajo como completo con checklist
8. **Recibir pago:** Una vez aprobado por cliente

## 🌍 SEO

### Páginas Dinámicas

Cada combinación ciudad + servicio genera una página SEO:

- `/cdmx/plomeria`
- `/guadalajara/electricidad`
- `/monterrey/pintura`
- etc.

### Metadata

- Title tags optimizados
- Meta descriptions únicos
- Open Graph tags
- Schema.org markup
- Sitemap automático

### Performance

- TTFB < 200ms (Vercel Edge)
- Componentes optimizados con React Server Components
- Images optimizadas con next/image
- Bundle size optimizado

## 📱 WhatsApp Notificaciones

### Templates Disponibles

- `nuevo_trabajo` - Notifica nuevo trabajo a profesionales
- `cotizacion_recibida` - Cliente recibe cotización
- `cotizacion_aceptada` - Profesional recibe confirmación
- `pago_confirmado` - Confirmación de pago
- `trabajo_iniciado` - Trabajo iniciado
- `trabajo_completado` - Trabajo completado
- `solicitud_resena` - Solicitud de reseña

### Configurar Templates

1. Ve a Meta Business Suite
2. Crea templates en WhatsApp Manager
3. Los nombres deben coincidir con `WhatsAppTemplates` en `lib/notifications/whatsapp.ts`

## 🆘 Troubleshooting

### Error: "Cannot find module @/..."

```bash
# Verifica que el path alias esté en tsconfig.json
"paths": {
  "@/*": ["./src/*"]
}
```

### Error de conexión a Supabase

```bash
# Verifica las variables de entorno
echo $NEXT_PUBLIC_SUPABASE_URL
echo $NEXT_PUBLIC_SUPABASE_ANON_KEY
```

### Tests fallan

```bash
# Limpia y reinstala
rm -rf node_modules
npm install
npm run test
```

### Error en migraciones

```bash
# Resetea la base de datos (⚠️ CUIDADO EN PRODUCCIÓN)
supabase db reset
npm run db:migrate
npm run db:seed
```

## 📝 Scripts Disponibles

```bash
npm run dev          # Desarrollo
npm run build        # Build producción
npm run start        # Ejecutar build
npm run lint         # ESLint
npm run typecheck    # TypeScript check
npm run test         # Vitest tests
npm run test:watch   # Tests en modo watch
npm run db:migrate   # Ejecutar migraciones
npm run db:seed      # Seed database
npm run deploy       # Lint + typecheck + test + build
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama: `git checkout -b feature/nueva-funcionalidad`
3. Commit: `git commit -m 'Agrega nueva funcionalidad'`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es privado y propietario.

## 📞 Soporte

- Email: soporte@profesionalesconfiables.com
- WhatsApp: +52 (55) xxxx-xxxx

---

**Construido con ❤️ para conectar profesionales con clientes en México**

