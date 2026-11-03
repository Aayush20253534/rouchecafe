import Link from "next/link";
import { Coffee, MapPin, MessageCircle, Phone, Instagram, Facebook, Youtube, Linkedin } from "lucide-react";
import { VERIFIED_SOCIAL_PROFILES } from "@/lib/social";
import { CAFE, waLink } from "@/lib/site";
import { MAIN_NAVIGATION } from "@/lib/navigation";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { OpenWhatsApp } from "@/components/ui/CafePrimitives";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-width footer-main">
        <div className="footer-brand">
          <BrandLogo footer />
          <em>{CAFE.tagline}</em>
          <div className="social-links">
            <a
              href={waLink("Hello The Rouché Café.")}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle size={17} aria-hidden="true" />
            </a>
            <a
              href={CAFE.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Find the café on Google Maps"
            >
              <MapPin size={17} aria-hidden="true" />
            </a>
            {VERIFIED_SOCIAL_PROFILES.map(({ network, url }) => {
              const Icon = {
                instagram: Instagram, facebook: Facebook, youtube: Youtube, linkedin: Linkedin,
              }[network];
              return (
                <a href={url} key={network} aria-label={"Official café " + network}
                  target="_blank" rel="noopener noreferrer">
                  <Icon size={17} aria-hidden="true"/>
                </a>
              );
            })}
          </div>
        </div>
        <div>
          <h3>QUICK LINKS</h3>
          <nav aria-label="Footer navigation">
            {MAIN_NAVIGATION.map(({ href, label }) => (
              <Link key={href} href={href}>{label}</Link>
            ))}
          </nav>
        </div>
        <div>
          <h3>VISITING HOURS</h3>
          <p>Opening hours will be updated after confirmation by the café.</p>
          <OpenWhatsApp
            message="Hello The Rouché Café, could you confirm your opening hours?"
            className="footer-chat"
          >
            Confirm hours via WhatsApp
          </OpenWhatsApp>
        </div>
        <div>
          <h3>CONTACT US</h3>
          <p><MapPin size={17} aria-hidden="true" /> {CAFE.location}</p>
          <p>
            <Phone size={17} aria-hidden="true" />
            <a href={`tel:+${CAFE.whatsapp}`}>{CAFE.displayPhone}</a>
          </p>
          <p>
            <MessageCircle size={17} aria-hidden="true" />
            <a href={waLink("Hello The Rouché Café.")} target="_blank" rel="noopener noreferrer">
              Chat on WhatsApp
            </a>
          </p>
        </div>
        <div className="storefront" aria-hidden="true">
          <Coffee size={70} />
          <span>THE ROUCHÉ CAFÉ</span>
        </div>
      </div>
      <div className="footer-bottom page-width">
        <small>© {new Date().getFullYear()} The Rouché Café. All rights reserved.</small>
        <span>
          <Link href="/contact">Privacy enquiries</Link>
          <span className="footer-line">|</span>
          <Link href="/contact">Terms enquiries</Link>
        </span>
      </div>
    </footer>
  );
}
