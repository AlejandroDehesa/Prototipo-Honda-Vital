export const bookingPolicies = [
  'La reserva debe incluir el tiempo necesario para preparar la sala y dejarla como se encontro.',
  'Los bonos se reservan en incrementos de 15 minutos.',
  'Las reservas de mas de 2 horas requieren un deposito no retornable del 50%.',
  'En caso de cancelacion, el deposito puede aplicarse a otro evento. Una segunda cancelacion implica la perdida del primer deposito.',
  'Los alquileres mensuales empiezan con el pago de dos meses por adelantado: primero y ultimo.',
  'Podemos incluir tu actividad en los soportes de promocion del centro y en redes sociales.',
  'Todos los precios indicados son sin IVA.'
];

export const roomsData = [
  {
    id: 'sala-grupal-a',
    name: 'Sala Grupal A',
    shortName: 'Grupal 1',
    specs: '8.5 x 4.5 m',
    size: '32 m2',
    capacity: '10 personas en trabajo de suelo o movimiento · 25 personas en conferencia o meditacion',
    availability: 'Todos los dias de 9:30h a 20:30h. Consultar otras horas y disponibilidad exacta.',
    description:
      'Sala principal con acceso visual y conexion directa con jardin y terraza. Una opcion muy solida para propuestas de grupo que necesitan amplitud, presencia y una atmosfera realmente cuidada.',
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
        { label: 'Por hora', value: '20€/h' },
        { label: '1 dia', value: '120€' },
        { label: '2 dias', value: '220€' },
        { label: '3 dias', value: '300€' }
      ],
      prepaid: [
        { label: '10 horas', value: '150€' },
        { label: '20 horas', value: '260€' },
        { label: '30 horas', value: '330€' }
      ],
      regular: [
        { label: '1h/semana', value: '60€ al mes' },
        { label: '2h/semana', value: '110€ al mes' },
        { label: '3h/semana', value: '150€ al mes' },
        { label: '4h/semana', value: '180€ al mes' },
        { label: '5h/semana', value: '210€ al mes' },
        { label: '6h o mas', value: 'horas/semana x 40€' }
      ]
    },
    heroImageIndex: 1,
    coverImage: '/rooms/sala-grupal-a/sala-grupal-a-4.jpg',
    images: [
      '/rooms/sala-grupal-a/sala-grupal-a-1.jpg',
      '/rooms/sala-grupal-a/sala-grupal-a-2.jpg',
      '/rooms/sala-grupal-a/sala-grupal-a-3.jpg',
      '/rooms/sala-grupal-a/sala-grupal-a-4.jpg'
    ]
  },
  {
    id: 'sala-grupal-b',
    name: 'Sala Grupal B',
    shortName: 'Grupal 2',
    specs: '6.5 x 5 m',
    size: '32.5 m2',
    capacity: 'Hasta 30 personas sentadas · hasta 8 camillas para terapia o masaje',
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
        { label: 'Por hora', value: '20€/h' },
        { label: '1 dia', value: '120€' },
        { label: '2 dias', value: '220€' },
        { label: '3 dias', value: '300€' }
      ],
      prepaid: [
        { label: '10 horas', value: '150€' },
        { label: '20 horas', value: '260€' },
        { label: '30 horas', value: '330€' }
      ],
      regular: [
        { label: '1h/semana', value: '60€ al mes' },
        { label: '2h/semana', value: '110€ al mes' },
        { label: '3h/semana', value: '150€ al mes' },
        { label: '4h/semana', value: '180€ al mes' },
        { label: '5h/semana', value: '210€ al mes' },
        { label: '6h o mas', value: 'horas/semana x 40€' }
      ]
    },
    heroImageIndex: 0,
    coverImage: '/rooms/sala-grupal-b/sala-grupal-b-1.jpg',
    images: ['/rooms/sala-grupal-b/sala-grupal-b-1.jpg', '/rooms/sala-grupal-b/sala-grupal-b-2.jpg']
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
        { label: 'Por hora', value: '16€/h' },
        { label: '1 dia', value: '90€' },
        { label: '2 dias', value: '160€' }
      ],
      prepaid: [
        { label: '10 horas', value: '140€' },
        { label: '20 horas', value: '240€' },
        { label: '30 horas', value: '300€' }
      ],
      regular: [
        { label: '1h/semana', value: '55€ al mes' },
        { label: '2h/semana', value: '100€ al mes' },
        { label: '3h/semana', value: '135€ al mes' },
        { label: '4h/semana', value: '160€ al mes' },
        { label: '5h/semana', value: '190€ al mes' },
        { label: '6h o mas', value: 'horas/semana x 35€' }
      ]
    },
    heroImageIndex: 0,
    coverImage: '/rooms/despacho/despacho-1.jpg',
    images: ['/rooms/despacho/despacho-1.jpg', '/rooms/despacho/despacho-2.jpg']
  }
];
