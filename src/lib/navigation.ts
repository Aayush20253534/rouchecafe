/**
 * One shared navigation definition for desktop/mobile header and footer.
 */
export const MAIN_NAVIGATION = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/menu", label: "Menu" },
  { href: "/reservation", label: "Reservation" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

/** Main navbar excludes supplementary pages; the footer retains all routes. */
export const HEADER_NAVIGATION = MAIN_NAVIGATION.filter(
  ({ href }) => href !== "/reservation" && href !== "/blog"
);
