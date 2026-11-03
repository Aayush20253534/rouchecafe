# Menu and product system (Phase 4)

The live café menu has **not** been supplied. The existing 17 example dishes and their prices remain sample data; no ordering should go live until the owner provides approved menu information.

## Source of truth

- \`src/data/menu.ts\`: menu items, categories, types. Replace the sample entries with approved café menu records.
- \`src/lib/photos.ts\`: temporary image references. Replace each product's \`image\` with an uploaded \`/images/...webp\` path.
- \`src/lib/site.ts\`: business details and re-exports for compatibility; keep \`CAFE.demoMenu = true\` until verification.
- \`src/lib/menu-utils.ts\`: pure search/filter, cart counting, and subtotal calculations (do not assume delivery fees).
- \`src/types/cart.ts\`: cart quantity mapping for localStorage.

## Menu format

Each item must have a stable unique \`id\`, \`name\`, \`description\`, \`price\` (Indian rupees, number), \`category\` (matching \`categories\`), \`image\` path, \`veg\` (boolean) and optional \`bestseller\` (boolean). If categories change, update the list in \`src/data/menu.ts\`.

## Interface

- \`src/components/pages/MenuPage.tsx\`: menu hero, category rail, search and dietary filters, result grouping, and empty states.
- \`src/components/menu/MenuProductCard.tsx\`: food card, mockup pricing, local favourites, quantity selector (1–99), add to cart.
- \`src/components/menu/MenuCartPreview.tsx\`: desktop sticky preview, quantity controls, item removal, subtotal, and cart link.
- \`src/app/menu.css\`: responsive visual system scoped to the menu page.
- On tablet and mobile, a bottom cart dock replaces the desktop cart panel once items are added.
- Favourites are stored locally under \`rouche-menu-favourites\`; they do not require sign-in.

## Safety and upcoming integration

Only sample data is shown. Checkout has a server-independent safeguard to block WhatsApp ordering while \`CAFE.demoMenu\` is true. Cart and order previews are permitted for design testing. The subtotal excludes any delivery/packing fees because real charges have not yet been confirmed.

Phase 5 will refine cart/checkout behavior and ensure verified order details are conveyed correctly. Phase 6 will finish the reservation flow. The initial menu images remain temporary and need replacing before commercial launch.

## Verification

\`npm run typecheck\`, \`npm test\`, and \`npm run build\` run in CI.
