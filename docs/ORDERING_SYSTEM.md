# Phase 5: Cart, Checkout, and WhatsApp order requests

## Scope

Implemented the supplied Cart and Checkout visual references with a usable, accessible two-step checkout (Details → Review). The café receives *requests* through WhatsApp, not automatic payments, confirmed orders, or live stock reservations.

## Source files

- \`src/components/pages/CartPage.tsx\`: editable cart, clear cart, recommendations, shared summary.
- \`src/components/pages/CheckoutPage.tsx\`: pickup/delivery selector, customer details, future-date preference, notes, validation, review and WhatsApp handoff.
- \`src/components/order/OrderSummary.tsx\`: reusable subtotal panel. Unknown delivery/packing fees are **not** added.
- \`src/lib/order.ts\`: pure validation, date handling, and formatted WhatsApp request.
- \`src/lib/cart-storage.ts\`: safe persistence and quantity updates, allowing only known products and quantities from 1 to 99.
- \`src/app/ordering.css\`: responsive cart and checkout page styling.
- \`tests/order.test.ts\` and \`tests/cart-storage.test.ts\`: test valid/invalid orders, fees, format and storage.

## Process

1. Customer adds food to cart from Menu or recommendations.
2. Cart edits are persisted in browser localStorage under \`rouche-cart\`. No account required.
3. Cart shows a subtotal and excludes unspecified additional fees.
4. Checkout collects name, phone and optional email; pickup or delivery; required delivery address for delivery; preferred future date/time; and optional instructions.
5. **Review** shows entered details and an explicit acknowledgement. The send link is a regular customer-activated WhatsApp URL with a prefilled order request.
6. The customer must **press Send** in WhatsApp. Café staff confirm order acceptance, delivery availability, charges, method of payment, and final payable amount. The website does not clear the cart or show a fake order success.

## Live-order safeguard

The client has not yet provided a verified menu. \`CAFE.demoMenu\` is deliberately \`true\`: customers may preview and review but **cannot** open the food order WhatsApp link. Only set it to false after replacing sample items, prices, descriptions, categories, availability and photographs, and confirming fulfilment rules with the client.

## Important unverified details

- Whether the café offers delivery and what localities are served
- Delivery charges, packing charges, minimum order and any tax rules
- Accepted operating hours, pickup/delivery slots, payment arrangements
- Final menu items and prices

Until confirmed, the website makes no specific availability, fee, or final-payment guarantee.

## Checks

CI executes \`npm run typecheck\`, \`npm test\`, and \`npm run build\`.
