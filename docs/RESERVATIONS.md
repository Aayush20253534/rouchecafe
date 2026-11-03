# Phase 6: Table reservations

The Rouché Café reservation page follows the owner's supplied visual reference.
**Booking requests are sent using WhatsApp, not a live reservation backend.**

## Components

- \`src/components/pages/ReservationPage.tsx\` — full booking form, review step, WhatsApp request link, café experience sections.
- \`src/components/pages/QuickTableRequest.tsx\` — homepage compact form, now using the exact same reservation validation and WhatsApp message.
- \`src/lib/reservations.ts\` — pure functions for date and preferred-slot handling, guests, input validation and message construction.
- \`src/app/reservation.css\` — responsive forest-green, cream and gold page styling.
- \`tests/reservations.test.ts\` — timezone, past-date/slot, party-size, invalid input and message safety tests.

## User flow

1. Customer enters name, phone, preferred date, preferred time (IST), guests (1–20), occasion and optional special requests.
2. Form validates name, phone, actual calendar date, time preference and guest count.
3. On the café's current date, past time choices are hidden and rejected in validation. This uses the fixed \`Asia/Kolkata\` timezone for Prayagraj regardless of device location.
4. Valid submissions display a review panel. The customer opens a **prefilled WhatsApp message** to \`+91 9935754959\` and must still press Send.
5. Café staff confirm availability and any booking conditions. The website never displays an automatic "Reservation Confirmed" state.

## Limits and launch conditions

- The time dropdown represents *preferences* only, not live seating availability or confirmed opening hours.
- No database, live table calendar, reservation slot API, online payment or auto-confirmation is included.
- Customer details are entered on the website and passed to WhatsApp by user action; they are not stored on a backend.
- Real café photos will replace the placeholder photography after delivery from the client.
- Larger parties can contact the café separately; the current selectable range is 1–20 guests.
- The user must receive explicit confirmation from café staff before relying on the booking.

## Verification

GitHub Actions runs \`npm run typecheck\`, \`npm test\` and \`npm run build\`.
