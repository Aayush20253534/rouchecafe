# Phase 8: Responsive quality, local SEO and verification

## Scope implemented

### Search and local discoverability
- Per-page titles and unique descriptions for Home, About, Menu, Reservation, Gallery, Blog and Contact, focused on **Prayagraj, Uttar Pradesh**, not an invented street address.
- Canonical URLs and Open Graph/Twitter cards that use the configured production site URL.
- JSON-LD `CafeOrCoffeeShop` structured data containing only the confirmed name, phone, city/region, Google Maps link and approved social URLs. **No invented reviews, ratings, opening hours, street location or menu data.**
- Accurate robots.txt and sitemap.xml: no localhost/example.com links; Cart/Checkout are never indexable.
- Until a genuine HTTPS `NEXT_PUBLIC_SITE_URL` is configured, robots.txt disallows crawlers and page metadata is noindex. This protects staging and prevents accidental public indexing.
- Menu remains noindex while `CAFE.demoMenu` is true. Gallery and Blog remain noindex until approved photos and articles exist, respectively. These sections automatically become eligible after approved data is installed.
- Site branding icon and verified café logo reused for metadata.

### Performance
- Converted shared café photography to optimized `next/image`, using lazy loading and responsive srcsets. Hero imagery is prioritized.
- Restricted external image optimization sources to `images.unsplash.com`, a temporary preview source. The actual café images should move into `public/images`.
- Reduced obsolete client-side component code/imports from `CafeSite.tsx` to avoid unnecessary bundle complexity.
- Added scoped small-screen layout refinements while preserving the agreed cream, green and gold design.
- No Lighthouse score is claimed. Real-world scores need a deployed URL, actual photo assets, a stable connection and browser testing.

### Accessibility
- Improved keyboard control for the mobile navigation, including Escape, focus management and scroll locking.
- All image components retain descriptive alt text.
- Added focus visibility, touch hit targets and an explicit `main` skip destination.
- Reduced-motion preferences are respected; form input sizing prevents mobile browser auto-zoom.
- Existing gallery Escape/left/right keyboard viewer, reservation validation and WhatsApp review flows remain intact.

### Tests
- `npm run typecheck`: TypeScript check.
- `npm test`: validates menu/cart, reservation, contact, gallery, blog, SEO, formatting, safe URLs and local-date logic.
- `npm run build`: Next.js production build.
- `npm run smoke`: starts the built Next.js production server and verifies all nine public/utility route URLs, unknown-route 404s, robots.txt, sitemap.xml, page content and safe noindex state.

## Browser QA checklist (still requires manual inspection)

The CI pipeline does **not** render screenshots or exercise touch/keyboard hardware. Before deployment, test these widths in browser developer tools: **320px, 375px, 430px, 768px, 1024px and 1440px**. At each size verify:

1. Header logo, desktop links, hamburger drawer, backdrop, accessible focus, and booking/cart buttons.
2. Home and About heroes, section spacing, card cropping and the homepage reservation form.
3. Menu search, combined filters, product quantities, favourites, basket counter, demo price warning, mobile cart dock and empty states.
4. Cart add/remove/clear, saved cart after refresh, missing item IDs, checkout form, pickup/delivery address, validation, and unavailable demo WhatsApp order submission.
5. Reservations for today/tomorrow, past times in IST, guest counts and review/WhatsApp request.
6. Gallery filters, landscape/portrait crops, keyboard lightbox, Escape and overlay focus.
7. Contact form, erroneous inputs, WhatsApp review link, the **exact** Google Maps short URL, and fallback when no iframe URL is configured.
8. Blog empty state without fabricated articles, footer legal-contact links and functional navigation.
9. No horizontal overflow or stuck scroll at small widths; verify tap targets and text legibility.
10. Run Lighthouse on production after actual client assets are loaded, and use real browsers including mobile Safari and Chrome.

## Phase 9 deployment requirements

- Set `NEXT_PUBLIC_SITE_URL` to the final **HTTPS site origin** without a path or query (e.g., an actual Vercel production URL, not example.com).
- Replace temporary stock photos with optimized, permission-cleared client photos.
- Enter approved menu items/prices and set `CAFE.demoMenu = false` only after ordering/fulfilment details are approved.
- Obtain the café's verified opening hours, street address, official social links and optional Maps iframe URL.
- Run CI and browser QA again before declaring the live launch complete.

**Important:** Passing automated tests is not a claim of complete browser or device testing.
