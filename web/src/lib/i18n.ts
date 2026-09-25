export type Lang = 'ca' | 'es';

export const defaultLang: Lang = 'ca';
export const languages: Record<Lang, string> = {
  ca: 'Català',
  es: 'Castellà',
};

export const ui = {
  ca: {
    'site.title': 'Agenda de Binissalem',
    'site.tagline': 'Festes, actes i esdeveniments del poble',
    'nav.home': 'Inici',
    'nav.agenda': 'Agenda',
    'nav.vermar': 'Festa des Vermar',
    'nav.places': 'Llocs',
    'nav.past': 'Esdeveniments passats',
    'search.placeholder': 'Cerca un esdeveniment, lloc o categoria…',
    'search.noResults': 'No s’ha trobat cap esdeveniment amb aquesta cerca.',
    'search.resultsCount': 'esdeveniments trobats',
    'home.hero.title': 'Què es fa a Binissalem?',
    'home.hero.subtitle': 'Totes les festes, activitats i esdeveniments del poble, en un sol lloc.',
    'home.upcoming.week': 'Aquesta setmana',
    'home.upcoming.month': 'Aquest mes',
    'home.viewAgenda': 'Veure l’agenda completa',
    'home.noEvents': 'De moment no hi ha esdeveniments propers. Consulta l’',
    'home.noEvents.link': 'agenda completa',
    'home.vermar.cta': 'És la temporada de la Festa des Vermar',
    'home.vermar.ctaBtn': 'Veure el programa',
    'event.free': 'Gratuït',
    'event.paid': 'De pagament',
    'event.addToCalendar': 'Afegeix al meu calendari',
    'event.organizer': 'Organitza',
    'event.location': 'Lloc',
    'event.date': 'Data',
    'event.price': 'Preu',
    'event.seeOnMap': 'Veure al mapa',
    'event.back': 'Torna a l’agenda',
    'event.example': 'EXEMPLE — dades fictícies',
    'agenda.title': 'Agenda completa',
    'agenda.viewList': 'Llista',
    'agenda.viewCalendar': 'Calendari',
    'agenda.filterAll': 'Totes les categories',
    'agenda.noResults': 'No hi ha esdeveniments amb aquest filtre.',
    'agenda.prevMonth': 'Mes anterior',
    'agenda.nextMonth': 'Mes següent',
    'past.title': 'Esdeveniments passats',
    'past.intro': 'Arxiu d’esdeveniments que ja s’han celebrat.',
    'vermar.title': 'Festa des Vermar',
    'vermar.intro': 'La festa més emblemàtica de Binissalem, en honor a la verema. Consulta el programa per dies.',
    'places.title': 'Llocs habituals',
    'places.intro': 'Els espais on solen celebrar-se els actes del poble.',
    'footer.editData': 'Vols afegir un esdeveniment?',
    'footer.editDataLink': 'Consulta la guia',
    'footer.rights': 'Web informativa no oficial de Binissalem.',
  },
  es: {
    'site.title': 'Agenda de Binissalem',
    'site.tagline': 'Fiestas, actos y eventos del pueblo',
    'nav.home': 'Inicio',
    'nav.agenda': 'Agenda',
    'nav.vermar': 'Festa des Vermar',
    'nav.places': 'Lugares',
    'nav.past': 'Eventos pasados',
    'search.placeholder': 'Busca un evento, lugar o categoría…',
    'search.noResults': 'No se ha encontrado ningún evento con esa búsqueda.',
    'search.resultsCount': 'eventos encontrados',
    'home.hero.title': '¿Qué se hace en Binissalem?',
    'home.hero.subtitle': 'Todas las fiestas, actividades y eventos del pueblo, en un solo sitio.',
    'home.upcoming.week': 'Esta semana',
    'home.upcoming.month': 'Este mes',
    'home.viewAgenda': 'Ver la agenda completa',
    'home.noEvents': 'De momento no hay eventos próximos. Consulta la ',
    'home.noEvents.link': 'agenda completa',
    'home.vermar.cta': 'Es la temporada de la Festa des Vermar',
    'home.vermar.ctaBtn': 'Ver el programa',
    'event.free': 'Gratuito',
    'event.paid': 'De pago',
    'event.addToCalendar': 'Añadir a mi calendario',
    'event.organizer': 'Organiza',
    'event.location': 'Lugar',
    'event.date': 'Fecha',
    'event.price': 'Precio',
    'event.seeOnMap': 'Ver en el mapa',
    'event.back': 'Volver a la agenda',
    'event.example': 'EJEMPLO — datos ficticios',
    'agenda.title': 'Agenda completa',
    'agenda.viewList': 'Lista',
    'agenda.viewCalendar': 'Calendario',
    'agenda.filterAll': 'Todas las categorías',
    'agenda.noResults': 'No hay eventos con ese filtro.',
    'agenda.prevMonth': 'Mes anterior',
    'agenda.nextMonth': 'Mes siguiente',
    'past.title': 'Eventos pasados',
    'past.intro': 'Archivo de eventos que ya se han celebrado.',
    'vermar.title': 'Festa des Vermar',
    'vermar.intro': 'La fiesta más emblemática de Binissalem, en honor a la vendimia. Consulta el programa por días.',
    'places.title': 'Lugares habituales',
    'places.intro': 'Los espacios donde suelen celebrarse los actos del pueblo.',
    'footer.editData': '¿Quieres añadir un evento?',
    'footer.editDataLink': 'Consulta la guía',
    'footer.rights': 'Web informativa no oficial de Binissalem.',
  },
} as const;

export type UiKey = keyof (typeof ui)['ca'];

export function getLangFromUrl(url: URL): Lang {
  return /^\/es(\/|$)/.test(url.pathname) ? 'es' : 'ca';
}

export function useTranslations(lang: Lang) {
  return function t(key: UiKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

export function localizedPath(path: string, lang: Lang): string {
  const clean = path.replace(/^\/es(\/|$)/, '/') || '/';
  if (lang === 'ca') return clean;
  return clean === '/' ? '/es' : `/es${clean}`;
}
