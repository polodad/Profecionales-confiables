#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');

require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function seed() {
  console.log('🌱 Seeding database...\n');

  // Seed cities
  console.log('📍 Adding cities...');
  const { data: cities, error: citiesError } = await supabase
    .from('cities')
    .upsert([
      {
        name: 'Ciudad de México',
        slug: 'cdmx',
        zones: ['Centro', 'Norte', 'Sur', 'Oriente', 'Poniente'],
        is_active: true,
      },
      {
        name: 'Guadalajara',
        slug: 'guadalajara',
        zones: ['Centro', 'Zapopan', 'Tlaquepaque', 'Tonalá'],
        is_active: true,
      },
      {
        name: 'Monterrey',
        slug: 'monterrey',
        zones: ['Centro', 'San Pedro', 'Santa Catarina', 'San Nicolás'],
        is_active: true,
      },
    ], { onConflict: 'slug' })
    .select();

  if (citiesError) {
    console.error('❌ Error seeding cities:', citiesError);
    process.exit(1);
  }

  console.log(`✅ Added ${cities.length} cities\n`);

  // Seed services
  console.log('🔧 Adding services...');
  const services = [
    {
      trade: 'plomeria',
      name: 'Reparación de fugas',
      slug: 'reparacion-fugas',
      description: 'Detección y reparación de fugas de agua',
      unit: 'servicio',
      base_price: 350,
      rules_json: {
        base_visit: 250,
        tarifa_hora: 180,
        min_total: 350,
        recargo_urgencia: { '2-6h': 0.35, 'mismo_dia': 0.2, '24-48h': 0.1 },
        recargo_zona_lejana: 80,
      },
    },
    {
      trade: 'electricidad',
      name: 'Instalación eléctrica',
      slug: 'instalacion-electrica',
      description: 'Instalación y reparación de sistemas eléctricos',
      unit: 'punto',
      base_price: 200,
      rules_json: {
        base_visit: 300,
        tarifa_punto: 200,
        min_total: 500,
        recargo_urgencia: { '2-6h': 0.4, 'mismo_dia': 0.25, '24-48h': 0.15 },
        recargo_zona_lejana: 100,
      },
    },
    {
      trade: 'pintura',
      name: 'Pintura interior',
      slug: 'pintura-interior',
      description: 'Pintura de interiores residenciales',
      unit: 'm2',
      base_price: 55,
      rules_json: {
        base_visit: 250,
        tarifa_m2: 55,
        min_total: 800,
        incluye_materiales: false,
        recargo_urgencia: { '2-6h': 0.35, 'mismo_dia': 0.2, '24-48h': 0.1 },
        recargo_altura: 0.15,
        recargo_zona_lejana: 80,
      },
    },
    {
      trade: 'albanileria',
      name: 'Construcción de muros',
      slug: 'construccion-muros',
      description: 'Construcción y reparación de muros',
      unit: 'm2',
      base_price: 350,
      rules_json: {
        base_visit: 300,
        tarifa_m2: 350,
        min_total: 1500,
        incluye_materiales: false,
        recargo_urgencia: { 'mismo_dia': 0.3, '24-48h': 0.15 },
        recargo_zona_lejana: 150,
      },
    },
    {
      trade: 'carpinteria',
      name: 'Instalación de puertas',
      slug: 'instalacion-puertas',
      description: 'Instalación y reparación de puertas',
      unit: 'unidad',
      base_price: 800,
      rules_json: {
        base_visit: 200,
        tarifa_unidad: 800,
        min_total: 1000,
        recargo_urgencia: { 'mismo_dia': 0.25, '24-48h': 0.12 },
        recargo_zona_lejana: 100,
      },
    },
    {
      trade: 'yeseria',
      name: 'Aplicación de yeso',
      slug: 'aplicacion-yeso',
      description: 'Aplicación y acabados de yeso',
      unit: 'm2',
      base_price: 120,
      rules_json: {
        base_visit: 250,
        tarifa_m2: 120,
        min_total: 1200,
        incluye_materiales: false,
        recargo_urgencia: { '24-48h': 0.15 },
        recargo_zona_lejana: 100,
      },
    },
  ];

  const { data: servicesData, error: servicesError } = await supabase
    .from('services')
    .upsert(services, { onConflict: 'slug' })
    .select();

  if (servicesError) {
    console.error('❌ Error seeding services:', servicesError);
    process.exit(1);
  }

  console.log(`✅ Added ${servicesData.length} services\n`);

  // Seed city-specific pricing
  console.log('💰 Adding city-specific pricing...');
  const cityPrices = [];
  
  cities.forEach(city => {
    servicesData.forEach(service => {
      let overrides = {};
      
      // CDMX tiene precios más altos
      if (city.slug === 'cdmx') {
        overrides = { price_multiplier: 1.15 };
      }
      // Monterrey también
      if (city.slug === 'monterrey') {
        overrides = { price_multiplier: 1.10 };
      }
      
      cityPrices.push({
        city_id: city.id,
        service_id: service.id,
        overrides_json: overrides,
      });
    });
  });

  const { error: pricesError } = await supabase
    .from('city_prices')
    .upsert(cityPrices, { onConflict: 'city_id,service_id' });

  if (pricesError) {
    console.error('❌ Error seeding city prices:', pricesError);
    process.exit(1);
  }

  console.log(`✅ Added ${cityPrices.length} city price overrides\n`);

  console.log('✨ Seeding completed successfully!');
}

seed();

