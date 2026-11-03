"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight, Armchair, CheckCircle2, Clock3, Info,
  Mail, MapPin, MessageCircle, Phone, Send, Users,
} from "lucide-react";
import { CAFE, PHOTOS, waLink } from "@/lib/site";
import {
  CONTACT_SUBJECTS, EMPTY_CONTACT,
  formatContactRequest, validateContact, validatedMapsEmbedUrl,
  type ContactDetails,
} from "@/lib/contact";
import { VERIFIED_SOCIAL_PROFILES } from "@/lib/social";
import { Hero, Photo } from "@/components/ui/CafePrimitives";
import { BotanicalSprig, CoffeeBeanRule } from "@/components/ui/CafeDecorations";

const mapsEmbed = validatedMapsEmbedUrl(process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL);

export function ContactPage() {
  const [details, setDetails] = useState<ContactDetails>({ ...EMPTY_CONTACT });
  const [errors, setErrors] = useState<string[]>([]);
  const [reviewing, setReviewing] = useState(false);

  function updateField<K extends keyof ContactDetails>(name: K, value: ContactDetails[K]) {
    setDetails((current) => ({ ...current, [name]: value }));
    setErrors([]);
    setReviewing(false);
  }

  function prepareWhatsApp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const problems = validateContact(details);
    setErrors(problems);
    if (!problems.length) setReviewing(true);
  }

  const reviewValid = reviewing && validateContact(details).length === 0;

  return (
    <div className="trc-contact-page">
      <div className="trc-contact-hero-wrap">
        <BotanicalSprig className="trc-botanical trc-contact-hero-sprig"/>
        <Hero
          eyebrow="Get in Touch"
          title="Contact Us"
          description="We'd love to hear from you. Whether it's a reservation, an order enquiry, a celebration or a general question, our team is here to help."
          image={PHOTOS.cappuccino}
        >
          <a href={waLink("Hello The Rouché Café, I would like to get in touch.")}
            target="_blank" rel="noopener noreferrer" className="btn btn-green">
            <MessageCircle size={18} aria-hidden="true"/> CHAT ON WHATSAPP
          </a>
          <Link className="btn btn-outline" href="/reservation">
            <Armchair size={18} aria-hidden="true"/> BOOK A TABLE
          </Link>
        </Hero>
      </div>

      <section className="page-width trc-contact-info" aria-label="Café contact information">
        <div><MapPin size={36} aria-hidden="true"/><span><strong>Visit Us</strong><small>{CAFE.location}</small></span></div>
        <div><Phone size={36} aria-hidden="true"/><span><strong>Call Us</strong><a href={"tel:+" + CAFE.whatsapp}>{CAFE.displayPhone}</a></span></div>
        <div><MessageCircle size={36} aria-hidden="true"/><span><strong>WhatsApp</strong><a href={waLink("Hello The Rouché Café.")} target="_blank" rel="noopener noreferrer">Chat with our team</a></span></div>
        <div><Clock3 size={36} aria-hidden="true"/><span><strong>Opening Hours</strong><small>Confirm with café before visiting</small></span></div>
      </section>

      <section className="page-width trc-contact-main" aria-labelledby="trc-contact-form-title">
        <div className="trc-contact-image">
          <Photo src={PHOTOS.cafe} alt="Illustrative warm café interior"/>
          <span>More photos will be added after the café shares its official collection.</span>
        </div>

        <div className="trc-contact-form-card">
          <header>
            <span className="trc-contact-eyebrow">SEND US A MESSAGE</span>
            <h2 id="trc-contact-form-title">Have a Question or Request?</h2>
            <CoffeeBeanRule/>
            <p>Enter your details and send your enquiry directly through WhatsApp.</p>
          </header>

          {!reviewing ? (
            <form className="trc-contact-form" onSubmit={prepareWhatsApp}>
              <div className="trc-contact-form-grid">
                <label>Full Name *
                  <input required minLength={2} maxLength={100} autoComplete="name"
                    placeholder="Your full name" value={details.name}
                    onChange={(event) => updateField("name", event.target.value)}/>
                </label>
                <label>Phone Number *
                  <input type="tel" inputMode="tel" required maxLength={22} autoComplete="tel"
                    placeholder="+91 ..." value={details.phone}
                    onChange={(event) => updateField("phone", event.target.value)}/>
                </label>
                <label className="trc-contact-wide">Email Address (Optional)
                  <input type="email" maxLength={150} autoComplete="email"
                    placeholder="you@example.com" value={details.email}
                    onChange={(event) => updateField("email", event.target.value)}/>
                </label>
                <label className="trc-contact-wide">Subject *
                  <select required value={details.subject}
                    onChange={(event) => updateField("subject", event.target.value as ContactDetails["subject"])}>
                    {CONTACT_SUBJECTS.map((subject) => <option value={subject} key={subject}>{subject}</option>)}
                  </select>
                </label>
                <label className="trc-contact-wide">Your Message *
                  <textarea required minLength={8} maxLength={1200} rows={5}
                    value={details.message} placeholder="How can we help?"
                    onChange={(event) => updateField("message", event.target.value)}/>
                </label>
              </div>
              {errors.length > 0 && (
                <div role="alert" className="trc-contact-errors">
                  <strong>Please correct these details:</strong>
                  <ul>{errors.map((error) => <li key={error}>{error}</li>)}</ul>
                </div>
              )}
              <button type="submit" className="trc-contact-submit">
                <Send size={18} aria-hidden="true"/> REVIEW WHATSAPP MESSAGE <ArrowRight size={18} aria-hidden="true"/>
              </button>
              <p className="trc-contact-note">
                <Info size={15} aria-hidden="true"/>
                No message is sent from this website. The next step opens WhatsApp.
              </p>
            </form>
          ) : (
            <section className="trc-contact-review" aria-label="Review enquiry">
              <h3><CheckCircle2 size={25} aria-hidden="true"/> Review Your Enquiry</h3>
              <p>Your message will be prepared for WhatsApp with the following details.</p>
              <dl>
                <div><dt>Name</dt><dd>{details.name}</dd></div>
                <div><dt>Phone</dt><dd>{details.phone}</dd></div>
                {details.email && <div><dt>Email</dt><dd>{details.email}</dd></div>}
                <div><dt>Subject</dt><dd>{details.subject}</dd></div>
                <div className="trc-contact-wide"><dt>Message</dt><dd>{details.message}</dd></div>
              </dl>
              {reviewValid && (
                <a href={waLink(formatContactRequest(details))}
                  target="_blank" rel="noopener noreferrer" className="trc-contact-submit">
                  <MessageCircle size={19} aria-hidden="true"/> OPEN WHATSAPP ENQUIRY <ArrowRight size={18} aria-hidden="true"/>
                </a>
              )}
              <button type="button" className="trc-contact-edit"
                onClick={() => { setReviewing(false); setErrors([]); }}>
                <ArrowLeft size={17} aria-hidden="true"/> EDIT MESSAGE
              </button>
              <p className="trc-contact-note">
                <Info size={15} aria-hidden="true"/>
                After opening WhatsApp, press Send. The website does not track delivery or replies.
              </p>
            </section>
          )}
        </div>
      </section>

      <section className="page-width trc-contact-location" aria-labelledby="trc-contact-location-title">
        <div className="trc-contact-location-copy">
          <span className="trc-contact-eyebrow">FIND US HERE</span>
          <h2 id="trc-contact-location-title">Find Us Here</h2>
          <p>Come visit The Rouché Café and enjoy a welcoming space in Prayagraj.</p>
          <div><MapPin size={24} aria-hidden="true"/><span><strong>Our Location</strong>{CAFE.location}</span></div>
          <div><Clock3 size={24} aria-hidden="true"/><span><strong>Opening Hours</strong>Contact the café to confirm today&apos;s timings.</span></div>
          <div><Phone size={24} aria-hidden="true"/><span><strong>Contact Number</strong><a href={"tel:+" + CAFE.whatsapp}>{CAFE.displayPhone}</a></span></div>
          <div><MessageCircle size={24} aria-hidden="true"/><span><strong>WhatsApp</strong><a href={waLink("Hello The Rouché Café, could you share your opening hours?")}
            target="_blank" rel="noopener noreferrer">Ask the café directly</a></span></div>
          <a className="trc-contact-map-button" href={CAFE.mapUrl} target="_blank" rel="noopener noreferrer">
            GET DIRECTIONS <ArrowRight size={17} aria-hidden="true"/>
          </a>
        </div>

        <div className="trc-contact-map" aria-label="Café location on Google Maps">
          {mapsEmbed ? (
            <iframe
              src={mapsEmbed}
              title="The Rouché Café on Google Maps"
              loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          ) : (
            <div className="trc-contact-map-fallback">
              <MapPin size={46} aria-hidden="true"/>
              <h3>Find Us on Google Maps</h3>
              <p>Open the exact location link shared by the café.</p>
              <a href={CAFE.mapUrl} target="_blank" rel="noopener noreferrer">
                VIEW CAFÉ LOCATION <ArrowRight size={16} aria-hidden="true"/>
              </a>
            </div>
          )}
          <a className="trc-contact-map-overlay" href={CAFE.mapUrl} target="_blank" rel="noopener noreferrer">
            OPEN EXACT LOCATION <ArrowRight size={16} aria-hidden="true"/>
          </a>
        </div>
      </section>

      {VERIFIED_SOCIAL_PROFILES.length > 0 && (
        <div className="page-width trc-contact-social">
          Official café social profiles can be followed using the links in the footer.
        </div>
      )}

      <section className="page-width trc-contact-visit-banner" aria-label="Plan your café visit">
        <div className="trc-contact-visit-photo"><Photo src={PHOTOS.coffee} alt="Illustrative latte"/></div>
        <div><span className="script">Plan Your Visit</span><p>Whether it&apos;s a casual coffee, a work meet-up, or a celebration, we&apos;re here for you.</p></div>
        <Link href="/reservation">BOOK A TABLE <ArrowRight size={18} aria-hidden="true"/></Link>
        <BotanicalSprig className="trc-botanical trc-contact-visit-sprig"/>
      </section>
    </div>
  );
}
