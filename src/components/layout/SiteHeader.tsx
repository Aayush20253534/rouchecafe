"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Armchair, Menu, ShoppingCart, X } from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { MAIN_NAVIGATION } from "@/lib/navigation";

export function SiteHeader({ cartCount }: { cartCount: number }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    if (!menuOpen || !window.matchMedia("(max-width: 950px)").matches) return;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const links = [...(navRef.current?.querySelectorAll<HTMLAnchorElement>("a") ?? [])];
    links[0]?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        toggleRef.current?.focus();
      } else if (event.key === "Tab" && links.length > 0) {
        const first = links[0];
        const last = links[links.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          toggleRef.current?.focus();
        } else if (!event.shiftKey && document.activeElement === toggleRef.current) {
          event.preventDefault();
          first.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          toggleRef.current?.focus();
        } else if (event.shiftKey && document.activeElement === toggleRef.current) {
          event.preventDefault();
          last.focus();
        }
      }
    }

    function onResize() {
      if (!window.matchMedia("(max-width: 950px)").matches) setMenuOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = oldOverflow;
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  return (
    <header className="site-header">
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="header-inner page-width">
        <BrandLogo />
        <nav
          id="primary-navigation"
          ref={navRef}
          className={menuOpen ? "nav-links open" : "nav-links"}
          aria-label="Primary navigation"
        >
          {MAIN_NAVIGATION.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link key={href} href={href}
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
          <button type="button" className="nav-backdrop"
            onClick={() => { setMenuOpen(false); toggleRef.current?.focus(); }}
            aria-label="Close navigation menu" tabIndex={-1} />
        )}
        <div className="header-actions">
          <Link href="/reservation" className="book-button" onClick={() => setMenuOpen(false)}>
            <Armchair size={18} aria-hidden="true"/>
            <span>BOOK A TABLE</span>
          </Link>
          <Link href="/cart" className="cart-icon"
            aria-label={"Shopping cart, " + cartCount + (cartCount === 1 ? " item" : " items")}
            onClick={() => setMenuOpen(false)}>
            <ShoppingCart size={25} aria-hidden="true"/>
            {cartCount > 0 && <span aria-hidden="true">{cartCount}</span>}
          </Link>
          <button ref={toggleRef} type="button" className="mobile-toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-controls="primary-navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X aria-hidden="true"/> : <Menu aria-hidden="true"/>}
          </button>
        </div>
      </div>
    </header>
  );
}
