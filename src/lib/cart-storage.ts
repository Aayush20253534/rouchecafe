import type { Cart } from "@/types/cart";

/** Coerces previously stored JSON to the known item IDs and safe quantities. */
export function parseStoredCart(raw: string | null, knownIds: ReadonlySet<string>): Cart {
  if (!raw) return {};
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    const safe: Cart = {};
    for (const [id, quantity] of Object.entries(parsed)) {
      if (knownIds.has(id) && Number.isInteger(quantity) && typeof quantity === "number" &&
        quantity >= 1 && quantity <= 99) safe[id] = quantity;
    }
    return safe;
  } catch {
    return {};
  }
}

/** Central quantity logic; negative changes remove an item, max 99. */
export function updateCartQuantity(cart: Cart, id: string, delta: number, knownIds: ReadonlySet<string>): Cart {
  if (!knownIds.has(id) || !Number.isInteger(delta) || delta === 0) return cart;
  const before = cart[id] || 0;
  const next = Math.max(0, Math.min(99, before + delta));
  const result = { ...cart };
  if (next === 0) delete result[id];
  else result[id] = next;
  return result;
}
