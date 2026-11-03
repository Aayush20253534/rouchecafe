# The Rouché Café

Responsive café website built with Next.js 15, React 19, TypeScript and custom CSS. The implementation follows eight reference page designs and includes a WhatsApp-first customer journey.

## Pages

- / — home, hero, signature menu preview, gallery and reservation preview
- /about — brand story and values
- /menu — responsive menu with category navigation, searchable items, dietary and bestseller filters, favourite dishes, quantity selection, and live cart preview
- /reservation — table reservation request via WhatsApp
- /gallery — category filters and photo lightbox
- /contact — WhatsApp enquiry form and Google Maps directions
- /cart — persistent cart with quantity controls
- /checkout — pickup/delivery details and WhatsApp order handoff
- /blog — journal placeholder

## Develop locally

Requires Node.js 22 or newer.

1. npm install
2. npm run dev
3. npm run typecheck
4. npm run build

Open http://localhost:3000.

## Business settings and WhatsApp

Edit src/lib/site.ts.

- CAFE.whatsapp is 919935754959 (country code included).
- CAFE.mapUrl points to the owner's supplied Google Maps link.
- CAFE.location remains broad until the full address is confirmed.
- CAFE.demoMenu is true for safety.

Reservation and contact forms open a prefilled WhatsApp message. A reservation request is not automatically confirmed. No reservations backend is included.

## Before enabling live ordering

1. Replace the demo menu in src/data/menu.ts with the café's real dishes, prices, descriptions, categories, dietary flags and images. See docs/MENU_SYSTEM.md.
2. Confirm accepted order hours, fulfilment modes, delivery coverage and delivery/packing fees. Do not display invented fixed fees.
3. Replace temporary stock photo URLs in src/lib/photos.ts with licensed or café-supplied photography. Images can be placed in public/images and referenced like /images/coffee.webp.
4. After the verified menu is tested, set CAFE.demoMenu to false. Until then, carts and checkout are for preview and food orders are deliberately disabled.
5. Set NEXT_PUBLIC_SITE_URL to the production domain to configure the sitemap.

The cart uses localStorage, not a database. There is no payment gateway. The café confirms final totals directly on WhatsApp.

## Branding and content

- public/rouche-logo.webp contains the café's supplied logo, optimized for display.
- Temporary Unsplash images are used for layout preview and must be replaced before commercial launch.
- Blog posts, social links, address, opening hours and email were not invented. Add confirmed information once available.

## CI and deployment

GitHub Actions runs TypeScript, menu-logic tests and production build checks on pushes to main and pull requests.

Import this repository into Vercel as a Next.js project. No database or server secrets are required for the current static/WhatsApp-first version.

## Menu system

Phase 4 introduces `src/data/menu.ts`, `src/lib/menu-utils.ts`, `src/components/pages/MenuPage.tsx`, reusable menu cards, responsive cart previews and filter tests. See [Menu system details](docs/MENU_SYSTEM.md). The current menu remains illustrative until replaced with verified client data.


## Phase 5: Order flow

The cart, checkout and WhatsApp handoff are implemented; see [Ordering system](docs/ORDERING_SYSTEM.md). Orders use a Details → Review → WhatsApp request process. All food ordering remains in demo mode until menu, prices and fulfilment charges are verified. A request is not an accepted order, and the website never collects online payments.


## Phase 6: Reservations

Both the full reservation page and the homepage booking form now prepare validated WhatsApp requests, with preferred times interpreted in Prayagraj's Asia/Kolkata timezone. No live availability or automatic confirmation is provided. See [Reservation guide](docs/RESERVATIONS.md).
