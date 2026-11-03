"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight, CakeSlice, ChefHat, Coffee, Flame, Gift, Heart,
  Info, Leaf, Search, Sandwich, ShoppingBag, Sparkles,
  Truck, UtensilsCrossed, X,
  type LucideIcon,
} from "lucide-react";
import { CAFE, PHOTOS, categories, menu } from "@/lib/site";
import { filterMenu, cartItemCount, cartSubtotal, type MenuFilter } from "@/lib/menu-utils";
import type { Cart } from "@/types/cart";
import { FeatureStrip, Hero, ButtonLink, SectionHeading, Photo } from "@/components/ui/CafePrimitives";
import { CoffeeBeanRule, BotanicalSprig } from "@/components/ui/CafeDecorations";
import { MenuProductCard } from "@/components/menu/MenuProductCard";
import { MenuCartPreview } from "@/components/menu/MenuCartPreview";

type Props = {
  cart: Cart;
  add: (id: string, quantity?: number) => void;
  change: (id: string, diff: number) => void;
};

const FILTERS: { label: MenuFilter; icon: LucideIcon | null }[] = [
  { label: "All", icon: null },
  { label: "Bestseller", icon: Sparkles },
  { label: "Veg", icon: Leaf },
  { label: "Non-Veg", icon: Flame },
];

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "Coffee & Beverages": Coffee,
  "Breakfast & Brunch": CakeSlice,
  "Snacks & Starters": Flame,
  "Pasta & Italian": UtensilsCrossed,
  "Main Course": ChefHat,
  "Burgers & Sandwiches": Sandwich,
  "Desserts & Bakery": CakeSlice,
  "Chef's Special": ChefHat,
  "Combos & Offers": Gift,
};

const FAVOURITES_KEY = "rouche-menu-favourites";

function readFavourites(): string[] {
  try {
    const raw = window.localStorage.getItem(FAVOURITES_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const ids = new Set(menu.map((item) => item.id));
    return parsed.filter((id): id is string => typeof id === "string" && ids.has(id));
  } catch {
    return [];
  }
}

export function MenuPage({ add, cart, change }: Props) {
  const [category, setCategory] = useState("All");
  const [filter, setFilter] = useState<MenuFilter>("All");
  const [query, setQuery] = useState("");
  const [favourites, setFavourites] = useState<string[]>([]);
  const [favouritesLoaded, setFavouritesLoaded] = useState(false);

  useEffect(() => {
    setFavourites(readFavourites());
    setFavouritesLoaded(true);
  }, []);

  useEffect(() => {
    if (!favouritesLoaded) return;
    try { window.localStorage.setItem(FAVOURITES_KEY, JSON.stringify(favourites)); } catch {}
  }, [favourites, favouritesLoaded]);

  const matched = useMemo(
    () => filterMenu(menu, { category, filter, query }),
    [category, filter, query],
  );
  const sections = (category === "All" ? categories : [category])
    .map((name) => ({ name, items: matched.filter((item) => item.category === name) }))
    .filter((section) => section.items.length > 0);
  const activeFilters = category !== "All" || filter !== "All" || query.trim().length > 0;
  const itemCount = cartItemCount(cart);

  function resetFilters() {
    setCategory("All");
    setFilter("All");
    setQuery("");
  }

  function toggleFavourite(id: string) {
    setFavourites((existing) =>
      existing.includes(id) ? existing.filter((value) => value !== id) : [...existing, id],
    );
  }

  function showCategory(name: string) {
    setCategory(name);
    setFilter("All");
    setQuery("");
    document.getElementById("browse")?.scrollIntoView({ block: "start", behavior: "smooth" });
  }

  return (
    <div className="trc-menu-page">
      <div className="trc-menu-hero-wrap">
        <BotanicalSprig className="trc-botanical trc-menu-botanical" />
        <Hero
          eyebrow="OUR MENU"
          title="Explore Our Signature Menu"
          description="A delightful selection of artisan coffees, freshly prepared meals, and irresistible desserts."
          image={PHOTOS.coffee}
        >
          <ButtonLink href="#browse"><ShoppingBag size={18} aria-hidden="true"/> ORDER ONLINE <ArrowRight size={18} aria-hidden="true"/></ButtonLink>
          <ButtonLink href="/reservation" light><Coffee size={18} aria-hidden="true"/> DINE AT CAFÉ</ButtonLink>
        </Hero>
      </div>
      <FeatureStrip features={[
        { icon: <Truck/>, title: "ORDER ONLINE", desc: "Browse our food favourites" },
        { icon: <ShoppingBag/>, title: "TAKEAWAY", desc: "Pick up at your convenience" },
        { icon: <UtensilsCrossed/>, title: "DINE IN", desc: "Enjoy the full café experience" },
        { icon: <Leaf/>, title: "FRESH & QUALITY", desc: "Made with thoughtful ingredients" },
      ]}/>

      <section className="section page-width trc-menu-browse" id="browse" aria-label="Browse café menu">
        <SectionHeading eyebrow="OUR MENU" title="Browse & Order Your Favourites" />
        <CoffeeBeanRule className="trc-menu-heading-rule"/>

        {CAFE.demoMenu && (
          <div className="trc-menu-demo" role="note">
            <Info size={21} aria-hidden="true" />
            <div>
              <strong>Menu preview only</strong>
              <p>Food names, photos and prices are temporary examples from the design. You can explore the cart, but WhatsApp food-order submission remains disabled until the real menu is confirmed.</p>
            </div>
          </div>
        )}

        <div className="trc-menu-toolbar">
          <label className="trc-menu-search">
            <Search size={19} aria-hidden="true" />
            <span className="trc-visually-hidden">Search the menu</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search for dishes, coffee, pasta..."
              autoComplete="off"
            />
            {query && (
              <button type="button" className="trc-search-clear" onClick={() => setQuery("")} aria-label="Clear search">
                <X size={16} aria-hidden="true"/>
              </button>
            )}
          </label>
          <div className="trc-menu-filters" role="group" aria-label="Filter menu by type">
            {FILTERS.map(({ label, icon: Icon }) => (
              <button
                key={label}
                type="button"
                className={filter === label ? "active" : ""}
                onClick={() => setFilter(label)}
                aria-pressed={filter === label}
              >
                {Icon && <Icon size={17} aria-hidden="true"/>}
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="trc-menu-layout">
          <aside className="trc-menu-sidebar" aria-label="Food categories">
            <nav className="trc-category-list" aria-label="Menu categories">
              <button
                type="button"
                aria-pressed={category === "All"}
                className={category === "All" ? "active" : ""}
                onClick={() => setCategory("All")}
              >
                <span className="trc-cat-icon"><Sparkles size={19} aria-hidden="true" /></span>
                All Categories
              </button>
              {categories.map((name) => {
                const Icon = CATEGORY_ICONS[name] ?? Coffee;
                const available = menu.some((item) => item.category === name);
                return (
                  <button
                    type="button"
                    key={name}
                    aria-pressed={category === name}
                    className={category === name ? "active" : ""}
                    onClick={() => setCategory(name)}
                  >
                    <span className="trc-cat-icon"><Icon size={19} aria-hidden="true" /></span>
                    <span>{name}</span>
                    {!available && <span className="trc-cat-soon" title="Awaiting actual menu">Soon</span>}
                  </button>
                );
              })}
            </nav>
            <aside className="trc-combo-promo">
              <span className="script">Coffee Combos</span>
              <p>Pair your favourite drink with something delicious.</p>
              <button type="button" onClick={() => showCategory("Combos & Offers")}>
                VIEW COMBOS <ArrowRight size={16} aria-hidden="true"/>
              </button>
              <Photo src={PHOTOS.cappuccino} alt="" />
            </aside>
          </aside>

          <div className="trc-menu-results">
            <div className="trc-result-count" role="status" aria-live="polite">
              <span>{matched.length} {matched.length === 1 ? "item" : "items"} shown</span>
              {activeFilters && <button type="button" onClick={resetFilters}>Clear filters</button>}
            </div>
            {sections.length === 0 ? (
              <div className="trc-menu-empty">
                <Search size={35} aria-hidden="true" />
                <h3>No dishes found</h3>
                <p>Try another search, dietary filter or category. More items will be added when the café shares its verified menu.</p>
                <button type="button" className="btn btn-outline" onClick={resetFilters}>SHOW ALL MENU ITEMS</button>
              </div>
            ) : (
              sections.map(({ name, items }) => {
                const Icon = CATEGORY_ICONS[name] ?? Coffee;
                return (
                  <section className="trc-menu-category" key={name} aria-label={name}>
                    <div className="trc-menu-category-heading">
                      <h3><Icon size={21} aria-hidden="true"/> {name}</h3>
                      {category === "All" && (
                        <button type="button" onClick={() => showCategory(name)}>
                          View All <ArrowRight size={16} aria-hidden="true"/>
                        </button>
                      )}
                    </div>
                    <div className="trc-menu-products">
                      {items.map((item) => (
                        <MenuProductCard
                          key={item.id}
                          item={item}
                          onAdd={add}
                          favourite={favourites.includes(item.id)}
                          onFavouriteToggle={toggleFavourite}
                        />
                      ))}
                    </div>
                  </section>
                );
              })
            )}
          </div>
          <MenuCartPreview cart={cart} change={change}/>
        </div>
      </section>

      {itemCount > 0 && (
        <Link href="/cart" className="trc-menu-mobile-cart" aria-label={"View cart with " + itemCount + " items"}>
          <span><ShoppingBag size={21} aria-hidden="true"/> {itemCount} {itemCount === 1 ? "item" : "items"}</span>
          <strong>VIEW CART · ₹{cartSubtotal(menu, cart).toLocaleString("en-IN")}</strong>
          <ArrowRight size={18} aria-hidden="true"/>
        </Link>
      )}
    </div>
  );
}
