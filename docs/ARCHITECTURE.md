# Architecture

## Current implementation

The project uses Next.js App Router, React 19, strict TypeScript, and a custom CSS stylesheet derived from the supplied mockups. Tailwind CSS 4 utilities are available via `src/app/tailwind.css` without the Preflight reset so the reference layout styles are preserved.

## Entry points

- `src/app/layout.tsx`: document metadata and global styles
- `src/app/[[...slug]]/page.tsx`: validates supported URLs, generates per-route metadata, and renders the public website
- `src/app/not-found.tsx`: actual HTTP 404 for unsupported paths
- `src/lib/routes.ts`: list of supported page slugs and titles
- `src/components/CafeSite.tsx`: existing public site view and shared shopping-cart state
- `src/lib/site.ts`: centralized business settings, placeholder menu, photo references, and WhatsApp helpers
- `public/rouche-logo.webp`: supplied brand mark

## Working rules for later phases

1. Split features out of the current `CafeSite.tsx` component incrementally, with behavior-preserving changes. Do not replace working routing or shopping-cart state as part of layout edits.
2. Use `src/lib/site.ts` for business contact and Google Maps links; never scatter phone numbers across components.
3. Treat demo menu items, sample prices, image URLs, hours, and address text as unverified until the client confirms them. `CAFE.demoMenu` must stay `true` until the real menu is installed.
4. The cart uses `localStorage`. WhatsApp is the final order/request handoff; no backend or payment gateway is assumed.
5. Put owned photos and food images under `public/images` and reference them with absolute site paths. Replace temporary external photography before launch.
6. Every change should pass `npm run typecheck` and `npm run build` on Node.js 22. GitHub Actions runs both checks.

## Pages

Home (/), About (/about), Menu (/menu), Reservation (/reservation), Gallery (/gallery), Blog (/blog), Contact (/contact), Cart (/cart), and Checkout (/checkout).

## External integrations

- WhatsApp: `+91 9935754959`, configured in `src/lib/site.ts`
- Google Maps: location link in `src/lib/site.ts`
- Optional production site URL: `NEXT_PUBLIC_SITE_URL` documented in `.env.example`

## UI and code safety

Custom CSS remains the primary style layer until the design-system phase. Tailwind utilities are enabled without resetting global element defaults. The project currently uses a single client-side shared site component; breaking it into feature components is a later refactor and is not implied by this setup phase.

## Phase 2 layout and theme

Shared branding and navigation components are now under `src/components/layout` and `src/components/ui`; see `docs/DESIGN_SYSTEM.md`. The visual tokens are centralized in `src/app/tokens.css`. The existing feature implementations in `CafeSite.tsx` remain intact.


## Phase 3: Home and About views

The Home and About pages now live in \`src/components/pages/HomePage.tsx\` and \`src/components/pages/AboutPage.tsx\`. The shared entrypoint \`CafeSite.tsx\` routes to them without changing the menu/cart/checkout features.

\`src/components/pages/QuickTableRequest.tsx\` owns the homepage WhatsApp booking form. It includes basic required fields and local-date validation; café staff must confirm availability manually. The full reservation route remains unchanged.

\`src/components/ui/CafeDecorations.tsx\` supplies self-contained botanical and coffee-bean SVG decorations. Scoped styles in \`src/app/home-about.css\` reproduce the user-provided Home and About reference layouts and adapt them to tablet/mobile. Supplied photography has **not** yet been provided: stock previews still come from the centrally configured \`PHOTOS\` entries in \`src/lib/site.ts\`. Sample menu prices are not authentic; the homepage explicitly labels them illustrative.


## Phase 4: Menu and product system

The menu page now lives in \`src/components/pages/MenuPage.tsx\`; product cards and the desktop cart preview are in \`src/components/menu/\`. Data has been moved to \`src/data/menu.ts\` and photos to \`src/lib/photos.ts\`; imports from \`src/lib/site.ts\` continue to work through re-exports. Filtering and subtotals are pure functions in \`src/lib/menu-utils.ts\`, covered by \`tests/menu-utils.test.ts\`.

The cart's existing localStorage workflow remains unchanged and is shared with Cart and Checkout. The new menu supports a responsive phone cart dock, selected product quantities, a client-only favourite list, filter resets, category states, and empty search results. See \`docs/MENU_SYSTEM.md\`.


## Phase 5: Cart / Checkout

The Cart and Checkout pages are implemented in \`src/components/pages/CartPage.tsx\` and \`CheckoutPage.tsx\`. They use \`src/components/order/OrderSummary.tsx\` and scoped styling in \`src/app/ordering.css\`. \`src/lib/order.ts\` provides the pure format/validation functions; \`src/lib/cart-storage.ts\` handles defensive cart persistence. See \`docs/ORDERING_SYSTEM.md\` for user flow and release safeguards.


## Phase 6: Reservation requests

The dedicated \`ReservationPage.tsx\` and homepage \`QuickTableRequest.tsx\` share \`src/lib/reservations.ts\` for validation, IST preferred time handling and formatted WhatsApp requests. \`src/app/reservation.css\` provides responsive styles. Requests are never auto-confirmed. See \`docs/RESERVATIONS.md\`.


## Phase 7: Gallery, Blog and Contact

Dedicated page components for Gallery, Blog and Contact now live in \`src/components/pages/\`. Typed content is separated into \`src/data/gallery.ts\` and \`src/data/blog.ts\`. WhatsApp contact validation and safe optional Google Maps embedding are in \`src/lib/contact.ts\`, while verified social profile links belong to \`src/lib/social.ts\`. Scoped styling is in \`src/app/showcase.css\`. See \`docs/PHASE7_CONTENT.md\` for content replacement and launch limitations.
