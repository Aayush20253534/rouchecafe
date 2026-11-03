import type { ReactNode } from "react";
import { ClipboardList, Info } from "lucide-react";
import type { Cart } from "@/types/cart";
import { menu, money } from "@/lib/site";
import { cartEntries, cartItemCount, cartSubtotal } from "@/lib/menu-utils";
import { Photo } from "@/components/ui/CafePrimitives";

type Props = {
  cart: Cart;
  action?: ReactNode;
  showItems?: boolean;
  title?: string;
};

/** Always show subtotal-only amounts until the café supplies real fee rules. */
export function OrderSummary({
  cart, action, showItems = false, title = "Order Summary",
}: Props) {
  const entries = cartEntries(menu, cart);
  const subtotal = cartSubtotal(menu, cart);
  const count = cartItemCount(cart);

  return (
    <aside className="trc-order-summary" aria-label={title}>
      <div className="trc-order-summary-head">
        <ClipboardList size={27} aria-hidden="true"/>
        <h2>{title}</h2>
      </div>
      {showItems && (
        <div className="trc-order-summary-items">
          {entries.map((item) => (
            <div className="trc-order-summary-item" key={item.id}>
              <Photo src={item.image} alt="" />
              <div>
                <strong>{item.name}</strong>
                <small>{money(item.price)} × {cart[item.id]}</small>
              </div>
              <b>{money(item.price * cart[item.id])}</b>
            </div>
          ))}
          {!entries.length && <p>Your cart is empty. Add items from the menu first.</p>}
        </div>
      )}
      <div className="trc-order-summary-prices">
        <div><span>Subtotal ({count} {count === 1 ? "item" : "items"})</span><strong>{money(subtotal)}</strong></div>
        <div><span>Delivery / packing</span><span>To be confirmed</span></div>
        <div className="trc-order-summary-total">
          <strong>Estimated item total</strong><b>{money(subtotal)}</b>
        </div>
      </div>
      {action && <div className="trc-order-summary-action">{action}</div>}
      <p className="trc-order-summary-disclaimer">
        <Info size={18} aria-hidden="true"/>
        No online payment is collected. The café must confirm availability, any additional charges, the final total and order acceptance.
      </p>
    </aside>
  );
}
