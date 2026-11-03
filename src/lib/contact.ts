export const CONTACT_SUBJECTS = [
  "General Enquiry", "Table Reservation", "Order Enquiry",
  "Private Event", "Feedback", "Other",
] as const;

export type ContactSubject = (typeof CONTACT_SUBJECTS)[number];

export type ContactDetails = {
  name: string;
  phone: string;
  email: string;
  subject: ContactSubject;
  message: string;
};

export const EMPTY_CONTACT: ContactDetails = {
  name: "", phone: "", email: "", subject: "General Enquiry", message: "",
};

export function validateContact(details: ContactDetails): string[] {
  const errors: string[] = [];
  if (details.name.trim().length < 2 || details.name.trim().length > 100)
    errors.push("Enter a name between 2 and 100 characters.");
  const digits = details.phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 15)
    errors.push("Enter a valid phone number (10–15 digits).");
  if (details.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email.trim()))
    errors.push("Enter a valid email address or leave it blank.");
  if (!(CONTACT_SUBJECTS as readonly string[]).includes(details.subject))
    errors.push("Select a valid enquiry subject.");
  if (details.message.trim().length < 8 || details.message.trim().length > 1200)
    errors.push("Enter a message between 8 and 1,200 characters.");
  return errors;
}

const clean = (text: string) => text.replace(/\s+/g, " ").trim();

/** Generates a WhatsApp draft, never claims the message was sent. */
export function formatContactRequest(details: ContactDetails): string {
  return [
    "Hello The Rouché Café, I have an enquiry.",
    "",
    "CONTACT REQUEST",
    "Name: " + clean(details.name),
    "Phone: " + clean(details.phone),
    "Email: " + (clean(details.email) || "Not provided"),
    "Subject: " + details.subject,
    "Message: " + clean(details.message),
    "",
    "Please get back to me when convenient.",
  ].join("\n");
}

/** Only allow embed URLs obtained from Google Maps, never an arbitrary iframe. */
export function validatedMapsEmbedUrl(raw: string | undefined): string | null {
  if (!raw) return null;
  try {
    const url = new URL(raw);
    if (url.protocol !== "https:") return null;
    if (url.hostname !== "www.google.com" && url.hostname !== "google.com") return null;
    if (!url.pathname.startsWith("/maps/embed")) return null;
    return url.toString();
  } catch {
    return null;
  }
}
