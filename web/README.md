# Agenda de Binissalem

Web local per consultar les festes, activitats i esdeveniments de Binissalem (Mallorca).
Feta amb [Astro](https://astro.build), sense base de dades ni servidor de pagament: només
fitxers estàtics.

> ⚠️ **Totes les dades d'esdeveniments i llocs d'aquest repositori són d'EXEMPLE.**
> Estan marcades amb "[EXEMPLE]" / "[EJEMPLO]" al títol perquè ningú les confongui amb
> informació real. Substitueix-les seguint la guia d'aquí baix abans de publicar la web.

---

## 1. Com afegir un esdeveniment nou (sense programar)

Tots els esdeveniments es guarden en un únic fitxer de text:

```
src/data/events.json
```

Obre'l amb qualsevol editor de text (fins i tot el mateix GitHub, fent clic a "Edit" ✏️
sobre el fitxer). Veuràs una llista `[ ... ]` d'esdeveniments separats per comes. Cada
esdeveniment té aquesta forma:

```json
{
  "id": "concert-nadal-2026",
  "slug": "concert-de-nadal-2026",
  "category": "musica",
  "start": "2026-12-20T20:00:00",
  "end": "2026-12-20T21:30:00",
  "title": {
    "ca": "Concert de Nadal",
    "es": "Concierto de Navidad"
  },
  "description": {
    "ca": "Concert de Nadal a càrrec de la coral local.",
    "es": "Concierto de Navidad a cargo de la coral local."
  },
  "location": {
    "name": { "ca": "Església Parroquial", "es": "Iglesia Parroquial" },
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Esglesia+Binissalem"
  },
  "organizer": "Ajuntament de Binissalem",
  "price": { "type": "free" },
  "image": "/images/events/placeholder-musica.svg",
  "imageAlt": { "ca": "Il·lustració musical", "es": "Ilustración musical" }
}
```

### Pas a pas

1. **Copia** un esdeveniment existent que s'assembli al que vols crear (per exemple, un
   de la mateixa categoria) i enganxa'l com un nou element de la llista, separat per una
   coma `,` de l'anterior.
2. **Canvia `id` i `slug`** per un text únic, en minúscules i sense espais ni accents
   (fes servir guions `-`). El `slug` és el que apareixerà a l'adreça web de la fitxa.
3. **`category`**: fes servir un d'aquests valors exactes (sense inventar-ne de nous):
   - `fiestas-populares`, `cultura`, `musica`, `deportes`, `infantil`,
     `gastronomia-vino`, `mercados`, `otros`.
4. **`start` i `end`**: data i hora en format `AAAA-MM-DDTHH:MM:SS` (per exemple, el 20
   de desembre de 2026 a les 20:00 és `2026-12-20T20:00:00`).
5. **`title` i `description`**: escriu el text en català (`ca`) i en castellà (`es`).
6. **`location.mapsUrl`**: ves a [Google Maps](https://maps.google.com), cerca el lloc,
   prem "Compartir" → "Copiar enllaç" i enganxa'l aquí.
7. **`organizer`**: qui organitza l'acte (text lliure, opcional).
8. **`price`**: si és gratuït, `{ "type": "free" }`. Si té preu:
   `{ "type": "paid", "amount": 5, "note": { "ca": "...", "es": "..." } }`
   (`note` és opcional).
9. **`image`**: pots deixar una de les imatges d'exemple a `public/images/events/` o
   afegir-hi una foto pròpia (posa-la dins d'aquesta carpeta i escriu-ne la ruta, per
   exemple `/images/events/la-meva-foto.jpg`).
10. **`imageAlt`**: descriu breument la imatge (per a persones amb lector de pantalla).
11. Si és un acte de la Festa des Vermar, afegeix també:
    `"vermar": { "day": 1, "dayLabel": { "ca": "Dia 1", "es": "Día 1" } }`.
12. **Desa el fitxer.** Comprova que no t'has deixat cap coma ni clau `{ }` sense tancar
    (si tens dubtes, valida el fitxer a [jsonlint.com](https://jsonlint.com)).
13. Un cop publicats els canvis (vegeu la secció de publicació), l'esdeveniment
    desapareixerà tot sol de la portada i de l'agenda quan passi la seva data, i quedarà
    consultable a "Esdeveniments passats".

### Esborrar o modificar un esdeveniment

Per esborrar-lo, elimina tot el bloc `{ ... }` corresponent (i la coma sobrant, si cal).
Per modificar-lo, edita directament els valors que calgui.

### Afegir o editar un lloc habitual

Els llocs (plaça, església, teatre, poliesportiu...) es guarden a
`src/data/places.json`, amb una estructura semblant però més senzilla. Segueix el mateix
patró: copia un bloc existent i edita `name`, `description` i `mapsUrl`.

---

## 2. Desenvolupament en local

Cal tenir [Node.js](https://nodejs.org) instal·lat (versió 18 o superior).

```bash
npm install       # només la primera vegada, instal·la les dependències
npm run dev       # aixeca un servidor local amb recàrrega automàtica
```

Obre <http://localhost:4321> al navegador. Cada vegada que editis `events.json` (o
qualsevol altre fitxer) i el desis, la pàgina es recarrega sola.

Altres ordres útils:

```bash
npm run build     # genera la versió final a la carpeta dist/
npm run preview   # serveix la carpeta dist/ tal com es veurà en producció
npx astro check   # comprova que no hi hagi errors de tipus/codi
```

---

## 3. Estructura del projecte

```
web/
├── public/                    # fitxers estàtics (imatges, favicon, robots.txt)
│   └── images/
│       ├── events/            # imatges dels esdeveniments
│       └── places/            # imatges dels llocs habituals
├── src/
│   ├── data/
│   │   ├── events.json        # ← AQUÍ s'editen els esdeveniments
│   │   ├── places.json        # ← AQUÍ s'editen els llocs habituals
│   │   └── categories.json    # llista fixa de categories (no cal tocar-la)
│   ├── lib/                   # funcions auxiliars (dates, cerca, .ics, calendari)
│   ├── layouts/                # plantilla base (capçalera, peu, SEO)
│   ├── components/            # peces reutilitzables (targeta d'esdeveniment, etc.)
│   └── pages/                 # una carpeta/fitxer per cada URL del web
│       ├── index.astro            → / (portada en català)
│       ├── agenda/                → /agenda
│       ├── vermar/                → /vermar
│       ├── llocs/                 → /llocs
│       ├── passats/               → /passats
│       ├── esdeveniment/[slug]/   → /esdeveniment/nom-de-l-acte
│       └── es/                    → mateixes pàgines en castellà (/es/...)
├── astro.config.mjs            # configuració d'Astro (canvia "site" abans de publicar)
└── package.json
```

La web es genera en dos idiomes: el **català** és l'idioma principal i viu a l'arrel
(`/`, `/agenda`...); el **castellà** viu sota `/es/` (`/es`, `/es/agenda`...). El botó
CA/ES de la capçalera canvia entre les dues versions de la mateixa pàgina.

---

## 4. Publicació gratuïta

Abans de publicar, edita `astro.config.mjs` i canvia la línia `site:
'https://binissalem-agenda.example'` per l'adreça final on es publicarà la web (per
exemple `https://elteupoble.github.io/binissalem-agenda` o el domini que facis servir).
Aquesta adreça s'utilitza pel sitemap i les metadades SEO.

### Opció A: Netlify (recomanada, la més senzilla)

1. Puja aquest projecte a un repositori de GitHub.
2. Crea un compte gratuït a [netlify.com](https://netlify.com) i tria "Add new site" →
   "Import an existing project" → connecta el teu GitHub i selecciona el repositori.
3. Configuració de build:
   - **Base directory**: `web`
   - **Build command**: `npm run build`
   - **Publish directory**: `web/dist`
4. Fes clic a "Deploy". Cada vegada que facis un canvi a `events.json` i el pugis a
   GitHub, Netlify tornarà a publicar la web automàticament.

### Opció B: Vercel

1. Puja el projecte a GitHub.
2. A [vercel.com](https://vercel.com), "Add New" → "Project" → importa el repositori.
3. Quan et demani el "Root Directory", tria `web`. Vercel detecta Astro automàticament
   (build command `npm run build`, output `dist`).
4. "Deploy". Els canvis futurs es publiquen sols en fer `git push`.

### Opció C: GitHub Pages

1. Puja el projecte a GitHub.
2. A `astro.config.mjs`, afegeix `base: '/nom-del-repositori'` si la web no es publica a
   l'arrel d'un domini propi (obligatori a GitHub Pages, tret que facis servir un domini
   personalitzat).
3. Crea el fitxer `.github/workflows/deploy.yml` amb l'acció oficial d'Astro (la trobaràs
   documentada a <https://docs.astro.build/en/guides/deploy/github/>), o activa GitHub
   Pages des de "Settings → Pages → Build and deployment → GitHub Actions" i tria la
   plantilla "Astro" que ofereix GitHub.
4. Cada `git push` a la branca principal tornarà a publicar la web.

En qualsevol de les tres opcions **no cal servidor de pagament ni base de dades**: tot
és HTML/CSS/JS estàtic generat a partir de `events.json`.

---

## 5. Accessibilitat i SEO

- Contrast de colors comprovat per a text normal i botons.
- Totes les imatges tenen text alternatiu (`imageAlt`) editable des de les dades.
- Cada pàgina té títol i descripció propis, dades estructurades
  [schema.org/Event](https://schema.org/Event) a les fitxes d'esdeveniment, i un
  `sitemap-index.xml` generat automàticament.
- Mida de lletra gran per defecte i disseny pensat primer per a mòbil.

---

## 6. Pròximes millores (no incloses encara)

- Formulari perquè associacions proposin esdeveniments, amb aprovació manual abans de
  publicar-los.
