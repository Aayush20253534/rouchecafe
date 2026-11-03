import Link from "next/link";
import { ArrowRight, Armchair, Coffee, Heart, Info, UtensilsCrossed } from "lucide-react";
import { CAFE, PHOTOS, menu, money } from "@/lib/site";
import { FeatureStrip, Hero, Photo, SectionHeading, ButtonLink } from "@/components/ui/CafePrimitives";
import { BotanicalSprig, CoffeeBeanRule } from "@/components/ui/CafeDecorations";
import { QuickTableRequest } from "@/components/pages/QuickTableRequest";

const signatureItems = [menu[4], menu[14], menu[1], menu[9], menu[15]];

export function HomePage() {
  return (
    <div className="trc-home">
      <div className="trc-home-hero-wrap">
        <BotanicalSprig className="trc-botanical trc-home-hero-sprig" />
        <Hero
          eyebrow="Good Coffee, Brighter Days"
          title="THE ROUCHÉ CAFÉ"
          description="A cozy café and restaurant where great food, artisan coffee, and warm ambience come together for perfect moments."
          image={PHOTOS.hero}
          center
        >
          <ButtonLink href="/menu">EXPLORE MENU <ArrowRight size={17} aria-hidden="true"/></ButtonLink>
          <ButtonLink href="/about" light>OUR STORY</ButtonLink>
        </Hero>
      </div>

      <FeatureStrip features={[
        { icon: <Coffee />, title: "ARTISAN COFFEE", desc: "Freshly brewed, rich in flavour" },
        { icon: <UtensilsCrossed />, title: "DELICIOUS FOOD", desc: "Curated bites for every craving" },
        { icon: <Armchair />, title: "COZY AMBIENCE", desc: "A perfect space to relax, work or meet" },
        { icon: <Heart />, title: "MADE WITH LOVE", desc: "Quality ingredients and heartfelt service" },
      ]}/>

      <section className="section page-width trc-signature" aria-label="Signature menu preview">
        <SectionHeading eyebrow="OUR SIGNATURE MENU" title="Crafted to Perfection" />
        <Link href="/menu" className="trc-section-action">
          VIEW FULL MENU <ArrowRight size={17} aria-hidden="true" />
        </Link>
        <div className="trc-signature-grid">
          {signatureItems.map((item) => (
            <article className="trc-signature-card" key={item.id}>
              <Link href="/menu" aria-label={"Explore " + item.name + " on the menu"}>
                <div className="trc-signature-photo"><Photo src={item.image} alt={item.name}/></div>
                <div className="trc-signature-copy">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <strong>{money(item.price)}</strong>
                </div>
              </Link>
            </article>
          ))}
        </div>
        {CAFE.demoMenu && (
          <p className="demo-note trc-signature-disclaimer">
            <Info size={16} aria-hidden="true"/>
            Sample dishes, images and prices shown for design preview only. Final menu will be added after café approval.
          </p>
        )}

        <div className="trc-home-feature-grid">
          <article className="trc-chef-card">
            <Photo src={PHOTOS.salad} alt="Illustrative plated café dish" className="trc-chef-photo"/>
            <div className="trc-chef-content">
              <span className="script">Chef&apos;s Special</span>
              <h3>MADE FOR EVERY CRAVING</h3>
              <p>Discover freshly prepared favourites and the taste of thoughtful ingredients.</p>
              <Link className="trc-chef-link" href="/menu">
                DISCOVER MORE <ArrowRight size={17} aria-hidden="true"/>
              </Link>
            </div>
          </article>
          <blockquote className="trc-home-quote">
            <span className="trc-quote-mark" aria-hidden="true">“</span>
            <p>The Rouché Café is a welcoming place for good coffee, delicious food and moments worth slowing down for.</p>
            <footer>THE ROUCHÉ CAFÉ</footer>
            <BotanicalSprig className="trc-botanical trc-quote-sprig"/>
          </blockquote>
        </div>
      </section>

      <section className="section page-width trc-home-gallery" aria-labelledby="trc-gallery-heading">
        <div className="trc-gallery-head">
          <h2 id="trc-gallery-heading">A FEAST FOR THE SENSES</h2>
          <Link href="/gallery">VIEW GALLERY <ArrowRight size={17} aria-hidden="true"/></Link>
        </div>
        <CoffeeBeanRule/>
        <div className="trc-gallery-strip">
          {[PHOTOS.interior, PHOTOS.cappuccino, PHOTOS.brownie, PHOTOS.cafe, PHOTOS.interior2, PHOTOS.icedCoffee].map((src, index) => (
            <Link href="/gallery" key={src + index} aria-label={"View café gallery photograph " + (index + 1)}>
              <Photo src={src} alt={"Café gallery preview " + (index + 1)} />
            </Link>
          ))}
        </div>
      </section>

      <section className="trc-home-booking" aria-labelledby="trc-home-booking-title">
        <div className="trc-home-booking-photo" aria-hidden="true">
          <Photo src={PHOTOS.interior2} alt="" />
        </div>
        <div className="page-width trc-home-booking-inner">
          <div className="trc-home-booking-copy">
            <span className="trc-gold-eyebrow">RESERVE YOUR TABLE</span>
            <h2 id="trc-home-booking-title">Book a Seat for You</h2>
            <p>Whether it&apos;s a coffee date, a casual meet-up, or a special celebration, we&apos;d love to host you.</p>
          </div>
          <QuickTableRequest/>
        </div>
      </section>
    </div>
  );
}
