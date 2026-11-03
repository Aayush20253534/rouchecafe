# Design system: The Rouché Café

## Visual direction
Warm editorial café design derived from the eight user-supplied page images. Forest-green branding, antique-gold details, soft cream surfaces, luxury serif headlines and handwritten accents. No generic blue product UI.

## Tokens
All shared theme variables live in `src/app/tokens.css`.

| Token | Value | Use |
| --- | --- | --- |
| `--forest` | `#003F29` | Primary calls to action |
| `--forest-dark` | `#002F1F` | Header/footer accents and panels |
| `--gold` | `#C88924` | Decorative flourishes, borders, accents |
| `--gold-light` | `#F1B84B` | Gold icons on green surfaces |
| `--cream` | `#FFF8EF` | Main background |
| `--cream2` | `#F9EFE3` | Soft sectional contrast |
| `--ink` | `#062E20` | Body and heading text |

Typography: **Cormorant Garamond** for editorial headings, **DM Sans** for navigation/forms/body, **Great Vibes** for handwritten accents. CSS fallback stacks remain available if remote fonts cannot load.

## Components

- `components/layout/SiteHeader.tsx` — responsive shared navigation, accessible menu toggle and cart indicator.
- `components/layout/SiteFooter.tsx` — brand, verified WhatsApp and Maps links, quick links, provisional opening-hours text.
- `components/ui/BrandLogo.tsx` — reuse of the supplied TRC logo.
- `components/ui/CafePrimitives.tsx` — section headings, photo, hero, feature strip, pill and link buttons.
- `lib/navigation.ts` — canonical navigation entries used by both header and footer.

## Interaction and accessibility rules

- Use the same CTA styles throughout the site: `btn-green`, `btn-outline`, or `btn-gold`.
- Navigation items identify the active page with `aria-current="page"`.
- Mobile menu uses an explicit open/close state, keyboard Escape support, and tap-to-dismiss backdrop.
- Global skip link targets the public site's `#main` element.
- All interactive elements retain visible keyboard focus rings.
- Honor `prefers-reduced-motion` for transitions, animations, and scrolling.
- Keep desktop and mobile touch targets usable. Breakpoints: 1200px, 950px (tablet navigation), 680px (mobile), 360px (small phones).

## Content and launch constraints

Stock photographs and example menu information are placeholders. No opening hours, social handles, email addresses, specific location details, or order fees are to be invented. Keep `CAFE.demoMenu = true` until verified menu data is supplied.
