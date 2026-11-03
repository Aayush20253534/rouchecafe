# Phase 9: GitHub and Vercel deployment

## Verified deployment configuration

- **Project:** `rouchecafe`
- **Git repository:** `ayush-jha-NIT/rouchecafe`
- **Production branch:** `main`
- **Framework:** Next.js 15 (App Router)
- **Node.js:** 22.x
- **Vercel account/team:** `ayush-jha-nits-projects`
- **Production URL:** https://rouchecafe.vercel.app/
- **Environment variable:** `NEXT_PUBLIC_SITE_URL=https://rouchecafe.vercel.app` for **Production only**. Its value is configured in Vercel, not stored in a committed environment file.
- **Deployment protection:** Public production URL, Vercel Authentication for preview deployments.
- **Domain:** Vercel-provided `rouchecafe.vercel.app`. No custom domain was requested or purchased.

The repository has Git integration; new commits to `main` can trigger Vercel builds. GitHub Actions independently runs TypeScript, unit tests, a production build, and HTTP/SEO smoke tests.

## Release verification

Check the exact Git commit being served by the latest Vercel production deployment. **READY** means the Vercel build succeeded; it does not mean manual visual QA or client content approval is complete.

Expected checks:
- Production homepage, About, Menu, Reservation, Gallery, Blog, Contact, Cart and Checkout should return successfully.
- Unknown routes should return HTTP 404.
- `/robots.txt` and `/sitemap.xml` should have URLs for the actual production host and must not mention localhost.
- Metadata and JSON-LD should show confirmed café details (Prayagraj, name, phone and official Google Maps link).
- Cart/Checkout remain noindex. Menu, Gallery and Blog remain noindex while they contain unapproved data.
- WhatsApp contact and table reservation requests point to the confirmed café number **+91 99357 54959**; the customer must press Send. Reservation times are preferences, not confirmed tables.
- Sample food orders stay blocked while `CAFE.demoMenu` is true.
- Check responsive screens on 320, 375, 430, 768, 1024 and 1440px; test the mobile menu, image gallery, forms, cart and checkout on real devices. See `docs/PHASE8_QA.md`.

## Pending client launch content

The production build can be accessible while the site is still in **demo-content mode**. Before treating it as a complete café launch:

1. Replace the illustrative food items and prices in `src/data/menu.ts` with a fully approved real menu.
2. Replace all placeholder Unsplash photography with permission-cleared authentic café images.
3. Obtain verified address, opening hours, social links and approved blog text. If a live embedded Google Map is required, provide its Google Maps **Embed** URL, not only the shortened directions link.
4. Confirm delivery eligibility, hours, fees, pickup procedures, packing fees, taxes and order acceptance flow before enabling orders.
5. Retest menus, order messages, SEO, all mobile widths, browser accessibility and Lighthouse using actual assets.

Never disable demo-order safeguards to make an incomplete website appear complete.

## Maintenance and updates

- Push tested changes to `main` via GitHub. Vercel Git integration deploys automatically.
- Observe GitHub Actions and Vercel deployments for the same commit SHA before marking the release complete.
- When a custom domain is later supplied, attach and verify it in Vercel, update `NEXT_PUBLIC_SITE_URL`, redeploy and verify canonical URLs, sitemap and SSL.
- Do not commit access tokens, shared production environment files or customer personal data to Git.
