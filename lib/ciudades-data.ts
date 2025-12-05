export interface CiudadData {
  slug: string
  nombre: string
  provincia?: string
  descripcionCorta: string
  descripcionLarga: string
  poblacion?: string
  destacados: string[]
  sectoresPopulares: string[]
  ventajasLocales: string[]
}

export const ciudades: CiudadData[] = [
  // TIER 1 - Principales ciudades
  {
    slug: 'madrid',
    nombre: 'Madrid',
    descripcionCorta: 'capital de España',
    descripcionLarga: 'Tu negocio en Madrid merece una web profesional que destaque en el competitivo mercado madrileño',
    poblacion: '3.3M habitantes',
    destacados: ['Capital de España', 'Hub empresarial', 'Máxima competencia digital'],
    sectoresPopulares: ['Startups', 'Consultoría', 'Restauración', 'Servicios profesionales'],
    ventajasLocales: [
      'Posicionamiento en búsquedas "Madrid"',
      'Adaptado al mercado madrileño',
      'SEO local optimizado'
    ]
  },
  {
    slug: 'barcelona',
    nombre: 'Barcelona',
    descripcionCorta: 'motor económico mediterráneo',
    descripcionLarga: 'Destaca en el vibrante ecosistema digital barcelonés con una web que refleje la innovación de la ciudad',
    poblacion: '1.6M habitantes',
    destacados: ['Hub tecnológico', 'Ciudad cosmopolita', 'Turismo internacional'],
    sectoresPopulares: ['Tech', 'Turismo', 'Diseño', 'E-commerce'],
    ventajasLocales: [
      'Optimizado para "Barcelona" + sector',
      'Multiidioma (ES/CAT/EN)',
      'Atracción turística integrada'
    ]
  },
  {
    slug: 'valencia',
    nombre: 'Valencia',
    descripcionCorta: 'tercera ciudad de España',
    descripcionLarga: 'Impulsa tu negocio valenciano con una presencia web moderna que conecte con el dinámico mercado local',
    poblacion: '800K habitantes',
    destacados: ['Ciudad mediterránea', 'Crecimiento tecnológico', 'Puerto comercial'],
    sectoresPopulares: ['Comercio', 'Turismo', 'Industria', 'Servicios'],
    ventajasLocales: [
      'SEO Valencia optimizado',
      'Mercado local y turístico',
      'Sector exportación'
    ]
  },
  {
    slug: 'sevilla',
    nombre: 'Sevilla',
    descripcionCorta: 'capital andaluza',
    descripcionLarga: 'Conquista el mercado sevillano con una web que capture la esencia y el dinamismo del sur',
    poblacion: '688K habitantes',
    destacados: ['Capital Andalucía', 'Turismo cultural', 'Centro logístico'],
    sectoresPopulares: ['Turismo', 'Hostelería', 'Logística', 'Cultura'],
    ventajasLocales: [
      'SEO para turismo sevillano',
      'Mercado andaluz completo',
      'Búsquedas locales optimizadas'
    ]
  },
  {
    slug: 'zaragoza',
    nombre: 'Zaragoza',
    descripcionCorta: 'quinta ciudad española',
    descripcionLarga: 'Posiciona tu negocio zaragozano con una web profesional adaptada al mercado del Valle del Ebro',
    poblacion: '675K habitantes',
    destacados: ['Eje logístico', 'Ciudad industrial', 'Mercado aragonés'],
    sectoresPopulares: ['Logística', 'Industria', 'Comercio', 'Servicios'],
    ventajasLocales: [
      'SEO Zaragoza y Aragón',
      'Hub logístico nacional',
      'Mercado industrial'
    ]
  },
  {
    slug: 'malaga',
    nombre: 'Málaga',
    descripcionCorta: 'Costa del Sol',
    descripcionLarga: 'Destaca en el competitivo mercado malagueño con una web que atraiga tanto a locales como turistas',
    poblacion: '578K habitantes',
    destacados: ['Tech hub', 'Turismo Costa del Sol', 'Ciudad emprendedora'],
    sectoresPopulares: ['Tecnología', 'Turismo', 'Inmobiliaria', 'Hostelería'],
    ventajasLocales: [
      'SEO turismo + local',
      'Mercado internacional',
      'Silicon Valley español'
    ]
  },
  {
    slug: 'murcia',
    nombre: 'Murcia',
    descripcionCorta: 'capital de la huerta',
    descripcionLarga: 'Impulsa tu negocio murciano con una presencia digital que conecte con el creciente mercado local',
    poblacion: '460K habitantes',
    destacados: ['Agricultura avanzada', 'Universidad', 'Crecimiento sostenido'],
    sectoresPopulares: ['Agroalimentación', 'Comercio', 'Servicios', 'Educación'],
    ventajasLocales: [
      'SEO mercado murciano',
      'Sector agroalimentario',
      'Comercio regional'
    ]
  },
  {
    slug: 'palma',
    nombre: 'Palma de Mallorca',
    descripcionCorta: 'capital balear',
    descripcionLarga: 'Conquista el mercado balear con una web que atraiga turistas y conecte con el cliente local',
    poblacion: '416K habitantes',
    destacados: ['Turismo premium', 'Isla mediterránea', 'Hub náutico'],
    sectoresPopulares: ['Turismo', 'Hostelería', 'Náutica', 'Inmobiliaria'],
    ventajasLocales: [
      'SEO turismo Mallorca',
      'Multiidioma turistico',
      'Mercado premium'
    ]
  },
  {
    slug: 'bilbao',
    nombre: 'Bilbao',
    descripcionCorta: 'capital vizcaína',
    descripcionLarga: 'Destaca en el potente ecosistema empresarial vasco con una web moderna y profesional',
    poblacion: '346K habitantes',
    destacados: ['Ciudad industrial', 'Guggenheim', 'Norte innovador'],
    sectoresPopulares: ['Industria', 'Servicios', 'Tecnología', 'Turismo'],
    ventajasLocales: [
      'SEO País Vasco',
      'Mercado industrial',
      'Networking empresarial'
    ]
  },
  {
    slug: 'alicante',
    nombre: 'Alicante',
    descripcionCorta: 'costa mediterránea',
    descripcionLarga: 'Impulsa tu negocio alicantino con una web optimizada para el mercado mediterráneo y turístico',
    poblacion: '337K habitantes',
    destacados: ['Costa Blanca', 'Turismo residencial', 'Puerto mediterráneo'],
    sectoresPopulares: ['Turismo', 'Inmobiliaria', 'Comercio', 'Hostelería'],
    ventajasLocales: [
      'SEO Costa Blanca',
      'Turismo internacional',
      'Mercado inmobiliario'
    ]
  },

  // TIER 2 - Ciudades medianas
  {
    slug: 'cordoba',
    nombre: 'Córdoba',
    descripcionCorta: 'patrimonio andaluz',
    descripcionLarga: 'Posiciona tu negocio cordobés con una web profesional adaptada al mercado local y turístico',
    poblacion: '326K habitantes',
    destacados: ['Patrimonio UNESCO', 'Turismo cultural', 'Centro andaluz'],
    sectoresPopulares: ['Turismo', 'Hostelería', 'Cultura', 'Comercio'],
    ventajasLocales: [
      'SEO turismo Córdoba',
      'Mercado cultural',
      'Búsquedas patrimoniales'
    ]
  },
  {
    slug: 'valladolid',
    nombre: 'Valladolid',
    descripcionCorta: 'capital castellana',
    descripcionLarga: 'Destaca en el mercado vallisoletano con una web que refleje profesionalidad y confianza',
    poblacion: '298K habitantes',
    destacados: ['Capital Castilla y León', 'Ciudad universitaria', 'Industria automovilística'],
    sectoresPopulares: ['Automoción', 'Servicios', 'Educación', 'Comercio'],
    ventajasLocales: [
      'SEO Castilla y León',
      'Mercado universitario',
      'Sector industrial'
    ]
  },
  {
    slug: 'vigo',
    nombre: 'Vigo',
    descripcionCorta: 'motor gallego',
    descripcionLarga: 'Impulsa tu negocio vigués con una presencia digital adaptada al dinámico mercado atlántico',
    poblacion: '296K habitantes',
    destacados: ['Puerto pesquero', 'Industria automovilística', 'Rías Baixas'],
    sectoresPopulares: ['Pesca', 'Automoción', 'Logística', 'Turismo'],
    ventajasLocales: [
      'SEO Galicia atlántica',
      'Puerto comercial',
      'Mercado pesquero'
    ]
  },
  {
    slug: 'gijon',
    nombre: 'Gijón',
    descripcionCorta: 'costa asturiana',
    descripcionLarga: 'Destaca en el mercado gijonés con una web profesional para tu negocio en el Cantábrico',
    poblacion: '273K habitantes',
    destacados: ['Puerto marítimo', 'Playa urbana', 'Industria renovada'],
    sectoresPopulares: ['Turismo', 'Industria', 'Servicios', 'Hostelería'],
    ventajasLocales: [
      'SEO Asturias costa',
      'Turismo cantábrico',
      'Mercado industrial'
    ]
  },
  {
    slug: 'a-coruna',
    nombre: 'A Coruña',
    descripcionCorta: 'ciudad atlántica',
    descripcionLarga: 'Conquista el mercado coruñés con una web moderna adaptada al norte de Galicia',
    poblacion: '247K habitantes',
    destacados: ['Puerto atlántico', 'Torre de Hércules', 'Comercio gallego'],
    sectoresPopulares: ['Comercio', 'Turismo', 'Logística', 'Servicios'],
    ventajasLocales: [
      'SEO Galicia norte',
      'Puerto comercial',
      'Turismo patrimonial'
    ]
  },
  {
    slug: 'granada',
    nombre: 'Granada',
    descripcionCorta: 'ciudad de la Alhambra',
    descripcionLarga: 'Posiciona tu negocio granadino con una web que capture el potencial turístico y universitario',
    poblacion: '232K habitantes',
    destacados: ['Alhambra UNESCO', 'Ciudad universitaria', 'Sierra Nevada'],
    sectoresPopulares: ['Turismo', 'Hostelería', 'Educación', 'Deportes'],
    ventajasLocales: [
      'SEO turismo mundial',
      'Mercado universitario',
      'Turismo de nieve'
    ]
  },
  {
    slug: 'vitoria',
    nombre: 'Vitoria-Gasteiz',
    descripcionCorta: 'capital vasca',
    descripcionLarga: 'Impulsa tu negocio vitoriano con una web profesional en el corazón del País Vasco',
    poblacion: '252K habitantes',
    destacados: ['Capital País Vasco', 'Ciudad verde', 'Centro administrativo'],
    sectoresPopulares: ['Administración', 'Servicios', 'Industria', 'Comercio'],
    ventajasLocales: [
      'SEO Álava y País Vasco',
      'Mercado institucional',
      'Ciudad sostenible'
    ]
  },
  {
    slug: 'santander',
    nombre: 'Santander',
    descripcionCorta: 'capital cántabra',
    descripcionLarga: 'Destaca en el mercado santanderino con una web que conecte con el norte empresarial',
    poblacion: '172K habitantes',
    destacados: ['Bahía cantábrica', 'Ciudad financiera', 'Turismo verano'],
    sectoresPopulares: ['Banca', 'Turismo', 'Servicios', 'Hostelería'],
    ventajasLocales: [
      'SEO Cantabria',
      'Sector financiero',
      'Turismo costero'
    ]
  },
  {
    slug: 'pamplona',
    nombre: 'Pamplona',
    descripcionCorta: 'capital navarra',
    descripcionLarga: 'Posiciona tu negocio pamplonés con una web profesional en el corazón de Navarra',
    poblacion: '202K habitantes',
    destacados: ['Sanfermines', 'Ciudad verde', 'Industria navarra'],
    sectoresPopulares: ['Industria', 'Servicios', 'Turismo', 'Comercio'],
    ventajasLocales: [
      'SEO Navarra',
      'Turismo Sanfermines',
      'Mercado industrial'
    ]
  },
  {
    slug: 'almeria',
    nombre: 'Almería',
    descripcionCorta: 'sol del sureste',
    descripcionLarga: 'Impulsa tu negocio almeriense con una web optimizada para el mercado mediterráneo oriental',
    poblacion: '201K habitantes',
    destacados: ['Sol 365 días', 'Agricultura intensiva', 'Cabo de Gata'],
    sectoresPopulares: ['Agricultura', 'Turismo', 'Energía solar', 'Comercio'],
    ventajasLocales: [
      'SEO Almería provincia',
      'Sector agrícola',
      'Turismo natural'
    ]
  },
  {
    slug: 'oviedo',
    nombre: 'Oviedo',
    descripcionCorta: 'capital asturiana',
    descripcionLarga: 'Destaca en el mercado ovetense con una web profesional en el corazón de Asturias',
    poblacion: '220K habitantes',
    destacados: ['Capital Asturias', 'Ciudad universitaria', 'Patrimonio histórico'],
    sectoresPopulares: ['Servicios', 'Educación', 'Comercio', 'Turismo'],
    ventajasLocales: [
      'SEO Asturias capital',
      'Mercado institucional',
      'Ciudad universitaria'
    ]
  },
  {
    slug: 'leon',
    nombre: 'León',
    descripcionCorta: 'ciudad histórica',
    descripcionLarga: 'Impulsa tu negocio leonés con una presencia digital adaptada al mercado castellano',
    poblacion: '124K habitantes',
    destacados: ['Catedral gótica', 'Camino de Santiago', 'Ciudad histórica'],
    sectoresPopulares: ['Turismo', 'Hostelería', 'Servicios', 'Comercio'],
    ventajasLocales: [
      'SEO León provincia',
      'Turismo Camino Santiago',
      'Mercado regional'
    ]
  },
  {
    slug: 'salamanca',
    nombre: 'Salamanca',
    descripcionCorta: 'ciudad universitaria',
    descripcionLarga: 'Conquista el mercado salmantino con una web que conecte con el potente público universitario',
    poblacion: '144K habitantes',
    destacados: ['Universidad histórica', 'Patrimonio UNESCO', 'Ciudad estudiantil'],
    sectoresPopulares: ['Educación', 'Turismo', 'Hostelería', 'Cultura'],
    ventajasLocales: [
      'SEO universitario',
      'Turismo idiomático',
      'Mercado estudiantil'
    ]
  },
  {
    slug: 'burgos',
    nombre: 'Burgos',
    descripcionCorta: 'ciudad del Cid',
    descripcionLarga: 'Posiciona tu negocio burgalés con una web profesional en la capital castellana',
    poblacion: '176K habitantes',
    destacados: ['Catedral gótica', 'Camino de Santiago', 'Polo industrial'],
    sectoresPopulares: ['Industria', 'Turismo', 'Logística', 'Servicios'],
    ventajasLocales: [
      'SEO Burgos provincia',
      'Turismo patrimonial',
      'Eje industrial'
    ]
  },
  {
    slug: 'cadiz',
    nombre: 'Cádiz',
    descripcionCorta: 'tacita de plata',
    descripcionLarga: 'Destaca en el mercado gaditano con una web que capture la esencia atlántica andaluza',
    poblacion: '116K habitantes',
    destacados: ['Carnaval famoso', 'Playas atlánticas', 'Ciudad milenaria'],
    sectoresPopulares: ['Turismo', 'Hostelería', 'Náutica', 'Cultura'],
    ventajasLocales: [
      'SEO turismo Cádiz',
      'Mercado carnavalero',
      'Costa atlántica'
    ]
  },
  {
    slug: 'logrono',
    nombre: 'Logroño',
    descripcionCorta: 'capital riojana',
    descripcionLarga: 'Impulsa tu negocio riojano con una web profesional en tierra de vinos',
    poblacion: '151K habitantes',
    destacados: ['Capital del vino', 'Ruta del Camino', 'Gastronomía'],
    sectoresPopulares: ['Vino', 'Turismo', 'Gastronomía', 'Comercio'],
    ventajasLocales: [
      'SEO La Rioja',
      'Turismo enológico',
      'Sector vinícola'
    ]
  },
  {
    slug: 'badajoz',
    nombre: 'Badajoz',
    descripcionCorta: 'frontera extremeña',
    descripcionLarga: 'Conquista el mercado pacense con una web adaptada a la frontera con Portugal',
    poblacion: '151K habitantes',
    destacados: ['Frontera Portugal', 'Comercio transfronterizo', 'Ciudad histórica'],
    sectoresPopulares: ['Comercio', 'Logística', 'Servicios', 'Turismo'],
    ventajasLocales: [
      'SEO Extremadura',
      'Comercio Portugal',
      'Mercado fronterizo'
    ]
  },
]

export function getCiudadBySlug(slug: string): CiudadData | undefined {
  return ciudades.find(c => c.slug === slug)
}

export function getAllCiudadesSlugs(): string[] {
  return ciudades.map(c => c.slug)
}


