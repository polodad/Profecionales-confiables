# Quickstart - Profesionales Confiables

Guía rápida para tener el proyecto corriendo en menos de 10 minutos.

## 1. Instalar Dependencias (2 min)

```bash
npm install
```

## 2. Configurar Supabase (3 min)

### Crear Proyecto

1. Ve a [supabase.com](https://supabase.com) y crea un nuevo proyecto
2. Espera a que termine de inicializarse (~2 min)

### Ejecutar Migraciones

Copia y pega en el SQL Editor de Supabase:

```bash
# Archivo 1: supabase/migrations/001_initial_schema.sql
# Archivo 2: supabase/migrations/002_rls_policies.sql
```

## 3. Variables de Entorno (1 min)

Crea `.env.local`:

```env
# Supabase (obtén desde Settings > API)
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
SUPABASE_SERVICE_ROLE_KEY=tu-service-key

# Mercado Pago (opcional para desarrollo)
NEXT_PUBLIC_MP_PUBLIC_KEY=TEST-xxx
MP_ACCESS_TOKEN=TEST-xxx
MP_WEBHOOK_SECRET=test-secret

# WhatsApp (opcional)
WHATSAPP_PHONE_NUMBER_ID=
WHATSAPP_ACCESS_TOKEN=
WHATSAPP_VERIFY_TOKEN=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 4. Seed Database (1 min)

```bash
npm run db:seed
```

Esto creará:
- 3 ciudades (CDMX, Guadalajara, Monterrey)
- 6 servicios (plomería, electricidad, pintura, etc.)
- Precios por ciudad

## 5. Ejecutar (30 seg)

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## ✅ Verificar que Funciona

### Páginas Principales

- ✅ Homepage: http://localhost:3000
- ✅ Cotizador: http://localhost:3000/cotizar
- ✅ SEO Page: http://localhost:3000/cdmx/plomeria
- ✅ Términos: http://localhost:3000/terminos

### Flujo Completo de Testing

#### Como Cliente:

1. **Ir a Cotizador**
   ```
   http://localhost:3000/cotizar
   ```

2. **Seleccionar:**
   - Ciudad: CDMX
   - Servicio: Pintura Interior
   - M²: 50
   - Urgencia: Flexible

3. **Obtener Cotización**
   - Debería ver un rango de precio
   - Ejemplo: $2,700 - $3,450

#### Como Profesional:

1. **Crear Cuenta**
   - Registrarse en `/auth/signup`
   - Completar perfil

2. **Crear Profesional en DB**
   ```sql
   -- Ejecutar en Supabase SQL Editor
   INSERT INTO pros (user_id, trades, zones, city_ids, kyc_status)
   VALUES (
     'user-id-here',
     ARRAY['pintura'],
     ARRAY['Centro', 'Norte'],
     ARRAY['city-id-here'],
     'approved'
   );
   ```

3. **Ver Dashboard**
   ```
   http://localhost:3000/dashboard/pro
   ```

## 🧪 Ejecutar Tests

```bash
npm run test
```

Deberías ver ~15 tests pasando ✓

## 📊 Verificar Database

En Supabase SQL Editor:

```sql
-- Ver ciudades
SELECT * FROM cities;

-- Ver servicios
SELECT * FROM services;

-- Ver precios por ciudad
SELECT 
  c.name as ciudad,
  s.name as servicio,
  s.base_price,
  cp.overrides_json
FROM city_prices cp
JOIN cities c ON c.id = cp.city_id
JOIN services s ON s.id = cp.service_id;
```

## 🐛 Troubleshooting Rápido

### Error: "Cannot connect to Supabase"

```bash
# Verifica las variables
echo $NEXT_PUBLIC_SUPABASE_URL
```

Si están vacías, revisa tu `.env.local`.

### Error: "Table doesn't exist"

```bash
# Ejecuta las migraciones
npm run db:migrate
```

### Error: "No cities found"

```bash
# Ejecuta el seed
npm run db:seed
```

### Tests fallan

```bash
# Reinstala
rm -rf node_modules
npm install
npm run test
```

## 🚀 Próximos Pasos

Una vez que todo funcione:

1. **Leer README.md** - Documentación completa
2. **Leer DEPLOYMENT.md** - Guía de despliegue
3. **Configurar Mercado Pago** - Para pagos reales
4. **Configurar WhatsApp API** - Para notificaciones
5. **Deploy a Vercel** - Poner en producción

## 📝 Datos de Prueba

### Ciudades Disponibles

- CDMX (slug: `cdmx`)
- Guadalajara (slug: `guadalajara`)
- Monterrey (slug: `monterrey`)

### Servicios Disponibles

- Reparación de fugas (slug: `reparacion-fugas`)
- Instalación eléctrica (slug: `instalacion-electrica`)
- Pintura interior (slug: `pintura-interior`)
- Construcción de muros (slug: `construccion-muros`)
- Instalación de puertas (slug: `instalacion-puertas`)
- Aplicación de yeso (slug: `aplicacion-yeso`)

### URLs de Prueba SEO

```
http://localhost:3000/cdmx/reparacion-fugas
http://localhost:3000/cdmx/pintura-interior
http://localhost:3000/guadalajara/instalacion-electrica
http://localhost:3000/monterrey/construccion-muros
```

## 💡 Tips de Desarrollo

### Hot Reload

Next.js hace hot reload automático. Guarda y el navegador se actualiza.

### Logs de Supabase

Ve a tu proyecto Supabase > Logs para ver queries y errores.

### Debug de RLS

Si tienes problemas con permisos:

```sql
-- Ver policies activas
SELECT * FROM pg_policies WHERE tablename = 'tabla_problema';
```

### TypeScript

```bash
# Verificar tipos
npm run typecheck
```

### Linter

```bash
# Verificar código
npm run lint
```

## 🎯 Checklist de Setup

- [ ] `npm install` ejecutado
- [ ] Proyecto Supabase creado
- [ ] Migraciones ejecutadas
- [ ] `.env.local` configurado
- [ ] `npm run db:seed` ejecutado
- [ ] `npm run dev` corriendo
- [ ] Homepage carga correctamente
- [ ] Cotizador funciona
- [ ] Tests pasan

## 🆘 Ayuda

Si tienes problemas:

1. Lee el README.md completo
2. Revisa los logs de consola
3. Verifica Supabase Logs
4. Revisa el archivo DEPLOYMENT.md

---

**¡Listo para desarrollar! 🎉**

