"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { menu } from "@/lib/site";
import type { Cart } from "@/types/cart";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { HomePage } from "@/components/pages/HomePage";
import { AboutPage } from "@/components/pages/AboutPage";
import { MenuPage } from "@/components/pages/MenuPage";
import { CartPage } from "@/components/pages/CartPage";
import { CheckoutPage } from "@/components/pages/CheckoutPage";
import { ReservationPage } from "@/components/pages/ReservationPage";
import { GalleryPage } from "@/components/pages/GalleryPage";
import { ContactPage } from "@/components/pages/ContactPage";
import { BlogPage } from "@/components/pages/BlogPage";
import { parseStoredCart, updateCartQuantity } from "@/lib/cart-storage";
import { cartItemCount } from "@/lib/menu-utils";
import { ButtonLink } from "@/components/ui/CafePrimitives";

const knownItemIds = new Set(menu.map((item) => item.id));

export default function CafeSite() {
  const pathname = usePathname();
  const [cart, setCart] = useState<Cart>({});
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    let raw: string | null = null;
    try { raw = window.localStorage.getItem("rouche-cart"); } catch {}
    setCart(parseStoredCart(raw, knownItemIds));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try { window.localStorage.setItem("rouche-cart", JSON.stringify(cart)); } catch {}
  }, [cart, hydrated]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const change = (id: string, delta: number) => {
    setCart((current) => updateCartQuantity(current, id, delta, knownItemIds));
  };
  const add = (id: string, quantity = 1) => {
    if (!knownItemIds.has(id) || !Number.isInteger(quantity) || quantity < 1) return;
    change(id, quantity);
    const item = menu.find((product) => product.id === id);
    setToast(item ? (quantity > 1 ? quantity + " × " : "") + item.name + " added to cart" : "");
  };
  const clear = () => setCart({});
  const count = useMemo(() => cartItemCount(cart), [cart]);
  const route = (pathname || "/").split("/").filter(Boolean)[0] || "home";

  const current: Record<string, ReactNode> = {
    home: <HomePage />,
    about: <AboutPage />,
    menu: <MenuPage add={add} cart={cart} change={change} />,
    reservation: <ReservationPage />,
    gallery: <GalleryPage />,
    contact: <ContactPage />,
    cart: <CartPage cart={cart} change={change} clear={clear} add={add} />,
    checkout: <CheckoutPage cart={cart} />,
    blog: <BlogPage />,
  };

  return (
    <>
      <SiteHeader cartCount={count}/>
      <main id="main" tabIndex={-1}>
        {current[route] || (
          <section className="section page-width not-found">
            <h1>Page not found</h1>
            <ButtonLink href="/">RETURN HOME</ButtonLink>
          </section>
        )}
      </main>
      <SiteFooter/>
      {toast && (
        <div className="cart-toast" role="status" aria-live="polite" aria-atomic="true">
          <CheckCircle2 size={18} aria-hidden="true"/>{toast}
          <Link href="/cart">View cart</Link>
        </div>
      )}
    </>
  );
}
