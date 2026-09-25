import type { Lang } from './i18n';

function locale(lang: Lang): string {
  return lang === 'ca' ? 'ca-ES' : 'es-ES';
}

export function formatDate(iso: string, lang: Lang): string {
  const d = new Date(iso);
  return new Intl.DateTimeFormat(locale(lang), {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(d);
}

export function formatShortDate(iso: string, lang: Lang): string {
  const d = new Date(iso);
  return new Intl.DateTimeFormat(locale(lang), {
    day: '2-digit',
    month: 'short',
  }).format(d);
}

export function formatTime(iso: string, lang: Lang): string {
  const d = new Date(iso);
  return new Intl.DateTimeFormat(locale(lang), {
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
}

export function formatDateRange(startIso: string, endIso: string, lang: Lang): string {
  const start = new Date(startIso);
  const end = new Date(endIso);
  const sameDay = start.toDateString() === end.toDateString();
  if (sameDay) {
    return `${formatDate(startIso, lang)} · ${formatTime(startIso, lang)}–${formatTime(endIso, lang)}`;
  }
  return `${formatDate(startIso, lang)} – ${formatDate(endIso, lang)}`;
}
