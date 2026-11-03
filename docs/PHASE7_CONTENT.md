# Phase 7: Gallery, Blog and Contact

## What's implemented

- \`src/components/pages/GalleryPage.tsx\`: responsive mosaic gallery with category filters (All, Ambience, Food, Beverages, Events and Celebrations), keyboard-accessible lightbox (Escape, left/right arrows) and reservation CTA.
- \`src/data/gallery.ts\`: typed gallery records with stable IDs and a \`placeholder\` marker.
- \`src/components/pages/BlogPage.tsx\`: branded journal landing page, category filters, editorial card renderer and expandable articles for supplied content, with an honest empty state.
- \`src/data/blog.ts\`: editable, typed blog post records. No article was published without client approval.
- \`src/components/pages/ContactPage.tsx\`: designed contact hero, verified telephone/WhatsApp, enquiry form with validation/review/WhatsApp handoff, and Google Maps location CTA.
- \`src/lib/contact.ts\`: pure validation, formatter and safe optional Maps embed URL helper.
- \`src/lib/social.ts\`: official social profile list (currently empty, because handles were not provided).
- \`src/app/showcase.css\`: responsive cream, forest-green and gold styling.
- \`tests/contact-gallery-blog.test.ts\`: automated logic tests.

## Gallery asset replacement

When the owner supplies photos, save optimized images inside \`public/images/gallery/\`. Replace each sample image \`src\`, \`alt\` and \`caption\` in \`src/data/gallery.ts\`, and set \`placeholder: false\` once it is an authentic approved image. All current gallery assets are **temporary illustrative photography**.

The mosaic layout, filters and lightbox will continue to work with local images.

## Blog publishing

Real blog content goes in \`src/data/blog.ts\`. Each post needs:
- \`slug\`, unique string identifier
- \`title\`, \`excerpt\`, \`category\`
- \`image\` pointing to a supplied photograph
- \`datePublished\` in ISO format
- \`content\`: array of approved text paragraphs

The blog page renders cards and expandable stories in place. No invented customer experiences, promotions, opening dates, or articles have been published.

## Contact and Maps

The official user-provided WhatsApp number is **+91 9935754959**, configured centrally in \`src/lib/site.ts\`. The user-provided exact Maps location URL is:

https://maps.app.goo.gl/hFJA5p2F91QixMgQ7

The Contact page always offers **Get Directions** and **Open Exact Location** links using that URL.

A Maps embed requires an **embeddable Google Maps iframe source**, which is different from the shortlink. If supplied, set \`NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL\` to the \`https://www.google.com/maps/embed?... \` URL from Google Maps > Share > Embed a map. Until then, the page shows a branded map panel with a working exact-location link. This avoids showing an unverified or wrongly centered map.

The contact form prepares a prefilled WhatsApp enquiry. Customers must press **Send** after opening WhatsApp. No backend stores contact form data, and there is no false confirmation state.

## Missing business details

The exact street address, opening hours, email address and social handles seen in visual mockups are not verified by the client. They remain unset or labelled for confirmation. Only add verified business information to the central config. Social profiles should be listed in \`src/lib/social.ts\` only when official URLs are supplied.

## Tests

\`npm run typecheck\`, \`npm test\`, and \`npm run build\` are run by GitHub Actions.
