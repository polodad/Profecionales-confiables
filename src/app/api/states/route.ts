import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = await createClient()

  const { data: cities, error } = await supabase
    .from('cities')
    .select('*')
    .eq('is_active', true)
    .order('name')

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Mapeo de ciudades a estados
  const cityStateMap: Record<string, string> = {
    'Aguascalientes': 'Aguascalientes',
    'Mexicali': 'Baja California',
    'Tijuana': 'Baja California',
    'Ensenada': 'Baja California',
    'Tecate': 'Baja California',
    'Rosarito': 'Baja California',
    'La Paz': 'Baja California Sur',
    'Cabo San Lucas': 'Baja California Sur',
    'San José del Cabo': 'Baja California Sur',
    'Ciudad Constitución': 'Baja California Sur',
    'San Francisco de Campeche': 'Campeche',
    'Ciudad del Carmen': 'Campeche',
    'Champotón': 'Campeche',
    'Saltillo': 'Coahuila',
    'Torreón': 'Coahuila',
    'Monclova': 'Coahuila',
    'Piedras Negras': 'Coahuila',
    'Acuña': 'Coahuila',
    'Colima': 'Colima',
    'Manzanillo': 'Colima',
    'Tecomán': 'Colima',
    'Tuxtla Gutiérrez': 'Chiapas',
    'San Cristóbal de las Casas': 'Chiapas',
    'Tapachula': 'Chiapas',
    'Comitán': 'Chiapas',
    'Chihuahua': 'Chihuahua',
    'Ciudad Juárez': 'Chihuahua',
    'Delicias': 'Chihuahua',
    'Cuauhtémoc': 'Chihuahua',
    'Parral': 'Chihuahua',
    'Ciudad de México': 'Ciudad de México',
    'Victoria de Durango': 'Durango',
    'Gómez Palacio': 'Durango',
    'Guanajuato': 'Guanajuato',
    'León': 'Guanajuato',
    'Irapuato': 'Guanajuato',
    'Celaya': 'Guanajuato',
    'Salamanca': 'Guanajuato',
    'Chilpancingo de los Bravo': 'Guerrero',
    'Acapulco': 'Guerrero',
    'Iguala': 'Guerrero',
    'Zihuatanejo': 'Guerrero',
    'Pachuca de Soto': 'Hidalgo',
    'Tulancingo': 'Hidalgo',
    'Tizayuca': 'Hidalgo',
    'Tula de Allende': 'Hidalgo',
    'Guadalajara': 'Jalisco',
    'Tepatitlán': 'Jalisco',
    'Puerto Vallarta': 'Jalisco',
    'Toluca de Lerdo': 'Estado de México',
    'Ecatepec': 'Estado de México',
    'Naucalpan': 'Estado de México',
    'Tlalnepantla': 'Estado de México',
    'Nezahualcóyotl': 'Estado de México',
    'Morelia': 'Michoacán',
    'Uruapan': 'Michoacán',
    'Zamora': 'Michoacán',
    'Lázaro Cárdenas': 'Michoacán',
    'Pátzcuaro': 'Michoacán',
    'Cuernavaca': 'Morelos',
    'Cuautla': 'Morelos',
    'Temixco': 'Morelos',
    'Tepic': 'Nayarit',
    'Bahía de Banderas': 'Nayarit',
    'Santiago Ixcuintla': 'Nayarit',
    'Monterrey': 'Nuevo León',
    'Oaxaca de Juárez': 'Oaxaca',
    'Salina Cruz': 'Oaxaca',
    'Juchitán': 'Oaxaca',
    'Tuxtepec': 'Oaxaca',
    'Puebla de Zaragoza': 'Puebla',
    'Tehuacán': 'Puebla',
    'San Martín Texmelucan': 'Puebla',
    'Atlixco': 'Puebla',
    'Santiago de Querétaro': 'Querétaro',
    'San Juan del Río': 'Querétaro',
    'Chetumal': 'Quintana Roo',
    'Cancún': 'Quintana Roo',
    'Playa del Carmen': 'Quintana Roo',
    'Tulum': 'Quintana Roo',
    'Cozumel': 'Quintana Roo',
    'San Luis Potosí': 'San Luis Potosí',
    'Ciudad Valles': 'San Luis Potosí',
    'Matehuala': 'San Luis Potosí',
    'Rioverde': 'San Luis Potosí',
    'Culiacán Rosales': 'Sinaloa',
    'Mazatlán': 'Sinaloa',
    'Los Mochis': 'Sinaloa',
    'Guasave': 'Sinaloa',
    'Hermosillo': 'Sonora',
    'Ciudad Obregón': 'Sonora',
    'Nogales': 'Sonora',
    'San Luis Río Colorado': 'Sonora',
    'Navojoa': 'Sonora',
    'Villahermosa': 'Tabasco',
    'Cárdenas': 'Tabasco',
    'Comalcalco': 'Tabasco',
    'Macuspana': 'Tabasco',
    'Ciudad Victoria': 'Tamaulipas',
    'Reynosa': 'Tamaulipas',
    'Tampico': 'Tamaulipas',
    'Matamoros': 'Tamaulipas',
    'Nuevo Laredo': 'Tamaulipas',
    'Tlaxcala de Xicohténcatl': 'Tlaxcala',
    'Apizaco': 'Tlaxcala',
    'Huamantla': 'Tlaxcala',
    'Xalapa-Enríquez': 'Veracruz',
    'Veracruz': 'Veracruz',
    'Coatzacoalcos': 'Veracruz',
    'Orizaba': 'Veracruz',
    'Poza Rica': 'Veracruz',
    'Mérida': 'Yucatán',
    'Valladolid': 'Yucatán',
    'Tizimín': 'Yucatán',
    'Progreso': 'Yucatán',
    'Zacatecas': 'Zacatecas',
    'Fresnillo': 'Zacatecas',
    'Jerez': 'Zacatecas',
  }

  // Agrupar ciudades por estado
  const statesData = cities?.reduce((acc: Record<string, { name: string; cities: any[]; totalZones: number }>, city) => {
    const stateName = cityStateMap[city.name] || 'Otros'
    
    if (!acc[stateName]) {
      acc[stateName] = {
        name: stateName,
        cities: [],
        totalZones: 0
      }
    }
    
    acc[stateName].cities.push(city)
    acc[stateName].totalZones += (city.zones as string[]).length
    
    return acc
  }, {}) || {}

  // Convertir a array y ordenar
  const states = Object.values(statesData)
    .sort((a, b) => a.name.localeCompare(b.name))

  return NextResponse.json(states)
}
