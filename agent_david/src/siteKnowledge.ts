type PricingItem = {
  label: string;
  value: string;
};

type Room = {
  id: string;
  name: string;
  shortName: string;
  specs: string;
  size: string;
  capacity: string;
  availability: string;
  description: string;
  longDescription: string;
  features: string[];
  pricing: {
    punctual: PricingItem[];
    prepaid: PricingItem[];
    regular: PricingItem[];
  };
};

const bookingPolicies = [
  'La reserva debe incluir el tiempo necesario para preparar la sala y dejarla como se encontro.',
  'Los bonos se reservan en incrementos de 15 minutos.',
  'Las reservas de mas de 2 horas requieren un deposito no retornable del 50%.',
  'En caso de cancelacion, el deposito puede aplicarse a otro evento. Una segunda cancelacion implica la perdida del primer deposito.',
  'Los alquileres mensuales empiezan con el pago de dos meses por adelantado: primero y ultimo.',
  'Podemos incluir tu actividad en los soportes de promocion del centro y en redes sociales.',
  'Todos los precios indicados son sin IVA.'
];

const rooms: Room[] = [
  {
    id: 'sala-grupal-a',
    name: 'Sala Grupal A',
    shortName: 'Grupal 1',
    specs: '8.5 x 4.5 m',
    size: '32 m2',
    capacity: '10 personas en trabajo de suelo o movimiento y 25 personas en conferencia o meditacion',
    availability: 'Todos los dias de 9:30h a 20:30h. Consultar otras horas y disponibilidad exacta.',
    description:
      'Sala principal con acceso visual y conexion directa con jardin y terraza. Una opcion muy solida para propuestas de grupo que necesitan amplitud, presencia y una atmosfera cuidada.',
    longDescription:
      'Es la sala mas amplia del espacio y la que mejor transmite esa sensacion de oasis tranquilo que define Onda Vital. Funciona especialmente bien para yoga, pilates, meditacion, formaciones, circulos, encuentros de bienestar o propuestas donde el entorno debe elevar la experiencia sin imponerse sobre ella.',
    features: [
      'Vistas y acceso a jardin y terraza',
      'Parque',
      'Aire acondicionado',
      'Internet',
      'Sistema de musica',
      'Proyector',
      'Sillas plegables',
      'Esterillas para yoga o pilates'
    ],
    pricing: {
      punctual: [
        { label: 'Por hora', value: '20 EUR/h' },
        { label: '1 dia', value: '120 EUR' },
        { label: '2 dias', value: '220 EUR' },
        { label: '3 dias', value: '300 EUR' }
      ],
      prepaid: [
        { label: '10 horas', value: '150 EUR' },
        { label: '20 horas', value: '260 EUR' },
        { label: '30 horas', value: '330 EUR' }
      ],
      regular: [
        { label: '1h/semana', value: '60 EUR al mes' },
        { label: '2h/semana', value: '110 EUR al mes' },
        { label: '3h/semana', value: '150 EUR al mes' },
        { label: '4h/semana', value: '180 EUR al mes' },
        { label: '5h/semana', value: '210 EUR al mes' },
        { label: '6h o mas', value: 'horas/semana x 40 EUR' }
      ]
    }
  },
  {
    id: 'sala-grupal-b',
    name: 'Sala Grupal B',
    shortName: 'Grupal 2',
    specs: '6.5 x 5 m',
    size: '32.5 m2',
    capacity: 'Hasta 30 personas sentadas y hasta 8 camillas para terapia o masaje',
    availability: 'De viernes a domingo. Consultar otros dias segun disponibilidad.',
    description:
      'Una sala de grupo muy equilibrada, con grandes ventanales y una sensacion mas recogida, ideal para actividades donde importa el foco y la cercania.',
    longDescription:
      'La Grupal B combina amplitud, luz natural y una energia muy agradable para sesiones guiadas, talleres, practicas con camilla, clases o encuentros que necesiten un espacio profesional pero cercano. Es una sala muy facil de adaptar a distintos formatos de trabajo.',
    features: [
      'Grandes ventanales',
      'Vistas al jardin y la terraza',
      'Moqueta',
      'Aire acondicionado',
      'Sistema de musica',
      'WIFI',
      'Hasta 6 camillas disponibles segun configuracion'
    ],
    pricing: {
      punctual: [
        { label: 'Por hora', value: '20 EUR/h' },
        { label: '1 dia', value: '120 EUR' },
        { label: '2 dias', value: '220 EUR' },
        { label: '3 dias', value: '300 EUR' }
      ],
      prepaid: [
        { label: '10 horas', value: '150 EUR' },
        { label: '20 horas', value: '260 EUR' },
        { label: '30 horas', value: '330 EUR' }
      ],
      regular: [
        { label: '1h/semana', value: '60 EUR al mes' },
        { label: '2h/semana', value: '110 EUR al mes' },
        { label: '3h/semana', value: '150 EUR al mes' },
        { label: '4h/semana', value: '180 EUR al mes' },
        { label: '5h/semana', value: '210 EUR al mes' },
        { label: '6h o mas', value: 'horas/semana x 40 EUR' }
      ]
    }
  },
  {
    id: 'despacho-plus',
    name: 'Despacho Plus',
    shortName: 'Despacho +',
    specs: '4.1 x 3.2 m',
    size: '13.1 m2',
    capacity: 'Consultas, terapias y pequenas charlas de hasta 8 personas',
    availability: 'Todos los dias de 9:30h a 20:30h.',
    description:
      'Un despacho exterior con vistas al jardin, perfecto para consulta, terapia individual o pequenos encuentros donde la calma y la presencia del espacio importan mucho.',
    longDescription:
      'Es una opcion especialmente agradable para profesionales que quieren trabajar en un entorno luminoso, serio y acogedor a la vez. Funciona muy bien para terapia, consulta, acompanamiento individual, pequenas charlas o sesiones privadas.',
    features: [
      'Vistas al jardin',
      'Aire acondicionado',
      'Parque',
      'WIFI',
      'Mesa y sillas',
      'Camilla de terapias'
    ],
    pricing: {
      punctual: [
        { label: 'Por hora', value: '16 EUR/h' },
        { label: '1 dia', value: '90 EUR' },
        { label: '2 dias', value: '160 EUR' }
      ],
      prepaid: [
        { label: '10 horas', value: '140 EUR' },
        { label: '20 horas', value: '240 EUR' },
        { label: '30 horas', value: '300 EUR' }
      ],
      regular: [
        { label: '1h/semana', value: '55 EUR al mes' },
        { label: '2h/semana', value: '100 EUR al mes' },
        { label: '3h/semana', value: '135 EUR al mes' },
        { label: '4h/semana', value: '160 EUR al mes' },
        { label: '5h/semana', value: '190 EUR al mes' },
        { label: '6h o mas', value: 'horas/semana x 35 EUR' }
      ]
    }
  }
];

const siteSections = {
  hero: {
    title: 'Potenciando tu bienestar desde el origen.',
    summary:
      'David se presenta como quiropractico con un enfoque integral y personalizado para recuperar el equilibrio natural y mejorar la calidad de vida.',
    trustPoints: ['+15 anos de experiencia', 'Atencion personalizada', 'Entorno premium']
  },
  philosophy: {
    title: 'Mi Vision y Metodo',
    subtitle: 'Mas alla del sintoma, buscando la causa.',
    pillars: [
      {
        title: 'Conexion integral',
        description:
          'El cuerpo se entiende como un ecosistema donde todo esta conectado; no se tratan partes aisladas, sino a la persona en su totalidad.'
      },
      {
        title: 'Autoridad tranquila',
        description:
          'Enfoque directo, basado en ciencia y a la vez profundamente humano, con anos de experiencia clinica.'
      },
      {
        title: 'Acompanamiento',
        description:
          'El proceso de recuperacion y optimizacion se recorre juntos, con explicaciones claras y educacion para sostener resultados.'
      }
    ]
  },
  services: [
    {
      name: 'Quiropractica',
      description:
        'Pilar central de la metodologia. Ajustes precisos orientados a liberar interferencias en el sistema nervioso para que el cuerpo exprese mejor su potencial de salud.',
      highlights: [
        'Evaluacion exhaustiva del caso',
        'Ajustes especificos y seguros',
        'Atencion a la causa, no solo al sintoma'
      ]
    },
    {
      name: 'Resosense',
      description:
        'Linea complementaria pensada para apoyar y potenciar los resultados del cuidado principal mediante tecnologia y vibracion, guiada por criterio clinico.'
    },
    {
      name: 'Salas',
      description:
        'Las salas se presentan como un ecosistema premium que otros profesionales pueden integrar en su propia dinamica de trabajo.'
    }
  ],
  firstVisit: [
    'Evaluacion exhaustiva del historial clinico, la postura y la biomecanica.',
    'Diagnostico y explicacion clara de lo que ocurre en el cuerpo y de como puede ayudar el tratamiento.',
    'Primer ajuste quiropractico en la misma sesion si es seguro y adecuado.',
    'Plan personalizado segun objetivos de salud y recuperacion.'
  ],
  contact: {
    message:
      'Se invita a escribir o agendar una primera visita. Se remarca que las plazas son limitadas para garantizar calidad en cada sesion.',
    location: 'Centro Onda Vital, Calle Premium 123, Madrid',
    phone: '+34 900 000 000',
    email: 'david@ondavital.com',
    hours: 'Lunes a Viernes, 9:00 - 14:00 y 16:00 - 20:00',
    formServices: [
      'Primera visita quiropractica',
      'Sesion Resosense',
      'Informacion alquiler de salas',
      'Otras consultas'
    ]
  }
};

function formatPricingSection(title: string, items: PricingItem[]) {
  const values = items.map((item) => `${item.label}: ${item.value}`).join(', ');
  return `${title}: ${values}`;
}

function formatRoom(room: Room) {
  return [
    `${room.name} (${room.shortName})`,
    `Medidas: ${room.specs}. Superficie: ${room.size}.`,
    `Capacidad: ${room.capacity}.`,
    `Disponibilidad general: ${room.availability}`,
    `Descripcion corta: ${room.description}`,
    `Descripcion ampliada: ${room.longDescription}`,
    `Equipamiento: ${room.features.join(', ')}`,
    formatPricingSection('Tarifa puntual', room.pricing.punctual),
    formatPricingSection('Bonos prepago', room.pricing.prepaid),
    formatPricingSection('Horario fijo semanal', room.pricing.regular)
  ].join('\n');
}

function findRoom(roomIdOrQuery?: string) {
  if (!roomIdOrQuery) {
    return null;
  }

  const normalized = roomIdOrQuery.toLowerCase();

  return (
    rooms.find((room) => room.id === normalized) ??
    rooms.find((room) => room.name.toLowerCase() === normalized) ??
    rooms.find((room) => room.shortName.toLowerCase() === normalized) ??
    rooms.find((room) => normalized.includes(room.id) || normalized.includes(room.name.toLowerCase()) || normalized.includes(room.shortName.toLowerCase()))
  );
}

export const getSiteKnowledgeDef = {
  type: 'function',
  function: {
    name: 'get_site_knowledge',
    description:
      'Devuelve informacion factual de la web de Onda Vital: salas, precios, caracteristicas, politicas de reserva, filosofia, primera visita y contacto.',
    parameters: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Pregunta o tema a consultar, por ejemplo salas, precios, contacto, quiropractica o Resosense.'
        },
        roomId: {
          type: 'string',
          description: 'Identificador de sala si se quiere informacion concreta, por ejemplo sala-grupal-a, sala-grupal-b o despacho-plus.'
        }
      },
      required: []
    }
  }
};

export async function getSiteKnowledge(args?: { query?: string; roomId?: string }) {
  const requestedRoom = findRoom(args?.roomId) ?? findRoom(args?.query);
  if (requestedRoom) {
    return {
      type: 'room',
      room: requestedRoom,
      bookingPolicies
    };
  }

  return {
    type: 'site',
    hero: siteSections.hero,
    philosophy: siteSections.philosophy,
    services: siteSections.services,
    firstVisit: siteSections.firstVisit,
    contact: siteSections.contact,
    rooms,
    bookingPolicies
  };
}
