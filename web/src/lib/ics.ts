import type { EventItem } from './events';
import type { Lang } from './i18n';

function toIcsDate(iso: string): string {
  return iso.replace(/[-:]/g, '').split('.')[0];
}

function escapeIcsText(text: string): string {
  return text.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}

function foldLine(line: string): string {
  // RFC 5545: lines should not exceed 75 octets; fold with CRLF + space.
  if (line.length <= 75) return line;
  let result = '';
  let rest = line;
  while (rest.length > 75) {
    result += rest.slice(0, 75) + '\r\n ';
    rest = rest.slice(75);
  }
  return result + rest;
}

export function buildIcs(event: EventItem, lang: Lang, siteUrl: string): string {
  const now = toIcsDate(new Date().toISOString());
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Agenda de Binissalem//CA',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${event.id}@binissalem-agenda`,
    `DTSTAMP:${now}Z`,
    `DTSTART:${toIcsDate(event.start)}`,
    `DTEND:${toIcsDate(event.end)}`,
    `SUMMARY:${escapeIcsText(event.title[lang])}`,
    `DESCRIPTION:${escapeIcsText(event.description[lang])}`,
    `LOCATION:${escapeIcsText(event.location.name[lang])}`,
    `URL:${siteUrl}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ];
  return lines.map(foldLine).join('\r\n');
}

export function icsDataHref(event: EventItem, lang: Lang, siteUrl: string): string {
  const ics = buildIcs(event, lang, siteUrl);
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
}
