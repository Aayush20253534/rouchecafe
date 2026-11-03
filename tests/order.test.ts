import assert from "node:assert/strict";
import test from "node:test";
import { menu } from "../src/data/menu";
import { EMPTY_CHECKOUT_DETAILS, formatWhatsAppOrder, todayLocalISO, validateCheckout, type CheckoutDetails } from "../src/lib/order";

const valid: CheckoutDetails = {
  ...EMPTY_CHECKOUT_DETAILS,
  name: "Customer Example",
  phone: "+91 9935754959",
  date: "2026-11-04",
  time: "07:00 PM",
};

test("local date formatting uses calendar fields instead of UTC", () => {
  assert.equal(todayLocalISO(new Date(2026, 10, 3)), "2026-11-03");
});

test("pickup requires contact, items, and future time but no address", () => {
  assert.deepEqual(validateCheckout(valid, { cappuccino: 2 }, menu, "2026-11-03"), []);
  const invalid = validateCheckout({ ...valid, phone: "123", date: "2026-11-02" }, {}, menu, "2026-11-03");
  assert.ok(invalid.some((message) => message.includes("cart") || message.includes("menu item")));
  assert.ok(invalid.some((message) => message.includes("phone")));
  assert.ok(invalid.some((message) => message.includes("future date")));
});

test("delivery requires a substantive address", () => {
  const delivery: CheckoutDetails = { ...valid, fulfilment: "Delivery" };
  assert.ok(validateCheckout(delivery, { croissant: 1 }, menu, "2026-11-03").some((message) => message.includes("delivery address")));
  assert.deepEqual(validateCheckout({ ...delivery, address: "12 Civil Lines, Prayagraj, landmark" }, { croissant: 1 }, menu, "2026-11-03"), []);
});

test("invalid preferred slot or email cannot enter the review step", () => {
  const invalid = validateCheckout({ ...valid, email: "not-an-email", time: "02:59 AM" }, { cappuccino: 1 }, menu, "2026-11-03");
  assert.equal(invalid.length, 2);
});

test("WhatsApp request includes item quantities, subtotal, customer, and no invented delivery fee", () => {
  const details: CheckoutDetails = { ...valid, fulfilment: "Delivery", address: "12 Civil Lines, Prayagraj", notes: "No onions" };
  const message = formatWhatsAppOrder(details, { cappuccino: 2, croissant: 1 }, menu);
  assert.match(message, /Cappuccino x 2 = ₹520/);
  assert.match(message, /Butter Croissant x 1 = ₹180/);
  assert.match(message, /Items subtotal: ₹700/);
  assert.match(message, /Delivery address: 12 Civil Lines, Prayagraj/);
  assert.match(message, /final charges/i);
  assert.doesNotMatch(message, /Delivery charge: ₹/);
});

test("pickup request never includes delivery address, even with stale form data", () => {
  const message = formatWhatsAppOrder({ ...valid, address: "Old address" }, { croissant: 1 }, menu);
  assert.doesNotMatch(message, /Delivery address:/);
  assert.match(message, /Order type: Pickup/);
});

test("empty cart cannot produce a WhatsApp order", () => {
  assert.throws(() => formatWhatsAppOrder(valid, {}, menu), /empty/);
});


test("checkout dates are based on café IST, not browser timezone", () => {
  assert.equal(todayLocalISO(new Date("2026-11-03T18:29:59.000Z")), "2026-11-03");
  assert.equal(todayLocalISO(new Date("2026-11-03T18:30:00.000Z")), "2026-11-04");
});

test("same-day checkout rejects times already past in Prayagraj", () => {
  const current = new Date("2026-11-03T13:15:00.000Z"); // 18:45 IST
  const selected = { ...valid, date: "2026-11-03", time: "06:30 PM" };
  assert.ok(validateCheckout(selected, { cappuccino: 1 }, menu, "2026-11-03", current)
    .some((message) => message.includes("future preferred time")));
  assert.deepEqual(validateCheckout({ ...selected, time: "07:00 PM" }, { cappuccino: 1 }, menu, "2026-11-03", current), []);
});
