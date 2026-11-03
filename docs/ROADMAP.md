# Implementation roadmap

1. **Project setup and architecture** — App Router, strict TypeScript, Tailwind utility integration, shared configuration, route validation, CI, documentation.
2. **Design system and shared UI (implemented)** — colors, typography, reusable visual components, mobile navigation, header and footer refinement.
3. **Home and About (implemented)** — reproduce the supplied mockups using confirmed branding and visuals.
4. **Menu and product system (implemented with demo data)** — responsive menu, categories, search, dietary/bestseller filters, product quantity controls, favourites, and live cart preview. Replace illustrative food/menu data when received.
5. **Cart, checkout and WhatsApp orders (implemented with demo safeguard)** — editable cart, reviewable pickup/delivery request, validation and WhatsApp handoff. The client's final fulfilment and payment rules remain unconfirmed.
6. **Reservations (implemented)** — full booking form, shared homepage request, validated IST date and preferred time, guest count, special requests, review and WhatsApp handoff. Café confirms manually; no live availability API.
7. **Gallery, blog and contact (implemented with content placeholders)** — responsive filtered gallery and lightbox, blog-ready structure without invented posts, validated WhatsApp enquiry, direct supplied Maps link and optional verified embed. Official images, posts, exact street address, hours and social handles still require client data.
8. **Responsiveness, SEO and testing (implemented; browser QA pending)** — responsive styling, next/image optimization, mobile keyboard navigation, Prayagraj SEO, truthful local schema, safe sitemap/robots, functional tests and production HTTP smoke checks. Real-device visual QA remains for Phase 9.
9. **GitHub integration and Vercel deployment (implemented)** — connect `ayush-jha-NIT/rouchecafe` to Vercel project `rouchecafe`, deploy `main` to https://rouchecafe.vercel.app, configure Next.js and Node 22, set a verified canonical production origin, retain preview protection, and check CI. Client content sign-off and real-device QA remain outstanding.

## Current scope

The repository already contains preliminary website pages and interactions. Their presence does **not** mean later phases are accepted or production-ready. Phase 1 establishes and documents the foundation; future phases validate each page against the uploaded references and real café content.
