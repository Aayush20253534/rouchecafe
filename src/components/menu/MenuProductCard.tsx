"use client";

import { useState } from "react";
import { Heart, Minus, Plus, ShoppingBag, Sparkles } from "lucide-react";
import type { MenuItem } from "@/data/menu";
import { money } from "@/lib/site";
import { Photo } from "@/components/ui/CafePrimitives";

type Props = {
  item: MenuItem;
  favourite: boolean;
  onFavouriteToggle: (id: string) => void;
  onAdd: (id: string, quantity?: number) => void;
};

export function MenuProductCard({ item, favourite, onFavouriteToggle, onAdd }: Props) {
  const [quantity, setQuantity] = useState(1);

  return (
    <article className="trc-product-card">
      <div className="trc-product-photo">
        <Photo src={item.image} alt={item.name} />
        <button
          type="button"
          className={favourite ? "trc-product-heart active" : "trc-product-heart"}
          aria-label={(favourite ? "Remove " : "Add ") + item.name + (favourite ? " from" : " to") + " favourites"}
          aria-pressed={favourite}
          onClick={() => onFavouriteToggle(item.id)}
        >
          <Heart size={20} fill={favourite ? "currentColor" : "none"} aria-hidden="true"/>
        </button>
        {item.bestseller && (
          <span className="trc-product-bestseller"><Sparkles size={12} aria-hidden="true"/> Popular</span>
        )}
      </div>
      <div className="trc-product-info">
        <div className="trc-product-title">
          <h4>{item.name}</h4>
          <span className={item.veg ? "trc-diet trc-diet-veg" : "trc-diet trc-diet-nonveg"} title={item.veg ? "Vegetarian" : "Non-vegetarian"} aria-label={item.veg ? "Vegetarian" : "Non-vegetarian"}/>
        </div>
        <p>{item.description}</p>
        <strong className="trc-product-price">{money(item.price)}</strong>
        <div className="trc-product-controls">
          <div className="trc-product-quantity" aria-label={"Quantity for " + item.name}>
            <button
              type="button"
              disabled={quantity <= 1}
              onClick={() => setQuantity((previous) => Math.max(1, previous - 1))}
              aria-label={"Decrease " + item.name + " quantity"}
            >
              <Minus size={15} aria-hidden="true"/>
            </button>
            <output aria-label={"Selected quantity: " + quantity}>{quantity}</output>
            <button
              type="button"
              disabled={quantity >= 99}
              onClick={() => setQuantity((previous) => Math.min(99, previous + 1))}
              aria-label={"Increase " + item.name + " quantity"}
            >
              <Plus size={15} aria-hidden="true"/>
            </button>
          </div>
          <button type="button" className="trc-product-add" onClick={() => onAdd(item.id, quantity)}>
            <ShoppingBag size={15} aria-hidden="true"/>
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
