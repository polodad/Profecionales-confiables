# Guía de Despliegue

Esta guía cubre el despliegue completo de Profesionales Confiables a producción.

## Pre-requisitos

- [ ] Cuenta de Vercel
- [ ] Proyecto de Supabase creado
- [ ] Cuenta de Mercado Pago con API keys
- [ ] WhatsApp Business API configurada (opcional)
- [ ] Dominio personalizado (opcional)

## 1. Configurar Supabase

### 1.1 Crear Proyecto

1. Ve a [supabase.com](https://supabase.com)
2. Crea un nuevo proyecto
3. Selecciona región más cercana a tus usuarios (South America)
4. Guarda la contraseña de la base de datos

### 1.2 Ejecutar Migraciones

**Opción A: UI de Supabase**

1. Ve a `SQL Editor` en tu dashboard
2. Copia el contenido de `supabase/migrations/001_initial_schema.sql`
3. Ejecuta el script
4. Repite con `002_rls_policies.sql`

**Opción B: CLI de Supabase**

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

### 1.3 Seed Database

Ejecuta el script de seed:

```bash
node scripts/seed.js
```

O ejecuta manualmente el SQL en Supabase SQL Editor.

### 1.4 Configurar Storage

1. Ve a `Storage` en Supabase
2. Crea un bucket llamado `job-photos`
3. Configura como público para lectura:

```sql
CREATE POLICY "Public read job photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'job-photos');

CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'job-photos');
```

### 1.5 Obtener API Keys

1. Ve a `Settings > API` en Supabase
2. Copia:
   - Project URL
   - anon/public key
   - service_role key (¡NO compartir!)

## 2. Configurar Mercado Pago

### 2.1 Obtener Credenciales

1. Ve a [developers.mercadopago.com](https://developers.mercadopago.com)
2. Crea una aplicación
3. Obtén:
   - Public Key
   - Access Token (Production)

### 2.2 Configurar Webhooks

1. En tu aplicación de Mercado Pago, ve a Webhooks
2. Agrega URL: `https://tu-dominio.com/api/webhooks/mercadopago`
3. Selecciona eventos: `payment`
4. Guarda el webhook secret

### 2.3 Habilitar Métodos de Pago

En el dashboard, habilita:
- [ ] Tarjetas de crédito/débito
- [ ] OXXO Pay
- [ ] Transferencia bancaria (opcional)

## 3. Configurar WhatsApp Cloud API (Opcional)

### 3.1 Crear App en Meta

1. Ve a [developers.facebook.com](https://developers.facebook.com)
2. Crea nueva app
3. Agrega producto "WhatsApp"

### 3.2 Obtener Credenciales

1. Ve a WhatsApp > Getting Started
2. Copia:
   - Phone Number ID
   - Access Token
3. Configura Webhook URL: `https://tu-dominio.com/api/webhooks/whatsapp`

### 3.3 Crear Templates

Crea los siguientes templates en WhatsApp Manager:

**Template: nuevo_trabajo**
```
Hola {{1}}, tienes un nuevo trabajo disponible: {{2}} en {{3}}.
Revisa los detalles en la app.
```

**Template: cotizacion_recibida**
```
¡Hola! {{1}} ha enviado una cotización por {{2}}.
Revisa en la app: [link]
```

**Template: pago_confirmado**
```
Tu pago de {{1}} ha sido confirmado.
ID de reserva: {{2}}
```

Repite para los demás templates en `lib/notifications/whatsapp.ts`.

## 4. Deploy en Vercel

### 4.1 Conectar Repositorio

```bash
npm install -g vercel
vercel login
```

En el directorio del proyecto:

```bash
vercel
```

Sigue las instrucciones para:
- Seleccionar scope/team
- Vincular a nuevo proyecto
- Configurar como Next.js project

### 4.2 Configurar Variables de Entorno

En el dashboard de Vercel o vía CLI:

```bash
# Supabase
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY

# Mercado Pago
vercel env add NEXT_PUBLIC_MP_PUBLIC_KEY
vercel env add MP_ACCESS_TOKEN
vercel env add MP_WEBHOOK_SECRET

# WhatsApp
vercel env add WHATSAPP_PHONE_NUMBER_ID
vercel env add WHATSAPP_ACCESS_TOKEN
vercel env add WHATSAPP_VERIFY_TOKEN

# App
vercel env add NEXT_PUBLIC_APP_URL
```

Asegúrate de configurar variables para todos los entornos:
- Production
- Preview
- Development

### 4.3 Deploy a Producción

```bash
vercel --prod
```

O configura auto-deploy desde tu rama main en GitHub.

### 4.4 Configurar Dominio Personalizado

1. En Vercel dashboard, ve a Settings > Domains
2. Agrega tu dominio
3. Configura DNS según instrucciones

## 5. Configurar CI/CD

### 5.1 GitHub Secrets

En tu repositorio de GitHub, ve a Settings > Secrets y agrega:

```
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

### 5.2 Verificar Workflows

Los workflows de GitHub Actions ya están configurados:
- `.github/workflows/ci.yml` - Lint, test, build en cada push
- `.github/workflows/deploy-preview.yml` - Deploy preview en PRs

## 6. Post-Deployment

### 6.1 Verificar Webhooks

**Mercado Pago:**
```bash
curl -X POST https://tu-dominio.com/api/webhooks/mercadopago \
  -H "Content-Type: application/json" \
  -H "x-signature: test" \
  -d '{"type":"payment","data":{"id":"test"}}'
```

Deberías recibir respuesta exitosa.

**WhatsApp:**
```bash
curl https://tu-dominio.com/api/webhooks/whatsapp?hub.verify_token=tu-token&hub.challenge=test
```

Debería devolver el challenge.

### 6.2 Crear Usuario Admin

Ejecuta en Supabase SQL Editor:

```sql
-- Primero crea un usuario vía auth
-- Luego actualiza su rol
UPDATE users 
SET role = 'admin' 
WHERE id = 'user-id-aqui';
```

### 6.3 Crear Primer Profesional

1. Registra una cuenta
2. Completa perfil de profesional
3. Como admin, aprueba el KYC:

```sql
UPDATE pros 
SET kyc_status = 'approved' 
WHERE user_id = 'user-id-aqui';
```

### 6.4 Probar Flujo Completo

1. [ ] Crear cotización como cliente
2. [ ] Crear reserva y pagar anticipo
3. [ ] Marcar trabajo como iniciado (profesional)
4. [ ] Completar trabajo con fotos
5. [ ] Aprobar y liberar pago (cliente)
6. [ ] Crear reseña

### 6.5 Monitoreo

**Logs de Vercel:**
- Ve a tu proyecto > Deployments > Logs

**Logs de Supabase:**
- Ve a Logs > API logs
- Ve a Database > Query performance

**Analíticas:**
- Vercel Analytics (incluido)
- Google Analytics (agregar si necesario)

### 6.6 Backups

**Base de datos:**
- Supabase hace backups automáticos diarios
- Ve a Database > Backups

**Código:**
- Git/GitHub es tu backup

## 7. Optimizaciones de Producción

### 7.1 Performance

```bash
# Analizar bundle size
npm run build
npx @next/bundle-analyzer
```

### 7.2 SEO

Verificar:
- [ ] Sitemap en `/sitemap.xml`
- [ ] robots.txt configurado
- [ ] Meta tags en todas las páginas
- [ ] Open Graph images
- [ ] Schema.org markup

### 7.3 Seguridad

Headers de seguridad en `next.config.js`:

```javascript
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
      ],
    },
  ]
}
```

### 7.4 Rate Limiting

Implementar en Edge Functions para prevenir abuso:

```typescript
// Supabase Edge Function
import { createClient } from '@supabase/supabase-js'
import { rateLimit } from './rate-limit'

Deno.serve(async (req) => {
  const ip = req.headers.get('x-forwarded-for')
  
  const limited = await rateLimit(ip, {
    requests: 10,
    window: 60 // 10 requests per minute
  })
  
  if (limited) {
    return new Response('Too many requests', { status: 429 })
  }
  
  // Handle request...
})
```

## 8. Mantenimiento

### 8.1 Actualizaciones Regulares

```bash
# Actualizar dependencias
npm update

# Check vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
```

### 8.2 Monitoreo de Errores

Considera agregar:
- Sentry para error tracking
- LogRocket para session replay
- Mixpanel para analytics

### 8.3 Backups de Base de Datos

Configurar backups adicionales:

```bash
# Export desde Supabase
supabase db dump > backup.sql

# Restore
supabase db reset
psql -f backup.sql
```

## 9. Escalamiento

### 9.1 Database

- Supabase escala automáticamente
- Considera upgrade a plan Pro para mejor performance
- Agrega índices adicionales según queries

### 9.2 Storage

- Supabase Storage usa CDN Cloudflare
- Considera usar external CDN si tráfico es muy alto

### 9.3 Edge Functions

- Vercel Edge Functions escalan automáticamente
- Sin cold starts
- Distribuidas globalmente

## 10. Checklist Final de Deploy

- [ ] Migrations ejecutadas
- [ ] Database seeded
- [ ] Storage buckets creados
- [ ] RLS policies activas
- [ ] Supabase API keys configuradas
- [ ] Mercado Pago configurado
- [ ] Webhooks de MP configurados
- [ ] WhatsApp API configurada (opcional)
- [ ] Variables de entorno en Vercel
- [ ] Domain personalizado configurado
- [ ] SSL/HTTPS activo
- [ ] CI/CD workflows funcionando
- [ ] Tests pasando
- [ ] Usuario admin creado
- [ ] Primer profesional aprobado
- [ ] Flujo completo probado
- [ ] Monitoreo configurado
- [ ] Backups verificados
- [ ] SEO verificado
- [ ] Performance optimizado

## 🆘 Troubleshooting de Deployment

### Error: RLS policies bloquean queries

```sql
-- Verifica policies
SELECT * FROM pg_policies WHERE tablename = 'tabla_con_problema';

-- Temporalmente desactiva RLS para debug (¡NO en producción!)
ALTER TABLE tabla_con_problema DISABLE ROW LEVEL SECURITY;
```

### Error: Webhooks no funcionan

- Verifica que el dominio sea HTTPS
- Revisa signatures/tokens
- Checa logs en Vercel

### Error: Build falla en Vercel

- Verifica que todas las env vars estén configuradas
- Checa que no haya errores de TypeScript
- Revisa logs detallados en Vercel

### Error: Performance lento

- Activa Vercel Analytics
- Revisa Database query performance en Supabase
- Considera agregar más índices

---

**¡Listo! Tu marketplace está en producción 🚀**

