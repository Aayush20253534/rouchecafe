/**
 * Reservation requests for a café in Prayagraj.
 * Preferred times do not represent live table availability or confirmed operating hours.
 */
export const CAFE_TIME_ZONE = "Asia/Kolkata";
export const MAX_RESERVATION_GUESTS = 20;

export const RESERVATION_TIMES: readonly string[] = [
  "08:00 AM","08:30 AM","09:00 AM","09:30 AM",
  "10:00 AM","10:30 AM","11:00 AM","11:30 AM",
  "12:00 PM","12:30 PM","01:00 PM","01:30 PM",
  "02:00 PM","02:30 PM","03:00 PM","03:30 PM",
  "04:00 PM","04:30 PM","05:00 PM","05:30 PM",
  "06:00 PM","06:30 PM","07:00 PM","07:30 PM",
  "08:00 PM","08:30 PM","09:00 PM",
];

export const RESERVATION_OCCASIONS: readonly string[] = [
  "Casual Visit","Birthday Celebration","Anniversary",
  "Friends & Family","Business Meeting","Work Session","Special Occasion",
];

export type ReservationDetails = {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  occasion: string;
  notes: string;
};

export const EMPTY_RESERVATION: ReservationDetails = {
  name: "", phone: "", date: "", time: "", guests: 2, occasion: "", notes: "",
};

function cafeParts(now: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: CAFE_TIME_ZONE,
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hourCycle: "h23",
  }).formatToParts(now);
  const value = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  return {
    year: value("year"), month: value("month"), day: value("day"),
    hours: Number(value("hour")), minutes: Number(value("minute")),
  };
}

export function todayAtCafeISO(now: Date = new Date()): string {
  const { year, month, day } = cafeParts(now);
  return [year, month, day].join("-");
}

function timeMinutes(slot: string): number | null {
  const match = /^(0[1-9]|1[0-2]):([0-5]\d) (AM|PM)$/.exec(slot);
  if (!match) return null;
  const hour = Number(match[1]) % 12 + (match[3] === "PM" ? 12 : 0);
  return hour * 60 + Number(match[2]);
}

function isCalendarDate(date: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  const [year, month, day] = date.split("-").map(Number);
  const computed = new Date(Date.UTC(year, month - 1, day));
  return computed.getUTCFullYear() === year &&
    computed.getUTCMonth() === month - 1 && computed.getUTCDate() === day;
}

/** Only filters out already-past times. It cannot check availability. */
export function availablePreferenceSlots(date: string, now: Date = new Date()): string[] {
  if (date === "" || !isCalendarDate(date)) return [...RESERVATION_TIMES];
  const today = todayAtCafeISO(now);
  if (date < today) return [];
  if (date > today) return [...RESERVATION_TIMES];
  const { hours, minutes } = cafeParts(now);
  const currentMinutes = hours * 60 + minutes;
  return RESERVATION_TIMES.filter((slot) => (timeMinutes(slot) ?? -1) > currentMinutes);
}

export function validateReservation(details: ReservationDetails, now: Date = new Date()): string[] {
  const errors: string[] = [];
  if (details.name.trim().length < 2 || details.name.trim().length > 100)
    errors.push("Enter your full name (2–100 characters).");
  const digits = details.phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 15)
    errors.push("Enter a valid phone number (10–15 digits).");
  const today = todayAtCafeISO(now);
  if (!isCalendarDate(details.date) || details.date < today)
    errors.push("Select today or a future date.");
  if (!RESERVATION_TIMES.includes(details.time))
    errors.push("Select a preferred reservation time.");
  else if (isCalendarDate(details.date) && details.date === today &&
    !availablePreferenceSlots(details.date, now).includes(details.time))
    errors.push("Select a future time for today's reservation.");
  if (!Number.isInteger(details.guests) || details.guests < 1 || details.guests > MAX_RESERVATION_GUESTS)
    errors.push("Select between 1 and 20 guests.");
  if (details.occasion.length > 100) errors.push("Keep the occasion within 100 characters.");
  if (details.notes.length > 500) errors.push("Keep special requests within 500 characters.");
  return errors;
}

const clean = (value: string) => value.replace(/\s+/g, " ").trim();

/** Prefilled request: the visitor must still press Send in WhatsApp. */
export function formatReservationRequest(details: ReservationDetails): string {
  return [
    "Hello The Rouché Café, I would like to request a table reservation.",
    "",
    "RESERVATION REQUEST",
    "Name: " + clean(details.name),
    "Phone: " + clean(details.phone),
    "Preferred date: " + details.date,
    "Preferred time (IST): " + details.time,
    "Number of guests: " + details.guests,
    "Occasion: " + (clean(details.occasion) || "Not specified"),
    "Special requests: " + (clean(details.notes) || "None"),
    "",
    "Please confirm table availability and any booking conditions.",
    "I understand this is a request, not a confirmed reservation.",
  ].join("\n");
}
