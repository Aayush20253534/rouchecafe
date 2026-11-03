"use client";

import Link from "next/link";
import {
  ArrowLeft, ArrowRight, Coffee, Heart, Leaf, Minus, PackageCheck,
  Plus, ShoppingBag, ShoppingCart, Trash2, Truck, Info,
} from "lucide-react";
import type { Cart } from "@/types/cart";
import { CAFE, menu, money, PHOTOS } from "@/lib/site";
import { cartEntries, cartItemCount } from "@/lib/menu-utils";
import { ButtonLink, FeatureStrip, Hero, Photo } from "@/components/ui/CafePrimitives";
import { CoffeeBeanRule } from "@/components/ui/CafeDecorations";
import { OrderSummary } from "@/components/order/OrderSummary";

type Props = {
  cart: Cart;
  change: (id: string, delta: number) => void;
  clear: () => void;
  add: (id: string) => void;
};

const RELATED_IDS = ["burger", "fries", "brownie", "cold-brew"];

export function CartPage({ cart, change, clear, add }: Props) {
  const entries = cartEntries(menu, cart);
  const count = cartItemCount(cart);
  const recommendations = RELATED_IDS.map((id) => menu.find((item) => item.id === id))
    .filter((item): item is (typeof menu)[number] => Boolean(item));

  return (
    <div className="trc-cart-page">
      <Hero
        eyebrow="Your Order"
        title="My Cart"
        description="Review your items, update quantities, and proceed to request your order."
        image={PHOTOS.coffee}
      />
      <section className="page-width trc-cart-section" aria-label="Shopping cart">
        {CAFE.demoMenu && (
          <p className="trc-order-demo-note" role="note">
            <Info size={19} aria-hidden="true"/>
            This cart uses illustrative food items and prices. WhatsApp food ordering is disabled until the café approves its actual menu.
          </p>
        )}
        <div className="trc-cart-layout">
          <div className="trc-cart-main">
            <div className="trc-cart-titlebar">
              <h2><ShoppingCart size={33} aria-hidden="true"/> Your Cart <span>({count} {count === 1 ? "item" : "items"})</span></h2>
              {entries.length > 0 && (
                <button type="button" className="trc-cart-clear" onClick={clear}>
                  <Trash2 size={17} aria-hidden="true"/> Clear Cart
                </button>
              )}
            </div>
            {entries.length === 0 ? (
              <div className="trc-cart-empty">
                <ShoppingBag size={52} aria-hidden="true"/>
                <h3>Your bag is waiting for something delicious</h3>
                <p>Explore the menu to preview your café order.</p>
                <ButtonLink href="/menu">EXPLORE MENU <ArrowRight size={18}/></ButtonLink>
              </div>
            ) : (
              <div className="trc-cart-items">
                {entries.map((item) => (
                  <article className="trc-cart-item" key={item.id}>
                    <Photo src={item.image} alt={item.name} />
                    <div className="trc-cart-item-copy">
                      <h3>{item.name}</h3>
                      <p>{item.description}</p>
                      <strong>{money(item.price)} each</strong>
                    </div>
                    <div className="trc-cart-item-controls">
                      <button type="button" onClick={() => change(item.id, -1)} aria-label={"Decrease " + item.name}>
                        <Minus size={18} aria-hidden="true"/>
                      </button>
                      <output aria-label={"Quantity: " + cart[item.id]}>{cart[item.id]}</output>
                      <button type="button" onClick={() => change(item.id, 1)} disabled={cart[item.id] >= 99} aria-label={"Increase " + item.name}>
                        <Plus size={18} aria-hidden="true"/>
                      </button>
                    </div>
                    <b className="trc-cart-item-total">{money(item.price * cart[item.id])}</b>
                    <button type="button" className="trc-cart-remove" aria-label={"Remove " + item.name} onClick={() => change(item.id, -cart[item.id])}>
                      <Trash2 size={20} aria-hidden="true"/>
                    </button>
                  </article>
                ))}
              </div>
            )}
            <Link href="/menu" className="trc-cart-continue"><ArrowLeft size={19} aria-hidden="true"/> Continue Shopping</Link>
          </div>
          <OrderSummary
            cart={cart}
            action={
              <Link className="trc-order-summary-cta" href={count > 0 ? "/checkout" : "/menu"}>
                {count > 0 ? "PROCEED TO CHECKOUT" : "EXPLORE MENU"}
                <ArrowRight size={19} aria-hidden="true"/>
              </Link>
            }
          />
        </div>
      </section>

      <section className="page-width trc-cart-related" aria-labelledby="trc-cart-related-heading">
        <CoffeeBeanRule/>
        <h2 id="trc-cart-related-heading">You May Also Like</h2>
        <div className="trc-cart-related-grid">
          {recommendations.map((item) => (
            <article key={item.id}>
              <div className="trc-cart-related-image"><Photo src={item.image} alt={item.name}/><Heart size={23} aria-hidden="true"/></div>
              <div className="trc-cart-related-copy">
                <h3>{item.name}</h3>
                <strong>{money(item.price)}</strong>
                <button type="button" onClick={() => add(item.id)}><Plus size={18} aria-hidden="true"/> Add to Cart</button>
              </div>
            </article>
          ))}
        </div>
      </section>
      <FeatureStrip features={[
        { icon: <Truck/>, title: "ORDER ENQUIRY", desc: "Confirmation via WhatsApp" },
        { icon: <PackageCheck/>, title: "FRESHLY PREPARED", desc: "Food made with care" },
        { icon: <Leaf/>, title: "QUALITY INGREDIENTS", desc: "Thoughtfully selected" },
        { icon: <Coffee/>, title: "COFFEE & MORE", desc: "Café favourites" },
      ]}/>
    </div>
  );
}
