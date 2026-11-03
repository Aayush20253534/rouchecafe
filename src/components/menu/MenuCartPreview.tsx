"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Info, MessageCircle, Minus, Plus, ShoppingBag, Trash2, ChevronDown } from "lucide-react";
import type { Cart } from "@/types/cart";
import { CAFE, menu, money } from "@/lib/site";
import { cartEntries, cartItemCount, cartSubtotal } from "@/lib/menu-utils";
import { Photo } from "@/components/ui/CafePrimitives";

export function MenuCartPreview({
  cart, change,
}: {
  cart: Cart;
  change: (id: string, diff: number) => void;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const entries = cartEntries(menu, cart);
  const itemCount = cartItemCount(cart);
  const subtotal = cartSubtotal(menu, cart);

  return (
    <aside className="trc-menu-cart" aria-label="Shopping cart preview">
      <h3>
        <ShoppingBag size={22} aria-hidden="true"/>
        <span>Your Cart ({itemCount})</span>
        <button
          type="button"
          onClick={() => setCollapsed((previous) => !previous)}
          aria-expanded={!collapsed}
          aria-label={collapsed ? "Expand cart preview" : "Collapse cart preview"}
          aria-controls="trc-menu-cart-content"
        >
          <ChevronDown size={20} className={collapsed ? "" : "expanded"} aria-hidden="true" />
        </button>
      </h3>
      {!collapsed && (
        <div id="trc-menu-cart-content" className="trc-menu-cart-content">
          {entries.length === 0 ? (
            <div className="trc-menu-cart-empty">
              <ShoppingBag size={35} aria-hidden="true"/>
              <p>Your cart is empty.</p>
              <small>Add your café favourites to preview your order.</small>
            </div>
          ) : (
            <ul className="trc-mini-cart-list">
              {entries.map((item) => {
                const quantity = cart[item.id];
                return (
                  <li key={item.id}>
                    <Photo src={item.image} alt="" />
                    <div className="trc-mini-cart-description">
                      <strong>{item.name}</strong>
                      <small>{money(item.price)} × {quantity}</small>
                      <div className="trc-mini-cart-controls">
                        <button type="button" onClick={() => change(item.id, -1)} aria-label={"Decrease " + item.name}>
                          <Minus size={13} aria-hidden="true"/>
                        </button>
                        <span>{quantity}</span>
                        <button type="button" onClick={() => change(item.id, 1)} disabled={quantity >= 99} aria-label={"Increase " + item.name}>
                          <Plus size={13} aria-hidden="true"/>
                        </button>
                      </div>
                    </div>
                    <button type="button" className="trc-mini-cart-remove" aria-label={"Remove " + item.name} onClick={() => change(item.id, -quantity)}>
                      <Trash2 size={15} aria-hidden="true"/>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
          <div className="trc-menu-cart-totals">
            <div><span>Subtotal</span><strong>{money(subtotal)}</strong></div>
            <div><span>Delivery / Packing</span><span>To be confirmed</span></div>
            <div className="trc-menu-cart-total"><strong>Estimated Total*</strong><b>{money(subtotal)}</b></div>
          </div>
          <p className="trc-menu-cart-footnote"><Info size={15} aria-hidden="true"/> *Excludes any delivery or packing charges.</p>
          <Link href="/cart" className="trc-menu-cart-cta">
            {itemCount ? "VIEW CART & CHECKOUT" : "VIEW YOUR CART"} <ArrowRight size={17} aria-hidden="true"/>
          </Link>
          <div className="trc-menu-whatsapp-hint">
            <MessageCircle size={26} aria-hidden="true"/>
            <div>
              <strong>Place your order via WhatsApp</strong>
              <p>{CAFE.demoMenu ? "Preview the order flow now. Actual food ordering will open after menu verification." : "Review your items at checkout before sending the order to the café."}</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
