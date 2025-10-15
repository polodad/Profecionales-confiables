#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Configuración de Profesionales Confiables\n');

// Verificar si existe .env.local
const envPath = path.join(__dirname, '../.env.local');
const envExamplePath = path.join(__dirname, '../env.example');

if (!fs.existsSync(envPath)) {
  console.log('📝 Creando archivo .env.local...');
  
  if (fs.existsSync(envExamplePath)) {
    const envExample = fs.readFileSync(envExamplePath, 'utf8');
    fs.writeFileSync(envPath, envExample);
    console.log('✅ Archivo .env.local creado desde env.example');
  } else {
    // Crear archivo .env.local básico
    const basicEnv = `# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
`;
    fs.writeFileSync(envPath, basicEnv);
    console.log('✅ Archivo .env.local básico creado');
  }
  
  console.log('\n⚠️  IMPORTANTE: Debes configurar las credenciales de Supabase en .env.local');
  console.log('   1. Ve a https://supabase.com y crea un nuevo proyecto');
  console.log('   2. Copia la URL del proyecto y las claves');
  console.log('   3. Actualiza el archivo .env.local con tus credenciales');
  console.log('   4. Ejecuta: node scripts/migrate.js');
  console.log('   5. Ejecuta: node scripts/seed.js');
} else {
  console.log('✅ Archivo .env.local ya existe');
  
  // Verificar si las credenciales están configuradas
  const envContent = fs.readFileSync(envPath, 'utf8');
  
  if (envContent.includes('your_supabase_project_url_here')) {
    console.log('\n⚠️  Las credenciales de Supabase no están configuradas');
    console.log('   Actualiza el archivo .env.local con tus credenciales reales');
  } else {
    console.log('✅ Credenciales de Supabase configuradas');
    console.log('\n📋 Próximos pasos:');
    console.log('   1. Ejecuta: node scripts/migrate.js (para crear las tablas)');
    console.log('   2. Ejecuta: node scripts/seed.js (para poblar con ciudades)');
    console.log('   3. Ejecuta: npm run dev (para iniciar la aplicación)');
  }
}

console.log('\n🎯 Para obtener las credenciales de Supabase:');
console.log('   1. Ve a https://supabase.com/dashboard');
console.log('   2. Selecciona tu proyecto');
console.log('   3. Ve a Settings > API');
console.log('   4. Copia la URL del proyecto y las claves API');
