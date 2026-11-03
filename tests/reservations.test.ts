import test from "node:test";
import assert from "node:assert/strict";
import {
  todayAtCafeISO, availablePreferenceSlots, validateReservation,
  formatReservationRequest, MAX_RESERVATION_GUESTS,
  type ReservationDetails,
} from "../src/lib/reservations";

const now = new Date("2026-11-03T13:15:00.000Z"); // 18:45 in Prayagraj
const valid: ReservationDetails = {
  name: "Sample Customer", phone: "+91 9935754959", date: "2026-11-04",
  time: "07:00 PM", guests: 4, occasion: "Birthday Celebration", notes: "Window seating if possible",
};

test("café date is calculated in Asia/Kolkata, independently of browser timezone", () => {
  assert.equal(todayAtCafeISO(new Date("2026-11-02T19:00:00.000Z")), "2026-11-03");
  assert.equal(todayAtCafeISO(new Date("2026-11-03T18:29:59.000Z")), "2026-11-03");
  assert.equal(todayAtCafeISO(new Date("2026-11-03T18:30:00.000Z")), "2026-11-04");
});

test("valid future reservation is accepted", () => {
  assert.deepEqual(validateReservation(valid, now), []);
});

test("rejects past dates, fake calendar dates, invalid phones and invalid guest counts", () => {
  const errors = validateReservation({
    ...valid, name: "A", phone: "1234", date: "2026-02-30", guests: 0,
  }, now);
  assert.ok(errors.some((x) => x.includes("full name")));
  assert.ok(errors.some((x) => x.includes("phone number")));
  assert.ok(errors.some((x) => x.includes("future date")));
  assert.ok(errors.some((x) => x.includes("1 and 20")));
  assert.ok(validateReservation({ ...valid, date: "2026-11-02" }, now).some((x) => x.includes("future date")));
  assert.ok(validateReservation({ ...valid, guests: MAX_RESERVATION_GUESTS + 1 }, now).some((x) => x.includes("1 and 20")));
});

test("only later preference slots are selectable on the current café date", () => {
  assert.deepEqual(availablePreferenceSlots("2026-11-02", now), []);
  assert.ok(!availablePreferenceSlots("2026-11-03", now).includes("06:30 PM"));
  assert.ok(availablePreferenceSlots("2026-11-03", now).includes("07:00 PM"));
  assert.ok(validateReservation({ ...valid, date: "2026-11-03", time: "06:30 PM" }, now).some((x) => x.includes("future time")));
  assert.deepEqual(validateReservation({ ...valid, date: "2026-11-03", time: "07:00 PM" }, now), []);
});

test("unknown time options cannot be accepted as available inventory", () => {
  assert.ok(validateReservation({ ...valid, time: "01:13 AM" }, now).some((x) => x.includes("preferred reservation time")));
});

test("WhatsApp message includes all request fields and explicitly asks café to confirm", () => {
  const message = formatReservationRequest(valid);
  assert.match(message, /Sample Customer/);
  assert.match(message, /Preferred date: 2026-11-04/);
  assert.match(message, /Preferred time \(IST\): 07:00 PM/);
  assert.match(message, /Number of guests: 4/);
  assert.match(message, /Birthday Celebration/);
  assert.match(message, /Window seating/);
  assert.match(message, /not a confirmed reservation/);
  assert.doesNotMatch(message, /Reservation confirmed|Booking ID:/);
});

test("optional fields do not invent customer preferences", () => {
  const message = formatReservationRequest({ ...valid, occasion: "", notes: "" });
  assert.match(message, /Occasion: Not specified/);
  assert.match(message, /Special requests: None/);
});
