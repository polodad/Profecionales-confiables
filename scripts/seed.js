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
  const citiesData = [
    // Aguascalientes
    {
      name: 'Aguascalientes',
      slug: 'aguascalientes',
      zones: ['Centro', 'Jesús María', 'Calvillo', 'Rincón de Romos'],
      is_active: true,
    },
    // Baja California
    {
      name: 'Mexicali',
      slug: 'mexicali',
      zones: ['Centro', 'Valle Dorado', 'Nueva Mexicali', 'Valle Verde'],
      is_active: true,
    },
    {
      name: 'Tijuana',
      slug: 'tijuana',
      zones: ['Centro', 'Zona Río', 'Playas de Tijuana', 'Otay'],
      is_active: true,
    },
    {
      name: 'Ensenada',
      slug: 'ensenada',
      zones: ['Centro', 'Zona Playitas', 'Chapultepec', 'Maneadero'],
      is_active: true,
    },
    {
      name: 'Tecate',
      slug: 'tecate',
      zones: ['Centro', 'Norte', 'Sur'],
      is_active: true,
    },
    {
      name: 'Rosarito',
      slug: 'rosarito',
      zones: ['Centro', 'Playas de Rosarito', 'Primo Tapia'],
      is_active: true,
    },
    // Baja California Sur
    {
      name: 'La Paz',
      slug: 'la-paz',
      zones: ['Centro', 'El Zacatal', 'La Paz Este', 'La Paz Oeste'],
      is_active: true,
    },
    {
      name: 'Cabo San Lucas',
      slug: 'cabo-san-lucas',
      zones: ['Centro', 'Marina', 'Corredor Turístico', 'El Tezal'],
      is_active: true,
    },
    {
      name: 'San José del Cabo',
      slug: 'san-jose-del-cabo',
      zones: ['Centro Histórico', 'Zona Hotelera', 'Santa María', 'Las Veredas'],
      is_active: true,
    },
    {
      name: 'Ciudad Constitución',
      slug: 'ciudad-constitucion',
      zones: ['Centro', 'Norte', 'Sur'],
      is_active: true,
    },
    // Campeche
    {
      name: 'San Francisco de Campeche',
      slug: 'campeche',
      zones: ['Centro Histórico', 'Zona Norte', 'Zona Sur', 'Zona Este'],
      is_active: true,
    },
    {
      name: 'Ciudad del Carmen',
      slug: 'ciudad-del-carmen',
      zones: ['Centro', 'Isla Aguada', 'Playa Norte'],
      is_active: true,
    },
    {
      name: 'Champotón',
      slug: 'champoton',
      zones: ['Centro', 'Norte', 'Sur'],
      is_active: true,
    },
    // Coahuila
    {
      name: 'Saltillo',
      slug: 'saltillo',
      zones: ['Centro', 'Zona Norte', 'Zona Sur', 'Valle de las Torres'],
      is_active: true,
    },
    {
      name: 'Torreón',
      slug: 'torreon',
      zones: ['Centro', 'Zona Norte', 'Zona Sur', 'Residencial Gómez'],
      is_active: true,
    },
    {
      name: 'Monclova',
      slug: 'monclova',
      zones: ['Centro', 'Zona Norte', 'Zona Sur', 'Frontera'],
      is_active: true,
    },
    {
      name: 'Piedras Negras',
      slug: 'piedras-negras',
      zones: ['Centro', 'Zona Norte', 'Zona Sur'],
      is_active: true,
    },
    {
      name: 'Acuña',
      slug: 'acuna',
      zones: ['Centro', 'Norte', 'Sur'],
      is_active: true,
    },
    // Colima
    {
      name: 'Colima',
      slug: 'colima',
      zones: ['Centro', 'Villa de Álvarez', 'Zona Norte', 'Zona Sur'],
      is_active: true,
    },
    {
      name: 'Manzanillo',
      slug: 'manzanillo',
      zones: ['Centro', 'Zona Hotelera', 'Santiago', 'Salahua'],
      is_active: true,
    },
    {
      name: 'Tecomán',
      slug: 'tecoman',
      zones: ['Centro', 'Norte', 'Sur'],
      is_active: true,
    },
    // Chiapas
    {
      name: 'Tuxtla Gutiérrez',
      slug: 'tuxtla-gutierrez',
      zones: ['Centro', 'Poniente', 'Oriente', 'Norte', 'Sur'],
      is_active: true,
    },
    {
      name: 'San Cristóbal de las Casas',
      slug: 'san-cristobal-de-las-casas',
      zones: ['Centro Histórico', 'Zona Norte', 'Zona Sur', 'Zona Este'],
      is_active: true,
    },
    {
      name: 'Tapachula',
      slug: 'tapachula',
      zones: ['Centro', 'Zona Norte', 'Zona Sur', 'Puerto Madero'],
      is_active: true,
    },
    {
      name: 'Comitán',
      slug: 'comitan',
      zones: ['Centro', 'Norte', 'Sur'],
      is_active: true,
    },
    // Chihuahua
    {
      name: 'Chihuahua',
      slug: 'chihuahua',
      zones: ['Centro', 'Zona Norte', 'Zona Sur', 'Zona Este', 'Zona Oeste'],
      is_active: true,
    },
    {
      name: 'Ciudad Juárez',
      slug: 'ciudad-juarez',
      zones: ['Centro', 'Zona Norte', 'Zona Sur', 'Zona Este', 'Zona Oeste'],
      is_active: true,
    },
    {
      name: 'Delicias',
      slug: 'delicias',
      zones: ['Centro', 'Norte', 'Sur'],
      is_active: true,
    },
    {
      name: 'Cuauhtémoc',
      slug: 'cuauhtemoc',
      zones: ['Centro', 'Norte', 'Sur'],
      is_active: true,
    },
    {
      name: 'Parral',
      slug: 'parral',
      zones: ['Centro', 'Norte', 'Sur'],
      is_active: true,
    },
    // Ciudad de México
    {
      name: 'Ciudad de México',
      slug: 'cdmx',
      zones: ['Benito Juárez', 'Miguel Hidalgo', 'Coyoacán', 'Cuauhtémoc', 'Iztapalapa', 'Gustavo A. Madero'],
      is_active: true,
    },
    // Durango
    {
      name: 'Victoria de Durango',
      slug: 'durango',
      zones: ['Centro', 'Zona Norte', 'Zona Sur', 'Zona Este'],
      is_active: true,
    },
    {
      name: 'Gómez Palacio',
      slug: 'gomez-palacio',
      zones: ['Centro', 'Zona Norte', 'Zona Sur', 'Lerdo'],
      is_active: true,
    },
    // Guanajuato
    {
      name: 'Guanajuato',
      slug: 'guanajuato',
      zones: ['Centro', 'Zona Norte', 'Zona Sur', 'Marfil'],
      is_active: true,
    },
    {
      name: 'León',
      slug: 'leon',
      zones: ['Centro', 'Zona Norte', 'Zona Sur', 'Zona Este', 'Zona Oeste'],
      is_active: true,
    },
    {
      name: 'Irapuato',
      slug: 'irapuato',
      zones: ['Centro', 'Zona Norte', 'Zona Sur', 'Zona Este'],
      is_active: true,
    },
    {
      name: 'Celaya',
      slug: 'celaya',
      zones: ['Centro', 'Zona Norte', 'Zona Sur', 'Zona Este'],
      is_active: true,
    },
    {
      name: 'Salamanca',
      slug: 'salamanca',
      zones: ['Centro', 'Norte', 'Sur'],
      is_active: true,
    },
    // Guerrero
    {
      name: 'Chilpancingo de los Bravo',
      slug: 'chilpancingo',
      zones: ['Centro', 'Zona Norte', 'Zona Sur'],
      is_active: true,
    },
    {
      name: 'Acapulco',
      slug: 'acapulco',
      zones: ['Zona Dorada', 'Zona Diamante', 'Centro', 'Caleta'],
      is_active: true,
    },
    {
      name: 'Iguala',
      slug: 'iguala',
      zones: ['Centro', 'Norte', 'Sur'],
      is_active: true,
    },
    {
      name: 'Zihuatanejo',
      slug: 'zihuatanejo',
      zones: ['Centro', 'Playa La Ropa', 'Playa Las Gatas', 'Ixtapa'],
      is_active: true,
    },
    // Hidalgo
    {
      name: 'Pachuca de Soto',
      slug: 'pachuca',
      zones: ['Centro', 'Zona Norte', 'Zona Sur', 'Zona Plateada'],
      is_active: true,
    },
    {
      name: 'Tulancingo',
      slug: 'tulancingo',
      zones: ['Centro', 'Norte', 'Sur'],
      is_active: true,
    },
    {
      name: 'Tizayuca',
      slug: 'tizayuca',
      zones: ['Centro', 'Norte', 'Sur'],
      is_active: true,
    },
    {
      name: 'Tula de Allende',
      slug: 'tula-de-allende',
      zones: ['Centro', 'Norte', 'Sur'],
      is_active: true,
    },
    // Jalisco
    {
      name: 'Guadalajara',
      slug: 'guadalajara',
      zones: ['Centro', 'Zapopan', 'Tlaquepaque', 'Tonalá', 'Zona Minerva'],
      is_active: true,
    },
    {
      name: 'Tepatitlán',
      slug: 'tepatitlan',
      zones: ['Centro', 'Norte', 'Sur'],
      is_active: true,
    },
    {
      name: 'Puerto Vallarta',
      slug: 'puerto-vallarta',
      zones: ['Centro', 'Zona Hotelera', 'Zona Romántica', 'Marina Vallarta'],
      is_active: true,
    },
    // Estado de México
    {
      name: 'Toluca de Lerdo',
      slug: 'toluca',
      zones: ['Centro', 'Zona Norte', 'Zona Sur', 'Metepec'],
      is_active: true,
    },
    {
      name: 'Ecatepec',
      slug: 'ecatepec',
      zones: ['Centro', 'Zona Norte', 'Zona Sur'],
      is_active: true,
    },
    {
      name: 'Naucalpan',
      slug: 'naucalpan',
      zones: ['Centro', 'Satélite', 'Zona Industrial'],
      is_active: true,
    },
    {
      name: 'Tlalnepantla',
      slug: 'tlalnepantla',
      zones: ['Centro', 'Zona Industrial', 'Zona Residencial'],
      is_active: true,
    },
    {
      name: 'Nezahualcóyotl',
      slug: 'nezahualcoyotl',
      zones: ['Centro', 'Zona Norte', 'Zona Sur'],
      is_active: true,
    },
    // Michoacán
    {
      name: 'Morelia',
      slug: 'morelia',
      zones: ['Centro', 'Zona Norte', 'Zona Sur', 'Altozano'],
      is_active: true,
    },
    {
      name: 'Uruapan',
      slug: 'uruapan',
      zones: ['Centro', 'Norte', 'Sur'],
      is_active: true,
    },
    {
      name: 'Zamora',
      slug: 'zamora',
      zones: ['Centro', 'Norte', 'Sur'],
      is_active: true,
    },
    {
      name: 'Lázaro Cárdenas',
      slug: 'lazaro-cardenas',
      zones: ['Centro', 'Norte', 'Sur'],
      is_active: true,
    },
    {
      name: 'Pátzcuaro',
      slug: 'patzcuaro',
      zones: ['Centro', 'Norte', 'Sur'],
      is_active: true,
    },
    // Morelos
    {
      name: 'Cuernavaca',
      slug: 'cuernavaca',
      zones: ['Centro', 'Zona Norte', 'Zona Sur', 'Jiutepec'],
      is_active: true,
    },
    {
      name: 'Cuautla',
      slug: 'cuautla',
      zones: ['Centro', 'Norte', 'Sur'],
      is_active: true,
    },
    {
      name: 'Temixco',
      slug: 'temixco',
      zones: ['Centro', 'Norte', 'Sur'],
      is_active: true,
    },
    // Nayarit
    {
      name: 'Tepic',
      slug: 'tepic',
      zones: ['Centro', 'Zona Norte', 'Zona Sur'],
      is_active: true,
    },
    {
      name: 'Bahía de Banderas',
      slug: 'bahia-de-banderas',
      zones: ['Nuevo Vallarta', 'Bucerias', 'La Cruz de Huanacaxtle', 'Punta Mita'],
      is_active: true,
    },
    {
      name: 'Santiago Ixcuintla',
      slug: 'santiago-ixcuintla',
      zones: ['Centro', 'Norte', 'Sur'],
      is_active: true,
    },
    // Nuevo León
    {
      name: 'Monterrey',
      slug: 'monterrey',
      zones: ['Centro', 'San Pedro', 'Santa Catarina', 'San Nicolás', 'Guadalupe', 'Apodaca'],
      is_active: true,
    },
    // Oaxaca
    {
      name: 'Oaxaca de Juárez',
      slug: 'oaxaca',
      zones: ['Centro', 'Zona Norte', 'Zona Sur', 'Zona Este'],
      is_active: true,
    },
    {
      name: 'Salina Cruz',
      slug: 'salina-cruz',
      zones: ['Centro', 'Norte', 'Sur'],
      is_active: true,
    },
    {
      name: 'Juchitán',
      slug: 'juchitan',
      zones: ['Centro', 'Norte', 'Sur'],
      is_active: true,
    },
    {
      name: 'Tuxtepec',
      slug: 'tuxtepec',
      zones: ['Centro', 'Norte', 'Sur'],
      is_active: true,
    },
    // Puebla
    {
      name: 'Puebla de Zaragoza',
      slug: 'puebla',
      zones: ['Centro', 'Zona Norte', 'Zona Sur', 'Zona Este', 'Zona Oeste'],
      is_active: true,
    },
    {
      name: 'Tehuacán',
      slug: 'tehuacan',
      zones: ['Centro', 'Norte', 'Sur'],
      is_active: true,
    },
    {
      name: 'San Martín Texmelucan',
      slug: 'san-martin-texmelucan',
      zones: ['Centro', 'Norte', 'Sur'],
      is_active: true,
    },
    {
      name: 'Atlixco',
      slug: 'atlixco',
      zones: ['Centro', 'Norte', 'Sur'],
      is_active: true,
    },
    // Querétaro
    {
      name: 'Santiago de Querétaro',
      slug: 'queretaro',
      zones: ['Centro', 'Zona Norte', 'Zona Sur', 'El Marqués', 'Corregidora'],
      is_active: true,
    },
    {
      name: 'San Juan del Río',
      slug: 'san-juan-del-rio',
      zones: ['Centro', 'Norte', 'Sur'],
      is_active: true,
    },
    // Quintana Roo
    {
      name: 'Chetumal',
      slug: 'chetumal',
      zones: ['Centro', 'Zona Norte', 'Zona Sur', 'Calderitas'],
      is_active: true,
    },
    {
      name: 'Cancún',
      slug: 'cancun',
      zones: ['Zona Hotelera', 'Centro', 'Zona Norte', 'Zona Sur'],
      is_active: true,
    },
    {
      name: 'Playa del Carmen',
      slug: 'playa-del-carmen',
      zones: ['Centro', 'Playacar', 'Zona Norte', 'Zona Sur'],
      is_active: true,
    },
    {
      name: 'Tulum',
      slug: 'tulum',
      zones: ['Centro', 'Zona Hotelera', 'Aldea Zamá', 'La Veleta'],
      is_active: true,
    },
    {
      name: 'Cozumel',
      slug: 'cozumel',
      zones: ['Centro', 'Zona Norte', 'Zona Sur'],
      is_active: true,
    },
    // San Luis Potosí
    {
      name: 'San Luis Potosí',
      slug: 'san-luis-potosi',
      zones: ['Centro', 'Zona Norte', 'Zona Sur', 'Zona Este', 'Zona Oeste'],
      is_active: true,
    },
    {
      name: 'Ciudad Valles',
      slug: 'ciudad-valles',
      zones: ['Centro', 'Norte', 'Sur'],
      is_active: true,
    },
    {
      name: 'Matehuala',
      slug: 'matehuala',
      zones: ['Centro', 'Norte', 'Sur'],
      is_active: true,
    },
    {
      name: 'Rioverde',
      slug: 'rioverde',
      zones: ['Centro', 'Norte', 'Sur'],
      is_active: true,
    },
    // Sinaloa
    {
      name: 'Culiacán Rosales',
      slug: 'culiacan',
      zones: ['Centro', 'Zona Norte', 'Zona Sur', 'Zona Dorada'],
      is_active: true,
    },
    {
      name: 'Mazatlán',
      slug: 'mazatlan',
      zones: ['Centro', 'Zona Dorada', 'Zona Norte', 'Marina'],
      is_active: true,
    },
    {
      name: 'Los Mochis',
      slug: 'los-mochis',
      zones: ['Centro', 'Norte', 'Sur'],
      is_active: true,
    },
    {
      name: 'Guasave',
      slug: 'guasave',
      zones: ['Centro', 'Norte', 'Sur'],
      is_active: true,
    },
    // Sonora
    {
      name: 'Hermosillo',
      slug: 'hermosillo',
      zones: ['Centro', 'Zona Norte', 'Zona Sur', 'Zona Este', 'Zona Oeste'],
      is_active: true,
    },
    {
      name: 'Ciudad Obregón',
      slug: 'ciudad-obregon',
      zones: ['Centro', 'Norte', 'Sur'],
      is_active: true,
    },
    {
      name: 'Nogales',
      slug: 'nogales',
      zones: ['Centro', 'Norte', 'Sur'],
      is_active: true,
    },
    {
      name: 'San Luis Río Colorado',
      slug: 'san-luis-rio-colorado',
      zones: ['Centro', 'Norte', 'Sur'],
      is_active: true,
    },
    {
      name: 'Navojoa',
      slug: 'navojoa',
      zones: ['Centro', 'Norte', 'Sur'],
      is_active: true,
    },
    // Tabasco
    {
      name: 'Villahermosa',
      slug: 'villahermosa',
      zones: ['Centro', 'Zona Norte', 'Zona Sur', 'Zona Este'],
      is_active: true,
    },
    {
      name: 'Cárdenas',
      slug: 'cardenas',
      zones: ['Centro', 'Norte', 'Sur'],
      is_active: true,
    },
    {
      name: 'Comalcalco',
      slug: 'comalcalco',
      zones: ['Centro', 'Norte', 'Sur'],
      is_active: true,
    },
    {
      name: 'Macuspana',
      slug: 'macuspana',
      zones: ['Centro', 'Norte', 'Sur'],
      is_active: true,
    },
    // Tamaulipas
    {
      name: 'Ciudad Victoria',
      slug: 'ciudad-victoria',
      zones: ['Centro', 'Zona Norte', 'Zona Sur'],
      is_active: true,
    },
    {
      name: 'Reynosa',
      slug: 'reynosa',
      zones: ['Centro', 'Zona Norte', 'Zona Sur'],
      is_active: true,
    },
    {
      name: 'Tampico',
      slug: 'tampico',
      zones: ['Centro', 'Zona Norte', 'Zona Sur', 'Madero'],
      is_active: true,
    },
    {
      name: 'Matamoros',
      slug: 'matamoros',
      zones: ['Centro', 'Norte', 'Sur'],
      is_active: true,
    },
    {
      name: 'Nuevo Laredo',
      slug: 'nuevo-laredo',
      zones: ['Centro', 'Norte', 'Sur'],
      is_active: true,
    },
    // Tlaxcala
    {
      name: 'Tlaxcala de Xicohténcatl',
      slug: 'tlaxcala',
      zones: ['Centro', 'Zona Norte', 'Zona Sur'],
      is_active: true,
    },
    {
      name: 'Apizaco',
      slug: 'apizaco',
      zones: ['Centro', 'Norte', 'Sur'],
      is_active: true,
    },
    {
      name: 'Huamantla',
      slug: 'huamantla',
      zones: ['Centro', 'Norte', 'Sur'],
      is_active: true,
    },
    // Veracruz
    {
      name: 'Xalapa-Enríquez',
      slug: 'xalapa',
      zones: ['Centro', 'Zona Norte', 'Zona Sur', 'Zona Este'],
      is_active: true,
    },
    {
      name: 'Veracruz',
      slug: 'veracruz',
      zones: ['Centro', 'Boca del Río', 'Zona Norte', 'Zona Sur'],
      is_active: true,
    },
    {
      name: 'Coatzacoalcos',
      slug: 'coatzacoalcos',
      zones: ['Centro', 'Norte', 'Sur'],
      is_active: true,
    },
    {
      name: 'Orizaba',
      slug: 'orizaba',
      zones: ['Centro', 'Norte', 'Sur'],
      is_active: true,
    },
    {
      name: 'Poza Rica',
      slug: 'poza-rica',
      zones: ['Centro', 'Norte', 'Sur'],
      is_active: true,
    },
    // Yucatán
    {
      name: 'Mérida',
      slug: 'merida',
      zones: ['Centro', 'Zona Norte', 'Zona Sur', 'Zona Este', 'Zona Oeste'],
      is_active: true,
    },
    {
      name: 'Valladolid',
      slug: 'valladolid',
      zones: ['Centro', 'Norte', 'Sur'],
      is_active: true,
    },
    {
      name: 'Tizimín',
      slug: 'tizimin',
      zones: ['Centro', 'Norte', 'Sur'],
      is_active: true,
    },
    {
      name: 'Progreso',
      slug: 'progreso',
      zones: ['Centro', 'Zona Costera', 'Zona Residencial'],
      is_active: true,
    },
    // Zacatecas
    {
      name: 'Zacatecas',
      slug: 'zacatecas',
      zones: ['Centro Histórico', 'Zona Norte', 'Zona Sur', 'Guadalupe'],
      is_active: true,
    },
    {
      name: 'Fresnillo',
      slug: 'fresnillo',
      zones: ['Centro', 'Norte', 'Sur'],
      is_active: true,
    },
    {
      name: 'Jerez',
      slug: 'jerez',
      zones: ['Centro', 'Norte', 'Sur'],
      is_active: true,
    },
  ];

  const { data: cities, error: citiesError } = await supabase
    .from('cities')
    .upsert(citiesData, { onConflict: 'slug' })
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

