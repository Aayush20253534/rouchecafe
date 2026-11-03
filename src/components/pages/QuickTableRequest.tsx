"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Info, MessageCircle } from "lucide-react";
import { waLink } from "@/lib/site";
import {
  availablePreferenceSlots, EMPTY_RESERVATION, formatReservationRequest,
  MAX_RESERVATION_GUESTS, todayAtCafeISO, validateReservation,
  type ReservationDetails,
} from "@/lib/reservations";

/** Compact homepage form, sharing the same rules and WhatsApp request as /reservation. */
export function QuickTableRequest() {
  const [details, setDetails] = useState<ReservationDetails>({ ...EMPTY_RESERVATION });
  const [errors, setErrors] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  function field<K extends keyof ReservationDetails>(key: K, value: ReservationDetails[K]) {
    setDetails((prev) => ({ ...prev, [key]: value }));
    setErrors([]);
    setReady(false);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validateReservation(details);
    setErrors(found);
    setReady(found.length === 0);
  }

  const validReady = ready && validateReservation(details).length === 0;
  const date = todayAtCafeISO();

  return (
    <form className="trc-quick-booking-form" onSubmit={submit}>
      <label className="trc-visually-hidden" htmlFor="trc-quick-name">Full name</label>
      <input id="trc-quick-name" required minLength={2} maxLength={100} autoComplete="name"
        value={details.name} onChange={(event) => field("name", event.target.value)}
        placeholder="Full Name"/>

      <label className="trc-visually-hidden" htmlFor="trc-quick-phone">Phone number</label>
      <input id="trc-quick-phone" required type="tel" inputMode="tel" autoComplete="tel" maxLength={22}
        value={details.phone} onChange={(event) => field("phone", event.target.value)}
        placeholder="Phone Number"/>

      <label className="trc-visually-hidden" htmlFor="trc-quick-date">Preferred date</label>
      <input id="trc-quick-date" required type="date" min={date}
        value={details.date}
        onChange={(event) => {
          setDetails((current) => ({ ...current, date: event.target.value, time: "" }));
          setErrors([]); setReady(false);
        }}/>

      <label className="trc-visually-hidden" htmlFor="trc-quick-time">Preferred time</label>
      <select id="trc-quick-time" required value={details.time}
        onChange={(event) => field("time", event.target.value)}>
        <option value="">Preferred Time</option>
        {availablePreferenceSlots(details.date).map((slot) =>
          <option key={slot} value={slot}>{slot}</option>
        )}
      </select>

      <label className="trc-visually-hidden" htmlFor="trc-quick-guests">Number of guests</label>
      <select id="trc-quick-guests" required value={details.guests}
        onChange={(event) => field("guests", Number(event.target.value))}>
        {Array.from({ length: MAX_RESERVATION_GUESTS }, (_, i) =>
          <option key={i} value={i + 1}>{i + 1} {i === 0 ? "Guest" : "Guests"}</option>
        )}
      </select>

      <button type="submit" className="trc-quick-booking-submit">
        REVIEW REQUEST <ArrowRight size={18} aria-hidden="true"/>
      </button>

      {errors.length > 0 && (
        <div className="trc-quick-booking-errors" role="alert">
          <ul>{errors.map((error) => <li key={error}>{error}</li>)}</ul>
        </div>
      )}
      {validReady && (
        <a className="trc-quick-whatsapp-link"
          href={waLink(formatReservationRequest(details))}
          target="_blank" rel="noopener noreferrer">
          <MessageCircle size={18} aria-hidden="true"/>
          OPEN WHATSAPP REQUEST <ArrowRight size={17} aria-hidden="true"/>
        </a>
      )}
      <p className="trc-quick-booking-note">
        <Info size={14} aria-hidden="true"/>
        Preferred time only. Press Send in WhatsApp and await café confirmation.
      </p>
    </form>
  );
}
