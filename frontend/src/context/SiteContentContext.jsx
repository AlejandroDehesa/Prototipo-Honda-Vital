import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { bookingPolicies, roomsData } from '../data/roomsData';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const fallbackContent = {
  sections: {
    hero: {
      title: 'Potenciando tu bienestar desde el origen.',
      description:
        'Soy David, quiropractico. Mi objetivo es acompanarte a recuperar tu equilibrio natural y mejorar tu calidad de vida mediante un enfoque integral y personalizado.',
      primaryCtaLabel: 'Reserva tu primera visita',
      primaryCtaTarget: '#contacto',
      secondaryCtaLabel: 'Conoce mi metodo',
      secondaryCtaTarget: '#filosofia',
      trustItems: ['+15 anos de experiencia', 'Atencion personalizada', 'Entorno premium']
    },
    philosophy: {
      title: 'Mi Vision y Metodo',
      subtitle: 'Mas alla del sintoma, buscando la causa.',
      cards: [
        {
          number: '01',
          title: 'Conexion Integral',
          text: 'Entiendo tu cuerpo como un ecosistema donde todo esta conectado. No trato partes aisladas, trato a la persona en su totalidad para restaurar su armonia natural.'
        },
        {
          number: '02',
          title: 'Autoridad Tranquila',
          text: 'Con anos de experiencia clinica, mi enfoque es directo, basado en ciencia pero profundamente humano. Sentiras que estas en manos seguras y expertas desde el primer instante.'
        },
        {
          number: '03',
          title: 'Acompanamiento',
          text: 'Tu proceso de recuperacion u optimizacion es un camino que recorremos juntos. Te guio, te explico el por que y te empodero para que mantengas tus resultados.'
        }
      ]
    },
    firstVisit: {
      title: 'Que esperar en tu Primera Visita',
      subtitle: 'Claridad y profesionalidad desde el primer momento.',
      ctaLabel: 'Agenda tu primera visita',
      ctaTarget: '#contacto',
      steps: [
        {
          number: '01',
          title: 'Evaluacion Exhaustiva',
          text: 'Estudio de tu historial clinico, postura y biomecanica para encontrar el origen de tus sintomas.'
        },
        {
          number: '02',
          title: 'Diagnostico y Explicacion',
          text: 'Te explico de manera clara y directa que ocurre en tu cuerpo y como puedo ayudarte.'
        },
        {
          number: '03',
          title: 'Primer Ajuste',
          text: 'Si es seguro y adecuado, realizaremos tu primer ajuste quiropractico en la misma sesion.'
        },
        {
          number: '04',
          title: 'Plan Personalizado',
          text: 'Nos enfocamos en un cuidado pautado segun tus objetivos de salud y recuperacion.'
        }
      ]
    },
    testimonials: {
      title: 'Experiencias',
      subtitle: 'Resultados reales basados en metodo y confianza.',
      items: [
        {
          id: 'review-1',
          text: 'Llevaba anos con molestias cronicas. David no solo ajusto mi columna, me explico con una calma increible por que me pasaba y como evitarlo. Su autoridad profesional se siente desde que entras.',
          author: 'Maria G.',
          service: 'Quiropractica'
        },
        {
          id: 'review-2',
          text: 'He pasado por muchos profesionales, pero el enfoque de David es distinto. Analiza, comprende y ejecuta con una precision que da muchisima confianza. El espacio ademas es de primer nivel.',
          author: 'Carlos M.',
          service: 'Quiropractica y Resosense'
        },
        {
          id: 'review-3',
          text: 'Entender que la salud no es magia, sino logica y biomecanica bien aplicada, me ha cambiado la vida. Gracias David por tu metodo y tu claridad.',
          author: 'Elena R.',
          service: 'Quiropractica'
        }
      ]
    },
    contact: {
      title: 'Da el primer paso hacia tu bienestar.',
      description:
        'Estoy aqui para escucharte, evaluar tu situacion y trazar un plan de accion claro. Escribeme o agenda tu primera visita. Las plazas son limitadas para garantizar la maxima calidad en cada sesion.',
      locationTitle: 'Ubicacion',
      locationLines: ['Centro Onda Vital', 'Calle Premium 123, Madrid'],
      contactTitle: 'Contacto',
      contactLines: ['+34 900 000 000', 'david@ondavital.com'],
      scheduleTitle: 'Horarios',
      scheduleLines: ['Lunes a Viernes', '9:00 - 14:00 | 16:00 - 20:00'],
      formTitle: 'Agenda tu consulta',
      formDisclaimer:
        'Al enviar, aceptas politica de privacidad. Este formulario no sustituye el consejo medico profesional.',
      serviceOptions: [
        { value: 'quiropractica', label: 'Primera Visita Quiropractica' },
        { value: 'resosense', label: 'Sesion Resosense' },
        { value: 'salas', label: 'Informacion Alquiler de Salas' },
        { value: 'otros', label: 'Otras consultas' }
      ]
    },
    roomRentals: {
      eyebrow: 'Espacios profesionales',
      title: 'Alquiler de salas en Onda Vital',
      intro:
        'Un entorno cuidado, sereno y profesional para talleres, sesiones, formaciones y encuentros. Cada sala tiene una energia distinta y esta pensada para que el espacio sume valor real a tu propuesta.',
      highlights: [
        { label: '3 espacios', value: 'Con identidad propia' },
        { label: 'Modalidades', value: 'Hora, bonos y horario fijo' },
        { label: 'Entorno', value: 'Luz, calma y presencia' }
      ]
    },
    bookingPolicies: {
      title: 'Condiciones de reserva',
      items: bookingPolicies
    }
  },
  rooms: roomsData
};

const SiteContentContext = createContext({
  sections: fallbackContent.sections,
  rooms: fallbackContent.rooms,
  isLoading: false
});

export function SiteContentProvider({ children }) {
  const [content, setContent] = useState(fallbackContent);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function loadContent() {
      try {
        const response = await fetch(`${API_URL}/admin-facil/api/public/content-bundle`);
        if (!response.ok) {
          throw new Error(`Unable to load content bundle: ${response.status}`);
        }

        const payload = await response.json();
        const data = payload?.data || {};

        if (ignore) return;

        setContent({
          sections: {
            ...fallbackContent.sections,
            ...(data.sections || {})
          },
          rooms: Array.isArray(data.rooms) && data.rooms.length ? data.rooms : fallbackContent.rooms
        });
      } catch (error) {
        console.error('Failed to load dynamic site content:', error);
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadContent();

    return () => {
      ignore = true;
    };
  }, []);

  const value = useMemo(
    () => ({
      sections: content.sections,
      rooms: content.rooms,
      isLoading
    }),
    [content, isLoading]
  );

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent() {
  return useContext(SiteContentContext);
}
