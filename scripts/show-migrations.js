#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('📋 Contenido de las migraciones para ejecutar manualmente en Supabase\n');

const migrationsDir = path.join(__dirname, '../supabase/migrations');
const files = fs.readdirSync(migrationsDir).sort();

for (const file of files) {
  if (!file.endsWith('.sql')) continue;
  
  console.log(`\n📄 ${file}:`);
  console.log('─'.repeat(50));
  
  const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
  console.log(sql);
  console.log('─'.repeat(50));
}

console.log('\n🔧 Instrucciones:');
console.log('   1. Ve a https://supabase.com/dashboard');
console.log('   2. Selecciona tu proyecto');
console.log('   3. Ve a SQL Editor');
console.log('   4. Copia y pega el contenido de cada archivo SQL');
console.log('   5. Ejecuta cada migración en orden');
console.log('   6. Después ejecuta: node scripts/seed.js');
