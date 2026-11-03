"use client";

import React, { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRight, ArrowLeft, CalendarDays, CheckCircle2, ChevronDown, Clock3,
  Coffee, Heart, Leaf, Mail, MapPin, Menu as MenuIcon, Minus, Plus, Phone,
  Search, ShoppingBag, ShoppingCart, Star, Trash2, Users, UtensilsCrossed,
  X, MessageCircle, Instagram, Facebook, Youtube, Linkedin, Send, Sparkles,
  Truck, PackageCheck, ShieldCheck, ChefHat, Armchair, CakeSlice, Gift,
  Info, ClipboardList, Flame, Sandwich, BookOpen
} from "lucide-react";
import { CAFE, PHOTOS, categories, menu, money, waLink, type MenuItem } from "@/lib/site";
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
import { Pill, SectionHeading, Photo, Hero, FeatureStrip, OpenWhatsApp, ButtonLink } from "@/components/ui/CafePrimitives";

type Cart = Record<string, number>;

function ProductCard({item,add,compact=false}:{item:MenuItem;add:(id:string)=>void;compact?:boolean}) {
  const [liked,setLiked]=useState(false);
  return <article className={"product-card "+(compact?"compact":"")}>
    <div className="product-img-wrap"><Photo src={item.image} alt={item.name} className="product-photo"/><button className={"heart "+(liked?"active":"")} onClick={()=>setLiked(v=>!v)} aria-label={liked?"Remove from favourites":"Add to favourites"}><Heart size={19} fill={liked?"currentColor":"none"}/></button></div>
    <div className="product-body"><strong>{item.name}</strong>{!compact&&<p>{item.description}</p>}<div className="product-bottom"><b>{money(item.price)}</b><button onClick={()=>add(item.id)} className="add-btn"><ShoppingBag size={14}/> Add to Cart</button></div></div>
  </article>;
}
const openWa=(message:string)=>window.open(waLink(message),"_blank","noopener,noreferrer");

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

  const current: Record<string, React.ReactNode> = {
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
      <SiteHeader cartCount={count} />
      <main id="main">{current[route] || <section className="section page-width not-found"><h1>Page not found</h1><ButtonLink href="/">RETURN HOME</ButtonLink></section>}</main>
      <SiteFooter />
      {toast && <div className="cart-toast" role="status"><CheckCircle2 size={18} />{toast}<Link href="/cart">View cart</Link></div>}
    </>
  );
}
