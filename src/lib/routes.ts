/**
 * Public route registry. Keep page metadata and route validation in sync
 * as additional café pages are implemented.
 */
export const PAGE_TITLES = {
  home: "Good Coffee, Brighter Days",
  about: "About Us",
  menu: "Explore Our Menu",
  reservation: "Reserve a Table",
  gallery: "Gallery",
  blog: "Journal",
  contact: "Contact Us",
  cart: "Your Cart",
  checkout: "Checkout",
} as const;

export type PageKey = keyof typeof PAGE_TITLES;

export function isPageKey(key: string): key is PageKey {
  return Object.prototype.hasOwnProperty.call(PAGE_TITLES, key);
}
