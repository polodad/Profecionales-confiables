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
    {
      trade: 'herreria',
      name: 'Fabricación e instalación de herrería',
      slug: 'fabricacion-herreria',
      description: 'Fabricación e instalación de rejas, portones y estructuras metálicas',
      unit: 'm2',
      base_price: 600,
      rules_json: {
        base_visit: 300,
        tarifa_m2: 600,
        min_total: 2000,
        incluye_materiales: false,
        recargo_urgencia: { 'mismo_dia': 0.3, '24-48h': 0.15 },
        recargo_zona_lejana: 150,
      },
    },
    {
      trade: 'soldadura',
      name: 'Soldadura y reparación',
      slug: 'soldadura-reparacion',
      description: 'Trabajos de soldadura y reparación de estructuras metálicas',
      unit: 'servicio',
      base_price: 500,
      rules_json: {
        base_visit: 350,
        tarifa_hora: 250,
        min_total: 600,
        recargo_urgencia: { '2-6h': 0.4, 'mismo_dia': 0.25, '24-48h': 0.15 },
        recargo_zona_lejana: 120,
      },
    },
    {
      trade: 'jardineria',
      name: 'Mantenimiento de jardín',
      slug: 'mantenimiento-jardin',
      description: 'Poda, limpieza y mantenimiento de áreas verdes',
      unit: 'm2',
      base_price: 35,
      rules_json: {
        base_visit: 200,
        tarifa_m2: 35,
        min_total: 500,
        incluye_materiales: false,
        recargo_urgencia: { 'mismo_dia': 0.2, '24-48h': 0.1 },
        recargo_zona_lejana: 100,
      },
    },
    {
      trade: 'vidrieria',
      name: 'Instalación de vidrios',
      slug: 'instalacion-vidrios',
      description: 'Instalación y reparación de vidrios para ventanas, puertas y espejos',
      unit: 'm2',
      base_price: 450,
      rules_json: {
        base_visit: 250,
        tarifa_m2: 450,
        min_total: 800,
        incluye_materiales: false,
        recargo_urgencia: { '2-6h': 0.35, 'mismo_dia': 0.2, '24-48h': 0.1 },
        recargo_zona_lejana: 100,
      },
    },
    {
      trade: 'instalacion-gas',
      name: 'Instalación de gas',
      slug: 'instalacion-gas',
      description: 'Instalación y reparación de sistemas de gas',
      unit: 'servicio',
      base_price: 800,
      rules_json: {
        base_visit: 400,
        tarifa_hora: 300,
        min_total: 1000,
        recargo_urgencia: { '2-6h': 0.5, 'mismo_dia': 0.35, '24-48h': 0.2 },
        recargo_zona_lejana: 150,
      },
    },
    {
      trade: 'aire-acondicionado',
      name: 'Instalación de aire acondicionado',
      slug: 'instalacion-aire-acondicionado',
      description: 'Instalación, mantenimiento y reparación de sistemas de climatización',
      unit: 'unidad',
      base_price: 1200,
      rules_json: {
        base_visit: 350,
        tarifa_unidad: 1200,
        min_total: 1500,
        recargo_urgencia: { 'mismo_dia': 0.3, '24-48h': 0.15 },
        recargo_zona_lejana: 150,
      },
    },
    {
      trade: 'instalacion-cctv',
      name: 'Instalación de CCTV',
      slug: 'instalacion-cctv',
      description: 'Instalación y configuración de sistemas de videovigilancia',
      unit: 'camara',
      base_price: 800,
      rules_json: {
        base_visit: 400,
        tarifa_unidad: 800,
        min_total: 1500,
        recargo_urgencia: { 'mismo_dia': 0.25, '24-48h': 0.12 },
        recargo_zona_lejana: 150,
      },
    },
    {
      trade: 'paneles-solares',
      name: 'Instalación de paneles solares',
      slug: 'instalacion-paneles-solares',
      description: 'Instalación de sistemas de energía solar',
      unit: 'panel',
      base_price: 2500,
      rules_json: {
        base_visit: 500,
        tarifa_unidad: 2500,
        min_total: 5000,
        incluye_materiales: false,
        recargo_urgencia: { '24-48h': 0.2 },
        recargo_zona_lejana: 200,
      },
    },
    {
      trade: 'tapiceria',
      name: 'Tapizado de muebles',
      slug: 'tapizado-muebles',
      description: 'Tapizado y retapizado de muebles',
      unit: 'pieza',
      base_price: 1500,
      rules_json: {
        base_visit: 200,
        tarifa_unidad: 1500,
        min_total: 1700,
        incluye_materiales: false,
        recargo_urgencia: { '24-48h': 0.15 },
        recargo_zona_lejana: 100,
      },
    },
    {
      trade: 'cerrajeria',
      name: 'Apertura y cambio de cerraduras',
      slug: 'cerrajeria',
      description: 'Apertura de puertas, cambio e instalación de cerraduras',
      unit: 'servicio',
      base_price: 450,
      rules_json: {
        base_visit: 300,
        tarifa_hora: 200,
        min_total: 450,
        recargo_urgencia: { '2-6h': 0.5, 'mismo_dia': 0.3, '24-48h': 0.15 },
        recargo_zona_lejana: 100,
      },
    },
    {
      trade: 'mecanica',
      name: 'Reparación mecánica',
      slug: 'reparacion-mecanica',
      description: 'Reparación y mantenimiento de vehículos',
      unit: 'servicio',
      base_price: 500,
      rules_json: {
        base_visit: 250,
        tarifa_hora: 280,
        min_total: 500,
        incluye_materiales: false,
        recargo_urgencia: { '2-6h': 0.4, 'mismo_dia': 0.25, '24-48h': 0.1 },
        recargo_zona_lejana: 120,
      },
    },
    {
      trade: 'chofer',
      name: 'Servicio de chofer',
      slug: 'servicio-chofer',
      description: 'Servicio de conductor particular',
      unit: 'hora',
      base_price: 150,
      rules_json: {
        base_visit: 0,
        tarifa_hora: 150,
        min_total: 300,
        recargo_urgencia: { '2-6h': 0.3, 'mismo_dia': 0.15 },
        recargo_zona_lejana: 80,
      },
    },
    {
      trade: 'limpieza',
      name: 'Limpieza y mantenimiento',
      slug: 'limpieza-mantenimiento',
      description: 'Limpieza profunda y mantenimiento de inmuebles',
      unit: 'm2',
      base_price: 25,
      rules_json: {
        base_visit: 200,
        tarifa_m2: 25,
        min_total: 400,
        incluye_materiales: false,
        recargo_urgencia: { 'mismo_dia': 0.2, '24-48h': 0.1 },
        recargo_zona_lejana: 80,
      },
    },
    {
      trade: 'azulejeria',
      name: 'Instalación de azulejos',
      slug: 'instalacion-azulejos',
      description: 'Instalación de azulejos en pisos y muros',
      unit: 'm2',
      base_price: 180,
      rules_json: {
        base_visit: 300,
        tarifa_m2: 180,
        min_total: 1500,
        incluye_materiales: false,
        recargo_urgencia: { '24-48h': 0.15 },
        recargo_zona_lejana: 120,
      },
    },
    {
      trade: 'acabados',
      name: 'Instalación de pisos y acabados',
      slug: 'instalacion-pisos-acabados',
      description: 'Instalación de pisos, loseta y recubrimientos',
      unit: 'm2',
      base_price: 200,
      rules_json: {
        base_visit: 300,
        tarifa_m2: 200,
        min_total: 1800,
        incluye_materiales: false,
        recargo_urgencia: { '24-48h': 0.15 },
        recargo_zona_lejana: 120,
      },
    },
    {
      trade: 'techado',
      name: 'Techado e impermeabilización',
      slug: 'techado-impermeabilizacion',
      description: 'Instalación de techos e impermeabilización',
      unit: 'm2',
      base_price: 280,
      rules_json: {
        base_visit: 350,
        tarifa_m2: 280,
        min_total: 2000,
        incluye_materiales: false,
        recargo_urgencia: { 'mismo_dia': 0.3, '24-48h': 0.15 },
        recargo_zona_lejana: 150,
      },
    },
  ];

  // Add is_active field to all services
  const servicesWithActive = services.map(service => ({
    ...service,
    is_active: true
  }));

  const { data: servicesData, error: servicesError } = await supabase
    .from('services')
    .upsert(servicesWithActive, { onConflict: 'slug' })
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

