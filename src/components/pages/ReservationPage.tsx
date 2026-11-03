"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight, Armchair, CalendarDays, CakeSlice, CheckCircle2,
  Clock3, Coffee, Gift, Info, MapPin, MessageCircle, Users, UtensilsCrossed,
} from "lucide-react";
import { CAFE, PHOTOS, waLink } from "@/lib/site";
import { Hero, Photo } from "@/components/ui/CafePrimitives";
import { BotanicalSprig, CoffeeBeanRule } from "@/components/ui/CafeDecorations";
import {
  availablePreferenceSlots, EMPTY_RESERVATION, formatReservationRequest,
  MAX_RESERVATION_GUESTS, RESERVATION_OCCASIONS, todayAtCafeISO,
  validateReservation, type ReservationDetails,
} from "@/lib/reservations";

const moments = [
  { icon: CakeSlice, text: "Birthday Celebrations" },
  { icon: Users, text: "Meetups & Hangouts" },
  { icon: Coffee, text: "Work Sessions" },
  { icon: Gift, text: "Special Occasions" },
];

export function ReservationPage() {
  const [details, setDetails] = useState<ReservationDetails>({ ...EMPTY_RESERVATION });
  const [errors, setErrors] = useState<string[]>([]);
  const [review, setReview] = useState(false);
  const today = todayAtCafeISO();

  function field<K extends keyof ReservationDetails>(name: K, value: ReservationDetails[K]) {
    setDetails((current) => ({ ...current, [name]: value }));
    setErrors([]);
    setReview(false);
  }

  function changeDate(value: string) {
    setDetails((current) => ({ ...current, date: value, time: "" }));
    setReview(false);
    setErrors([]);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = validateReservation(details);
    setErrors(result);
    setReview(result.length === 0);
  }

  const times = availablePreferenceSlots(details.date);
  const validReview = review && validateReservation(details).length === 0;

  return (
    <div className="trc-reservation-page">
      <div className="trc-reservation-hero-wrap">
        <BotanicalSprig className="trc-botanical trc-reservation-hero-sprig" />
        <Hero
          eyebrow="Reserve Your Table"
          title="Book My Table"
          description="Planning a casual meetup, work session, birthday celebration or a special evening? Request your table at The Rouché Café."
          image={PHOTOS.interior}
        >
          <div className="trc-reservation-hero-features">
            <div><CalendarDays size={29} aria-hidden="true"/><strong>Quick & Easy</strong><small>Booking request</small></div>
            <div><Clock3 size={29} aria-hidden="true"/><strong>Staff Confirmation</strong><small>Subject to availability</small></div>
            <div><MessageCircle size={29} aria-hidden="true"/><strong>Via WhatsApp</strong><small>Direct café contact</small></div>
          </div>
        </Hero>
      </div>

      <section className="page-width trc-reservation-layout" aria-labelledby="trc-reservation-title">
        <div className="trc-reservation-media">
          <Photo src={PHOTOS.interior2} alt="A warm and welcoming café dining area"/>
          <div className="trc-reservation-occasions">
            <span className="script">Perfect For</span>
            <div>
              {moments.map(({ icon: Icon, text }) => (
                <div key={text}><Icon size={28} aria-hidden="true"/><span>{text}</span></div>
              ))}
            </div>
          </div>
        </div>

        <div className="trc-reservation-card">
          <div className="trc-reservation-card-heading">
            <span>TABLE BOOKING</span>
            <h2 id="trc-reservation-title">Reserve Your Table</h2>
            <p>Enter your details and prepare a WhatsApp reservation request. The café will confirm availability directly.</p>
          </div>

          {!review ? (
            <form className="trc-reservation-form" onSubmit={handleSubmit}>
              <div className="trc-reservation-fields">
                <label>Full Name *
                  <input required type="text" autoComplete="name" minLength={2} maxLength={100}
                    placeholder="Your full name" value={details.name}
                    onChange={(event) => field("name", event.target.value)}/>
                </label>
                <label>Phone Number *
                  <input required type="tel" inputMode="tel" autoComplete="tel" maxLength={22}
                    placeholder="+91 ..." value={details.phone}
                    onChange={(event) => field("phone", event.target.value)}/>
                </label>
                <label>Date *
                  <input required type="date" min={today} value={details.date}
                    onChange={(event) => changeDate(event.target.value)}/>
                </label>
                <label>Preferred Time *
                  <select required value={details.time} onChange={(event) => field("time", event.target.value)}>
                    <option value="">Select preferred time</option>
                    {times.map((time) => <option value={time} key={time}>{time}</option>)}
                  </select>
                </label>
                <label className="trc-reservation-wide">Number of Guests *
                  <select required value={details.guests} onChange={(event) => field("guests", Number(event.target.value))}>
                    {Array.from({ length: MAX_RESERVATION_GUESTS }, (_, i) =>
                      <option value={i+1} key={i}>{i+1} {i === 0 ? "Guest" : "Guests"}</option>
                    )}
                  </select>
                </label>
                <label className="trc-reservation-wide">Occasion (Optional)
                  <select value={details.occasion} onChange={(event) => field("occasion", event.target.value)}>
                    <option value="">Select occasion</option>
                    {RESERVATION_OCCASIONS.map((occasion) =>
                      <option key={occasion} value={occasion}>{occasion}</option>
                    )}
                  </select>
                </label>
                <label className="trc-reservation-wide">Special Requests (Optional)
                  <textarea rows={4} maxLength={500} value={details.notes}
                    onChange={(event) => field("notes", event.target.value)}
                    placeholder="Birthday setup, seating preferences, etc."/>
                </label>
              </div>

              <p className="trc-reservation-explainer">
                <Info size={16} aria-hidden="true"/>
                Preferred times are shown in IST. They are not checked against live table availability or confirmed opening hours.
              </p>
              {errors.length > 0 && (
                <div role="alert" className="trc-reservation-errors">
                  <strong>Please correct these details:</strong>
                  <ul>{errors.map((error) => <li key={error}>{error}</li>)}</ul>
                </div>
              )}
              <button type="submit" className="trc-reservation-cta">
                <MessageCircle size={19} aria-hidden="true"/>
                REVIEW WHATSAPP REQUEST <ArrowRight size={18} aria-hidden="true"/>
              </button>
              <p className="trc-reservation-disclaimer">
                <Info size={16} aria-hidden="true"/>
                This is a request only. The café confirms any booking directly over WhatsApp.
              </p>
            </form>
          ) : (
            <section className="trc-reservation-review" aria-label="Review reservation request">
              <h3><CheckCircle2 size={25} aria-hidden="true"/> Review Your Request</h3>
              <p>Confirm the details before opening a prefilled WhatsApp message.</p>
              <dl>
                <div><dt>Name</dt><dd>{details.name}</dd></div>
                <div><dt>Phone</dt><dd>{details.phone}</dd></div>
                <div><dt>Date</dt><dd>{details.date}</dd></div>
                <div><dt>Time (IST)</dt><dd>{details.time}</dd></div>
                <div><dt>Guests</dt><dd>{details.guests}</dd></div>
                <div><dt>Occasion</dt><dd>{details.occasion || "Not specified"}</dd></div>
                {details.notes && <div className="trc-reservation-wide"><dt>Special Requests</dt><dd>{details.notes}</dd></div>}
              </dl>
              {validReview ? (
                <a className="trc-reservation-cta"
                  href={waLink(formatReservationRequest(details))}
                  target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={19} aria-hidden="true"/>
                  OPEN WHATSAPP REQUEST <ArrowRight size={18} aria-hidden="true"/>
                </a>
              ) : (
                <div className="trc-reservation-errors" role="alert">The date or time has passed. Edit your request.</div>
              )}
              <button type="button" className="trc-reservation-edit" onClick={() => { setReview(false); setErrors([]); }}>
                <ArrowLeft size={16} aria-hidden="true"/> EDIT DETAILS
              </button>
              <p className="trc-reservation-disclaimer">
                <Info size={16} aria-hidden="true"/>
                WhatsApp opens a draft. You must press Send, then await confirmation by café staff.
              </p>
            </section>
          )}
        </div>
      </section>

      <section className="page-width trc-reservation-benefits" aria-label="Why visit The Rouché Café">
        <div><Armchair size={29} aria-hidden="true"/><span>Cozy & Aesthetic Ambience</span></div>
        <div><UtensilsCrossed size={29} aria-hidden="true"/><span>Delicious Food & Beverages</span></div>
        <div><Users size={29} aria-hidden="true"/><span>Great for Groups & Events</span></div>
        <div><MapPin size={29} aria-hidden="true"/><span>{CAFE.location}</span></div>
      </section>

      <section className="page-width trc-reservation-celebrate" aria-label="Special moments at the café">
        <Photo src={PHOTOS.coffee} alt="Artisan coffee"/>
        <div>
          <CoffeeBeanRule/>
          <span className="script">Celebrate Your Special Moments at The Rouché Café</span>
          <p>From birthdays to small gatherings, we make every occasion a little more special.</p>
          <Link href="/contact">CONTACT THE CAFÉ <ArrowRight size={16} aria-hidden="true"/></Link>
        </div>
        <BotanicalSprig className="trc-botanical trc-reservation-decor"/>
      </section>
    </div>
  );
}
