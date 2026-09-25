// Genera imágenes SVG de marcador de posición para los eventos y lugares de ejemplo.
// Uso: node scripts/generate-placeholders.mjs
import { writeFileSync, mkdirSync } from 'node:fs';

const palette = {
  leaf: '#4a7c3a',
  grape: '#6b3fa0',
  ochre: '#c8862c',
  wine: '#7a2048',
  sky: '#2f6f8f',
  sun: '#e0a72c',
  earth: '#8a5a34',
  stone: '#6b6459',
  cream: '#f7f1e3',
};

function card(bg, fg, glyphPath, label) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 260" role="img" aria-labelledby="t">
  <title id="t">${label}</title>
  <rect width="400" height="260" fill="${bg}" />
  <g transform="translate(150,60)" fill="${fg}" opacity="0.9">${glyphPath}</g>
  <text x="20" y="235" font-family="Georgia, serif" font-size="22" fill="${fg}">${label}</text>
</svg>`;
}

const grapes =
  '<circle cx="20" cy="20" r="16"/><circle cx="50" cy="20" r="16"/><circle cx="35" cy="45" r="16"/><circle cx="65" cy="45" r="16"/><circle cx="50" cy="70" r="16"/><rect x="30" y="-25" width="6" height="30" fill="#4a7c3a"/>';
const notes =
  '<circle cx="15" cy="80" r="14"/><circle cx="70" cy="70" r="14"/><rect x="27" y="10" width="6" height="70"/><rect x="82" y="0" width="6" height="70"/><rect x="27" y="10" width="61" height="6"/>';
const kids = '<circle cx="50" cy="15" r="16"/><rect x="20" y="35" width="60" height="55" rx="14"/>';
const wine = '<path d="M20 0h60l-8 55a22 22 0 0 1-44 0z"/><rect x="46" y="75" width="8" height="30"/><rect x="25" y="105" width="50" height="8"/>';
const market = '<path d="M0 20h100l-10 20h-80z"/><rect x="10" y="40" width="80" height="60"/><rect x="30" y="60" width="15" height="40"/><rect x="55" y="60" width="15" height="40"/>';
const book = '<path d="M0 0h45v90a20 20 0 0 0-45 0z"/><path d="M100 0h-45v90a20 20 0 0 1 45 0z"/>';
const running = '<circle cx="65" cy="10" r="12"/><path d="M20 90 L45 60 L35 40 L55 20 L75 45 L95 40 L85 60 L60 65 L45 90z"/>';
const flame = '<path d="M40 90c-20 0-30-15-30-30 0-20 15-25 15-45 15 10 25 25 25 40 10-5 15-15 15-25 15 15 20 30 20 40 0 20-15 20-45 20z"/>';
const plaza = '<rect x="0" y="60" width="100" height="30"/><rect x="10" y="20" width="15" height="40"/><rect x="40" y="10" width="20" height="50"/><rect x="70" y="30" width="15" height="30"/>';
const church = '<rect x="20" y="40" width="60" height="50"/><path d="M50 0l25 30h-50z"/><rect x="45" y="-15" width="4" height="20"/><rect x="35" y="-8" width="24" height="4"/>';
const theatre = '<path d="M0 30a50 50 0 0 1 100 0z"/><rect x="0" y="30" width="100" height="10"/>';
const sports = '<circle cx="50" cy="45" r="40" fill="none" stroke="currentColor" stroke-width="8"/><path d="M20 25 h60 M20 65 h60" stroke="currentColor" stroke-width="6" fill="none"/>';

const events = [
  ['placeholder-musica.svg', palette.leaf, palette.cream, notes, 'Música'],
  ['placeholder-infantil.svg', palette.sun, '#3a2d10', kids, 'Infantil'],
  ['placeholder-vino.svg', palette.wine, palette.cream, wine, 'Vi i gastronomia'],
  ['placeholder-mercado.svg', palette.earth, palette.cream, market, 'Mercat'],
  ['placeholder-cultura.svg', palette.ochre, '#3a2d10', book, 'Cultura'],
  ['placeholder-otros.svg', palette.stone, palette.cream, book, 'Altres'],
  ['placeholder-deporte.svg', palette.sky, palette.cream, running, 'Esport'],
  ['placeholder-fiesta.svg', palette.grape, palette.cream, flame, 'Festa'],
  ['placeholder-vermar.svg', palette.grape, palette.cream, grapes, 'Festa des Vermar'],
];

const places = [
  ['placeholder-plaza.svg', palette.leaf, palette.cream, plaza, 'Plaça'],
  ['placeholder-church.svg', palette.stone, palette.cream, church, 'Església'],
  ['placeholder-theatre.svg', palette.grape, palette.cream, theatre, 'Teatre'],
  ['placeholder-sports.svg', palette.sky, palette.cream, sports, 'Poliesportiu'],
];

mkdirSync('public/images/events', { recursive: true });
mkdirSync('public/images/places', { recursive: true });

for (const [file, bg, fg, glyph, label] of events) {
  writeFileSync(`public/images/events/${file}`, card(bg, fg, glyph, label));
}
for (const [file, bg, fg, glyph, label] of places) {
  writeFileSync(`public/images/places/${file}`, card(bg, fg, glyph, label));
}

console.log('Placeholders generados.');
