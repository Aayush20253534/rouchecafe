import type { MenuItem } from "@/data/menu";
import type { Cart } from "@/types/cart";

export type MenuFilter = "All" | "Bestseller" | "Veg" | "Non-Veg";
export type MenuCriteria = { category: string; filter: MenuFilter; query: string };

/** Case and accent insensitive search, preserving the original item order. */
function normalize(value: string): string {
  return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase().trim();
}

export function filterMenu(items: readonly MenuItem[], criteria: MenuCriteria): MenuItem[] {
  const query = normalize(criteria.query);
  return items.filter((item) => {
    if (criteria.category !== "All" && item.category !== criteria.category) return false;
    if (criteria.filter === "Bestseller" && !item.bestseller) return false;
    if (criteria.filter === "Veg" && !item.veg) return false;
    if (criteria.filter === "Non-Veg" && item.veg) return false;
    return !query || normalize(item.name + " " + item.description + " " + item.category).includes(query);
  });
}

export function cartEntries(items: readonly MenuItem[], cart: Cart): MenuItem[] {
  return items.filter((item) => Number.isInteger(cart[item.id]) && cart[item.id] > 0);
}

export function cartItemCount(cart: Cart): number {
  return Object.values(cart).reduce((sum, quantity) => sum + (Number.isInteger(quantity) && quantity > 0 ? quantity : 0), 0);
}

/** Excludes delivery/packing charges, because the café has not supplied them. */
export function cartSubtotal(items: readonly MenuItem[], cart: Cart): number {
  return cartEntries(items, cart).reduce((sum, item) => sum + item.price * cart[item.id], 0);
}
