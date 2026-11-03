import type { MenuItem } from "@/data/menu";
import type { Cart } from "@/types/cart";
import { cartEntries, cartSubtotal } from "@/lib/menu-utils";
import { todayAtCafeISO, availablePreferenceSlots, RESERVATION_TIMES } from "@/lib/reservations";

export type FulfilmentType = "Pickup" | "Delivery";

export type CheckoutDetails = {
  name: string;
  phone: string;
  email: string;
  fulfilment: FulfilmentType;
  address: string;
  date: string;
  time: string;
  notes: string;
};

export const EMPTY_CHECKOUT_DETAILS: CheckoutDetails = {
  name: "",
  phone: "",
  email: "",
  fulfilment: "Pickup",
  address: "",
  date: "",
  time: "",
  notes: "",
};

/** Café-local date in IST (not the visitor's device timezone). */
export function todayLocalISO(date: Date = new Date()): string {
  return todayAtCafeISO(date);
}

/** Time slots are preferences and do not represent live service availability. */
export const ORDER_TIME_SLOTS = RESERVATION_TIMES;

/** Validates customer information and the requested fulfilment details. */
export function validateCheckout(
  details: CheckoutDetails,
  cart: Cart,
  items: readonly MenuItem[],
  today: string = todayLocalISO(),
  now: Date = new Date(),
): string[] {
  const errors: string[] = [];
  if (cartEntries(items, cart).length === 0) errors.push("Add a menu item before checking out.");
  if (details.name.trim().length < 2) errors.push("Enter your full name.");
  const digits = details.phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 15) errors.push("Enter a valid phone number with 10 to 15 digits.");
  const email = details.email.trim();
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Enter a valid email or leave it blank.");
  if (details.fulfilment !== "Pickup" && details.fulfilment !== "Delivery") errors.push("Choose pickup or delivery.");
  if (details.fulfilment === "Delivery" && details.address.trim().length < 10) {
    errors.push("Enter a complete delivery address, including area and landmark.");
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(details.date) || details.date < today) {
    errors.push("Select today or a future date.");
  }
  if (!details.time || !ORDER_TIME_SLOTS.some((slot) => slot === details.time)) {
    errors.push("Select a preferred time.");
  } else if (details.date === today && today === todayAtCafeISO(now) &&
             !availablePreferenceSlots(details.date, now).includes(details.time)) {
    errors.push("Select a future preferred time for today.");
  }
  return errors;
}

const oneLine = (value: string) => value.replace(/\s+/g, " ").trim();

/**
 * Generates a WhatsApp *request*, not an accepted or paid order.
 * The service area, charges, payment arrangement, and availability are unconfirmed.
 */
export function formatWhatsAppOrder(
  details: CheckoutDetails,
  cart: Cart,
  items: readonly MenuItem[],
): string {
  const selected = cartEntries(items, cart);
  if (!selected.length) throw new Error("The cart is empty.");
  const subtotal = cartSubtotal(items, cart);
  return [
    "Hello The Rouché Café, I would like to request an order.",
    "",
    "ORDER ITEMS",
    ...selected.map((item, index) =>
      String(index + 1) + ". " + item.name + " x " + cart[item.id] +
      " = ₹" + (item.price * cart[item.id]).toLocaleString("en-IN"),
    ),
    "",
    "Items subtotal: ₹" + subtotal.toLocaleString("en-IN"),
    "Delivery/packing charges: To be confirmed by café",
    "Final payable amount: To be confirmed by café",
    "",
    "ORDER DETAILS",
    "Order type: " + details.fulfilment,
    "Name: " + oneLine(details.name),
    "Phone: " + oneLine(details.phone),
    "Email: " + (details.email.trim() ? oneLine(details.email) : "Not provided"),
    "Preferred date: " + details.date,
    "Preferred time: " + details.time,
    ...(details.fulfilment === "Delivery"
      ? ["Delivery address: " + oneLine(details.address)]
      : []),
    "Special instructions: " + (details.notes.trim() ? oneLine(details.notes) : "None"),
    "",
    "Please confirm item availability, " +
      (details.fulfilment === "Delivery" ? "delivery availability, " : "") +
      "final charges, payment method and acceptance of this order.",
  ].join("\n");
}
