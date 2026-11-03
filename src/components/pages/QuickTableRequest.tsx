"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { waLink } from "@/lib/site";

const TIMES = [
  "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
  "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM",
  "08:00 PM", "08:30 PM", "09:00 PM",
];

function todayLocalISO() {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

export function QuickTableRequest() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("2");

  function requestTable(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || !phone.trim() || !date || !time || Number(guests) < 1) return;
    if (date < todayLocalISO()) return;

    const message = [
      "Hello The Rouché Café, I would like to request a table reservation.",
      "Name: " + name.trim(),
      "Phone: " + phone.trim(),
      "Date: " + date,
      "Time: " + time,
      "Guests: " + guests,
      "Please confirm availability and my reservation.",
    ].join("\n");
    window.open(waLink(message), "_blank", "noopener,noreferrer");
  }

  return (
    <form className="trc-quick-booking-form" onSubmit={requestTable}>
      <label className="trc-visually-hidden" htmlFor="trc-quick-name">Full name</label>
      <input id="trc-quick-name" name="name" autoComplete="name" maxLength={100} placeholder="Full Name" value={name} onChange={(event) => setName(event.target.value)} required />
      <label className="trc-visually-hidden" htmlFor="trc-quick-phone">Phone number</label>
      <input id="trc-quick-phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={20} name="phone" placeholder="Phone Number" value={phone} onChange={(event) => setPhone(event.target.value)} required />
      <label className="trc-visually-hidden" htmlFor="trc-quick-date">Reservation date</label>
      <input id="trc-quick-date" type="date" name="date" min={todayLocalISO()} value={date} onChange={(event) => setDate(event.target.value)} required />
      <label className="trc-visually-hidden" htmlFor="trc-quick-time">Reservation time</label>
      <select id="trc-quick-time" name="time" value={time} onChange={(event) => setTime(event.target.value)} required>
        <option value="">Select Time</option>
        {TIMES.map((slot) => <option key={slot} value={slot}>{slot}</option>)}
      </select>
      <label className="trc-visually-hidden" htmlFor="trc-quick-guests">Number of guests</label>
      <select id="trc-quick-guests" name="guests" value={guests} onChange={(event) => setGuests(event.target.value)} required>
        {Array.from({ length: 15 }, (_, i) => (
          <option value={String(i + 1)} key={i}>{i + 1} {i === 0 ? "Guest" : "Guests"}</option>
        ))}
      </select>
      <button type="submit" className="trc-quick-booking-submit">
        REQUEST A TABLE <ArrowRight size={18} aria-hidden="true"/>
      </button>
      <p className="trc-quick-booking-note">Opens WhatsApp with your details. A booking is confirmed only after the café replies.</p>
    </form>
  );
}
