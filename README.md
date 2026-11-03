# The Rouché Café

Responsive café website built with Next.js 15, React 19, TypeScript and custom CSS. The implementation follows eight reference page designs and includes a WhatsApp-first customer journey.

## Pages

- / — home, hero, signature menu preview, gallery and reservation preview
- /about — brand story and values
- /menu — searchable, filterable menu with categories and cart preview
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

1. Replace the sample menu array in src/lib/site.ts with the café's real dishes, prices, descriptions, categories, dietary flags and images.
2. Confirm accepted order hours, fulfilment modes, delivery coverage and delivery/packing fees. Add final fee calculation where appropriate.
3. Replace temporary stock photo URLs in PHOTOS with licensed or café-supplied photography. Images can be placed in public/images and referenced like /images/coffee.webp.
4. After the verified menu is tested, set CAFE.demoMenu to false. Until then, carts and checkout are for preview and food orders are deliberately disabled.
5. Set NEXT_PUBLIC_SITE_URL to the production domain to configure the sitemap.

The cart uses localStorage, not a database. There is no payment gateway. The café confirms final totals directly on WhatsApp.

## Branding and content

- public/rouche-logo.webp contains the café's supplied logo, optimized for display.
- Temporary Unsplash images are used for layout preview and must be replaced before commercial launch.
- Blog posts, social links, address, opening hours and email were not invented. Add confirmed information once available.

## CI and deployment

GitHub Actions runs TypeScript and production build checks on pushes to main and pull requests.

Import this repository into Vercel as a Next.js project. No database or server secrets are required for the current static/WhatsApp-first version.
