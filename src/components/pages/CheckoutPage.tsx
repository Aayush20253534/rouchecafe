"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight, CalendarDays, CheckCircle2, ClipboardList,
  Clock3, Info, MapPin, MessageCircle, ShoppingBag, ShoppingCart,
  ShieldCheck, Truck, Users, Leaf, Coffee,
} from "lucide-react";
import { CAFE, menu, PHOTOS, waLink } from "@/lib/site";
import type { Cart } from "@/types/cart";
import {
  EMPTY_CHECKOUT_DETAILS,
  formatWhatsAppOrder,
  ORDER_TIME_SLOTS,
  todayLocalISO,
  validateCheckout,
  type CheckoutDetails,
} from "@/lib/order";
import { cartEntries } from "@/lib/menu-utils";
import { FeatureStrip, Hero } from "@/components/ui/CafePrimitives";
import { OrderSummary } from "@/components/order/OrderSummary";

type Props = { cart: Cart };
type Step = "details" | "review";

const STEP_LABELS = ["Cart", "Details", "Review", "WhatsApp request"] as const;

export function CheckoutPage({ cart }: Props) {
  const [details, setDetails] = useState<CheckoutDetails>({ ...EMPTY_CHECKOUT_DETAILS });
  const [step, setStep] = useState<Step>("details");
  const [errors, setErrors] = useState<string[]>([]);
  const [consent, setConsent] = useState(false);
  const entries = cartEntries(menu, cart);
  const hasItems = entries.length > 0;
  const today = todayLocalISO();
  const validated = hasItems && validateCheckout(details, cart, menu, today).length === 0;
  const message = validated && !CAFE.demoMenu ? formatWhatsAppOrder(details, cart, menu) : null;

  function field<K extends keyof CheckoutDetails>(name: K, value: CheckoutDetails[K]) {
    setDetails((current) => ({ ...current, [name]: value }));
    setErrors([]);
    setConsent(false);
  }

  function submitDetails(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const problems = validateCheckout(details, cart, menu, todayLocalISO());
    if (problems.length > 0) {
      setErrors(problems);
      return;
    }
    setErrors([]);
    setStep("review");
    window.requestAnimationFrame(() => document.getElementById("trc-checkout-review")?.scrollIntoView({ block: "start", behavior: "smooth" }));
  }

  return (
    <div className="trc-checkout-page">
      <Hero
        eyebrow="Checkout"
        title="Complete Your Order"
        description="A few more details and your order request will be ready to send."
        image={PHOTOS.coffee}
      />
      <nav className="trc-checkout-steps page-width" aria-label="Checkout progress">
        {STEP_LABELS.map((label, index) => {
          const current = index === (step === "details" ? 1 : 2);
          const done = index < (step === "details" ? 1 : 2);
          const icons = [ShoppingCart, MapPin, ClipboardList, MessageCircle];
          const Icon = icons[index];
          return (
            <div className={current ? "current" : done ? "done" : ""} key={label}>
              <span><Icon size={26} aria-hidden="true"/>{done && <CheckCircle2 className="trc-checkout-done-icon" size={13} aria-hidden="true"/>}</span>
              <strong aria-current={current ? "step" : undefined}>{label}</strong>
            </div>
          );
        })}
      </nav>

      <div className="page-width trc-checkout-intro">
        {CAFE.demoMenu && (
          <p className="trc-order-demo-note" role="note"><Info size={20} aria-hidden="true"/>
            This is a checkout preview with unverified sample menu prices. You can review an example request, but food-order messages cannot be sent until the final menu is approved.
          </p>
        )}
        {!hasItems && (
          <div className="trc-checkout-no-items" role="status">
            <ShoppingBag size={35} aria-hidden="true"/>
            <p>Your cart is empty. Add something from the menu before checking out.</p>
            <Link href="/menu">EXPLORE MENU <ArrowRight size={17} aria-hidden="true"/></Link>
          </div>
        )}
      </div>

      {hasItems && (
        <div className="trc-checkout-layout page-width" id="trc-checkout-review">
          <div className="trc-checkout-main">
            {step === "details" ? (
              <form id="trc-order-details-form" className="trc-order-form" onSubmit={submitDetails}>
                <section className="trc-order-form-section">
                  <h2><Users size={28} aria-hidden="true"/> Customer Details</h2>
                  <div className="trc-order-form-grid">
                    <label>
                      Full Name <span aria-hidden="true">*</span>
                      <input
                        required autoComplete="name" maxLength={100}
                        name="fullName" value={details.name}
                        onChange={(event) => field("name", event.target.value)}
                        placeholder="Your full name"
                      />
                    </label>
                    <label>
                      Phone Number <span aria-hidden="true">*</span>
                      <input
                        required type="tel" inputMode="tel" autoComplete="tel"
                        minLength={10} maxLength={22} name="phone"
                        value={details.phone} onChange={(event) => field("phone", event.target.value)}
                        placeholder="+91 ..."
                      />
                    </label>
                    <label className="trc-order-form-wide">
                      Email Address (Optional)
                      <input
                        type="email" autoComplete="email" maxLength={150}
                        name="email" value={details.email}
                        onChange={(event) => field("email", event.target.value)}
                        placeholder="you@example.com"
                      />
                    </label>
                  </div>
                </section>

                <section className="trc-order-form-section">
                  <h2><ShoppingBag size={28} aria-hidden="true"/> Order Type</h2>
                  <fieldset className="trc-order-type-options">
                    <legend className="trc-visually-hidden">Order fulfilment</legend>
                    <label className={details.fulfilment === "Pickup" ? "selected" : ""}>
                      <input type="radio" name="fulfilment" value="Pickup" checked={details.fulfilment === "Pickup"} onChange={() => field("fulfilment", "Pickup")} />
                      <ShoppingBag size={31} aria-hidden="true"/>
                      <span><strong>Pickup (Takeaway)</strong><small>I&apos;ll collect my order from the café</small></span>
                      {details.fulfilment === "Pickup" && <CheckCircle2 size={21} className="trc-order-selected" aria-hidden="true"/>}
                    </label>
                    <label className={details.fulfilment === "Delivery" ? "selected" : ""}>
                      <input type="radio" name="fulfilment" value="Delivery" checked={details.fulfilment === "Delivery"} onChange={() => field("fulfilment", "Delivery")} />
                      <Truck size={31} aria-hidden="true"/>
                      <span><strong>Home Delivery</strong><small>Availability and charges confirmed by café</small></span>
                      {details.fulfilment === "Delivery" && <CheckCircle2 size={21} className="trc-order-selected" aria-hidden="true"/>}
                    </label>
                  </fieldset>
                  {details.fulfilment === "Delivery" && (
                    <label className="trc-order-address">
                      Delivery Address <span aria-hidden="true">*</span>
                      <textarea
                        required minLength={10} maxLength={350} name="address"
                        rows={3} value={details.address}
                        onChange={(event) => field("address", event.target.value)}
                        placeholder="House or flat, street, landmark, locality, city and PIN code"
                      />
                      <small>Delivery is a request, not a guarantee of service to your address.</small>
                    </label>
                  )}
                </section>

                <section className="trc-order-form-section">
                  <h2><Clock3 size={28} aria-hidden="true"/> Preferred {details.fulfilment === "Pickup" ? "Pickup" : "Delivery"} Time</h2>
                  <div className="trc-order-form-grid">
                    <label>
                      Date <span aria-hidden="true">*</span>
                      <input
                        required type="date" min={today} name="date"
                        value={details.date} onChange={(event) => field("date", event.target.value)}
                      />
                    </label>
                    <label>
                      Time <span aria-hidden="true">*</span>
                      <select required name="time" value={details.time} onChange={(event) => field("time", event.target.value)}>
                        <option value="">Select preferred time</option>
                        {ORDER_TIME_SLOTS.map((slot) => <option value={slot} key={slot}>{slot}</option>)}
                      </select>
                    </label>
                  </div>
                  <p className="trc-order-help">Times are preferences only. The café will confirm operating hours and availability.</p>
                </section>

                <section className="trc-order-form-section">
                  <h2><MessageCircle size={28} aria-hidden="true"/> Special Instructions <span className="trc-order-optional">(Optional)</span></h2>
                  <label className="trc-visually-hidden" htmlFor="trc-order-notes">Order instructions</label>
                  <textarea
                    id="trc-order-notes" rows={4} maxLength={600} name="notes"
                    value={details.notes} onChange={(event) => field("notes", event.target.value)}
                    placeholder="Any dietary preferences or other requests..."
                  />
                </section>

                {errors.length > 0 && (
                  <div role="alert" className="trc-order-errors">
                    <strong>Please correct these details:</strong>
                    <ul>{errors.map((error) => <li key={error}>{error}</li>)}</ul>
                  </div>
                )}
                <div className="trc-checkout-form-actions">
                  <Link href="/cart"><ArrowLeft size={17} aria-hidden="true"/> BACK TO CART</Link>
                  <button type="submit" className="trc-checkout-next">REVIEW ORDER <ArrowRight size={18} aria-hidden="true"/></button>
                </div>
              </form>
            ) : (
              <section className="trc-order-review" aria-labelledby="trc-order-review-title">
                <div className="trc-order-review-heading">
                  <h2 id="trc-order-review-title"><ClipboardList size={31} aria-hidden="true"/> Review Your Request</h2>
                  <button type="button" onClick={() => { setStep("details"); setConsent(false); }}>EDIT DETAILS</button>
                </div>
                <p>Check everything before opening WhatsApp. The café will confirm availability, charges, and acceptance.</p>
                <dl className="trc-order-review-data">
                  <div><dt>Customer</dt><dd>{details.name}</dd></div>
                  <div><dt>Phone</dt><dd>{details.phone}</dd></div>
                  {details.email && <div><dt>Email</dt><dd>{details.email}</dd></div>}
                  <div><dt>Order type</dt><dd>{details.fulfilment === "Pickup" ? "Pickup (Takeaway)" : "Home Delivery"}</dd></div>
                  <div><dt>Preferred date</dt><dd>{details.date}</dd></div>
                  <div><dt>Preferred time</dt><dd>{details.time}</dd></div>
                  {details.fulfilment === "Delivery" && <div className="trc-order-review-full"><dt>Delivery address</dt><dd>{details.address}</dd></div>}
                  {details.notes && <div className="trc-order-review-full"><dt>Instructions</dt><dd>{details.notes}</dd></div>}
                </dl>
                <label className="trc-order-consent">
                  <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} />
                  <span>I understand this is an order request, not a confirmed booking, payment, or accepted food order.</span>
                </label>
                {CAFE.demoMenu ? (
                  <div role="note" className="trc-order-preview-blocked">
                    <Info size={21} aria-hidden="true"/>
                    WhatsApp food-order submission is disabled while sample menu prices are shown.
                  </div>
                ) : message && consent ? (
                  <a
                    className="trc-checkout-send"
                    href={waLink(message)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle size={21} aria-hidden="true"/> OPEN WHATSAPP ORDER REQUEST <ArrowRight size={19} aria-hidden="true"/>
                  </a>
                ) : (
                  <button type="button" disabled className="trc-checkout-send">
                    <MessageCircle size={21} aria-hidden="true"/> {consent ? "REVIEW DETAILS AGAIN" : "CONFIRM ABOVE TO CONTINUE"}
                  </button>
                )}
                <p className="trc-order-help">After WhatsApp opens, press Send to contact the café. Returning to this website does not mean your request has been received.</p>
                <button type="button" className="trc-order-back" onClick={() => { setStep("details"); setConsent(false); }}>
                  <ArrowLeft size={16} aria-hidden="true"/> BACK TO DETAILS
                </button>
              </section>
            )}
          </div>
          <OrderSummary cart={cart} showItems title={step === "review" ? "Review Item Totals" : "Order Summary"} />
        </div>
      )}

      <FeatureStrip features={[
        { icon: <Truck/>, title: "CONVENIENT", desc: "Pickup and delivery requests" },
        { icon: <ShieldCheck/>, title: "NO ONLINE PAYMENT", desc: "Confirm with café directly" },
        { icon: <Leaf/>, title: "QUALITY INGREDIENTS", desc: "Food prepared with care" },
        { icon: <Coffee/>, title: "SERVED WITH LOVE", desc: "A warm café experience" },
      ]}/>
    </div>
  );
}
