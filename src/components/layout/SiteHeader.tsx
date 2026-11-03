"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Armchair, Menu, ShoppingCart, X } from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { MAIN_NAVIGATION } from "@/lib/navigation";

export function SiteHeader({ cartCount }: { cartCount: number }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the drawer on navigation, including browser back/forward.
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Escape also closes the drawer for keyboard users.
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className="site-header">
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="header-inner page-width">
        <BrandLogo />
        <nav
          id="primary-navigation"
          className={menuOpen ? "nav-links open" : "nav-links"}
          aria-label="Primary navigation"
        >
          {MAIN_NAVIGATION.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={active ? "active" : undefined}
                aria-current={active ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            );
          })}
        </nav>
        {menuOpen && (
          <button
            type="button"
            className="nav-backdrop"
            onClick={() => setMenuOpen(false)}
            aria-label="Close navigation menu"
            tabIndex={-1}
          />
        )}
        <div className="header-actions">
          <Link href="/reservation" className="book-button" onClick={() => setMenuOpen(false)}>
            <Armchair size={18} aria-hidden="true" />
            <span>BOOK A TABLE</span>
          </Link>
          <Link
            href="/cart"
            className="cart-icon"
            aria-label={`Shopping cart, ${cartCount} ${cartCount === 1 ? "item" : "items"}`}
            onClick={() => setMenuOpen(false)}
          >
            <ShoppingCart size={25} aria-hidden="true" />
            {cartCount > 0 && <span aria-hidden="true">{cartCount}</span>}
          </Link>
          <button
            type="button"
            className="mobile-toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-controls="primary-navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>
  );
}
