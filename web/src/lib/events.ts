import rawEvents from '../data/events.json';
import rawCategories from '../data/categories.json';
import type { Lang } from './i18n';

export interface LocalizedText {
  ca: string;
  es: string;
}

export interface EventPrice {
  type: 'free' | 'paid';
  amount?: number;
  note?: LocalizedText;
}

export interface VermarInfo {
  day: number;
  dayLabel: LocalizedText;
}

export interface EventItem {
  id: string;
  slug: string;
  category: string;
  start: string;
  end: string;
  title: LocalizedText;
  description: LocalizedText;
  location: {
    name: LocalizedText;
    mapsUrl: string;
  };
  organizer?: string;
  price: EventPrice;
  image?: string;
  imageAlt?: LocalizedText;
  vermar?: VermarInfo;
  isExample?: boolean;
}

export interface Category {
  id: string;
  ca: string;
  es: string;
  color: string;
}

export const events: EventItem[] = rawEvents as EventItem[];
export const categories: Category[] = rawCategories as Category[];

export function getCategory(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function categoryLabel(id: string, lang: Lang): string {
  const cat = getCategory(id);
  if (!cat) return id;
  return cat[lang];
}

export function sortByStart(list: EventItem[]): EventItem[] {
  return [...list].sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
}

export function isPast(event: EventItem, now: Date = new Date()): boolean {
  return new Date(event.end || event.start).getTime() < now.getTime();
}

export function getUpcomingEvents(now: Date = new Date()): EventItem[] {
  return sortByStart(events.filter((e) => !isPast(e, now)));
}

export function getPastEvents(now: Date = new Date()): EventItem[] {
  return sortByStart(events.filter((e) => isPast(e, now))).reverse();
}

export function getEventsThisWeek(now: Date = new Date()): EventItem[] {
  const end = new Date(now);
  end.setDate(end.getDate() + 7);
  return getUpcomingEvents(now).filter((e) => new Date(e.start).getTime() <= end.getTime());
}

export function getEventsThisMonth(now: Date = new Date()): EventItem[] {
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
  return getUpcomingEvents(now).filter((e) => new Date(e.start).getTime() <= end.getTime());
}

export function getEventBySlug(slug: string): EventItem | undefined {
  return events.find((e) => e.slug === slug);
}

export function getEventsByCategory(categoryId: string): EventItem[] {
  return sortByStart(events.filter((e) => e.category === categoryId));
}

export function getVermarEvents(): EventItem[] {
  return sortByStart(events.filter((e) => e.vermar)).sort(
    (a, b) => (a.vermar?.day ?? 0) - (b.vermar?.day ?? 0),
  );
}

function normalize(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();
}

export function searchableText(event: EventItem, lang: Lang): string {
  return normalize(
    [
      event.title[lang],
      event.description[lang],
      event.location.name[lang],
      categoryLabel(event.category, lang),
      event.organizer ?? '',
    ].join(' '),
  );
}
