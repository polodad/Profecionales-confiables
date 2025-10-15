#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function runMigrations() {
  console.log('🚀 Running migrations...\n');

  const migrationsDir = path.join(__dirname, '../supabase/migrations');
  const files = fs.readdirSync(migrationsDir).sort();

  for (const file of files) {
    if (!file.endsWith('.sql')) continue;

    console.log(`📄 Running: ${file}`);
    const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');

    try {
      // Dividir el SQL en declaraciones individuales
      const statements = sql
        .split(';')
        .map(stmt => stmt.trim())
        .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

      for (const statement of statements) {
        if (statement.trim()) {
          const { error } = await supabase.rpc('exec', { sql: statement });
          if (error) {
            // Si exec no funciona, intentar con query directo para SELECT
            if (statement.toUpperCase().startsWith('SELECT')) {
              const { error: queryError } = await supabase.from('_').select('*').limit(0);
              if (queryError && !queryError.message.includes('relation "_" does not exist')) {
                throw error;
              }
            } else {
              throw error;
            }
          }
        }
      }
      console.log(`✅ Success: ${file}\n`);
    } catch (error) {
      console.error(`❌ Error in ${file}:`, error.message);
      console.log('💡 Intentando método alternativo...');
      
      // Método alternativo: ejecutar directamente con fetch
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/rpc/exec`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
            'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY
          },
          body: JSON.stringify({ sql })
        });
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${await response.text()}`);
        }
        
        console.log(`✅ Success (alternative method): ${file}\n`);
      } catch (altError) {
        console.error(`❌ Alternative method also failed:`, altError.message);
        console.log('\n🔧 Solución manual:');
        console.log('   1. Ve a tu dashboard de Supabase');
        console.log('   2. Ve a SQL Editor');
        console.log('   3. Copia y pega el contenido del archivo:', file);
        console.log('   4. Ejecuta el SQL manualmente\n');
        process.exit(1);
      }
    }
  }

  console.log('✨ All migrations completed successfully!');
}

runMigrations();

