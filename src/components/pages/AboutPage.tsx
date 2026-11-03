import Link from "next/link";
import { ArrowRight, Armchair, ChefHat, Coffee, Heart, Leaf, Users } from "lucide-react";
import { PHOTOS } from "@/lib/site";
import { ButtonLink, Hero, Photo } from "@/components/ui/CafePrimitives";
import { BotanicalSprig, CoffeeBeanRule } from "@/components/ui/CafeDecorations";

const values = [
  { icon: Leaf, title: "Thoughtful Ingredients", text: "We source ingredients thoughtfully, because great food starts with quality." },
  { icon: Coffee, title: "Crafted with Care", text: "Every cup and every dish is made with passion, not just process." },
  { icon: Users, title: "A Place to Belong", text: "More than a café. It is a space where you can feel at home." },
];

const moments = [
  { image: PHOTOS.interior2, title: "Your Coffee Corner", text: "Find your perfect spot, whether it is a quiet moment alone or a productive work session." },
  { image: PHOTOS.group, title: "Good Food, Great Company", text: "Share delicious meals, laughter and unforgettable moments with friends and family." },
  { image: PHOTOS.cake, title: "Sweet Endings", text: "From classic desserts to signature creations, every bite is a celebration." },
];

const promises = [
  { icon: Leaf, title: "Quality Ingredients", text: "Fresh, seasonal and carefully sourced." },
  { icon: ChefHat, title: "Freshly Prepared Favourites", text: "From our kitchen to your table, with love." },
  { icon: Heart, title: "Warm Hospitality", text: "Friendly faces and genuine care, always." },
  { icon: Coffee, title: "Relaxed Ambience", text: "A calm space to unwind, connect and enjoy." },
];

export function AboutPage() {
  return (
    <div className="trc-about">
      <div className="trc-about-hero-wrap">
        <BotanicalSprig className="trc-botanical trc-about-hero-sprig"/>
        <Hero
          eyebrow="A Little About Us"
          title="MORE THAN JUST A CAFÉ"
          description="At The Rouché Café, we believe in warm hospitality, artisan coffee and thoughtfully prepared food. We are more than just a café — a place where good people, great conversations and delicious flavours come together."
          image={PHOTOS.interior}
        />
        <nav aria-label="Breadcrumb" className="trc-about-breadcrumb">
          <Link href="/">HOME</Link><span aria-hidden="true"> / </span><span aria-current="page">ABOUT US</span>
        </nav>
      </div>

      <section className="section page-width trc-about-story" aria-labelledby="trc-about-story-title">
        <div className="trc-story-images">
          <Photo src={PHOTOS.cappuccino} alt="Barista pouring coffee" className="trc-story-coffee"/>
          <Photo src={PHOTOS.group} alt="Friends meeting over food and coffee" className="trc-story-friends"/>
          <BotanicalSprig className="trc-botanical trc-story-sprig"/>
        </div>
        <div className="trc-story-copy">
          <CoffeeBeanRule className="trc-story-rule"/>
          <h2 id="trc-about-story-title">THE STORY BEHIND THE ROUCHÉ</h2>
          <p>The Rouché Café was born from a simple idea — to create a welcoming neighbourhood café where good coffee, honest food and meaningful moments come together. It&apos;s a space designed for everyone, from the early risers and busy professionals to friends, families and dreamers.</p>
          <span className="script">Good Food&nbsp; • &nbsp;Good People&nbsp; • &nbsp;Better Days</span>
        </div>
      </section>

      <section className="trc-about-values" aria-labelledby="trc-about-values-title">
        <BotanicalSprig className="trc-botanical trc-values-sprig-left"/>
        <BotanicalSprig className="trc-botanical trc-values-sprig-right"/>
        <div className="page-width">
          <CoffeeBeanRule className="trc-gold-rule"/>
          <h2 id="trc-about-values-title">GOOD COFFEE. BRIGHTER DAYS.</h2>
          <div className="trc-about-values-grid">
            {values.map(({ icon: Icon, title, text }) => (
              <article key={title}>
                <span className="trc-round-icon"><Icon size={27} strokeWidth={1.5} aria-hidden="true"/></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section page-width trc-about-moments" aria-labelledby="trc-about-moments-title">
        <CoffeeBeanRule/>
        <h2 id="trc-about-moments-title">A PLACE FOR EVERY MOMENT</h2>
        <div className="trc-moment-cards">
          {moments.map((moment) => (
            <article key={moment.title}>
              <Photo src={moment.image} alt={moment.title}/>
              <h3>{moment.title}</h3>
              <p>{moment.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="trc-about-promise" aria-labelledby="trc-about-promise-title">
        <div className="trc-promise-photo">
          <Photo src={PHOTOS.cafe} alt="Coffee and food served in a welcoming café"/>
        </div>
        <div className="trc-promise-copy">
          <CoffeeBeanRule/>
          <h2 id="trc-about-promise-title">OUR PROMISE</h2>
          <div className="trc-promise-grid">
            {promises.map(({ icon: Icon, title, text }) => (
              <article key={title}>
                <span className="trc-round-icon"><Icon size={27} strokeWidth={1.4} aria-hidden="true"/></span>
                <div><h3>{title}</h3><p>{text}</p></div>
              </article>
            ))}
          </div>
          <BotanicalSprig className="trc-botanical trc-promise-sprig"/>
        </div>
      </section>

      <section className="trc-about-quote" aria-label="Our café philosophy">
        <BotanicalSprig className="trc-botanical trc-about-quote-sprig"/>
        <span className="trc-quote-mark" aria-hidden="true">“</span>
        <blockquote>
          <p>A welcoming place for good coffee, delicious food and moments worth slowing down for.</p>
          <footer>A THOUGHT FROM THE ROUCHÉ</footer>
        </blockquote>
        <Photo src={PHOTOS.coffee} alt="" className="trc-about-quote-coffee"/>
      </section>

      <section className="trc-about-cta" aria-labelledby="trc-about-cta-title">
        <Photo src={PHOTOS.interior2} alt="Café seating ready for visitors"/>
        <div className="trc-about-cta-content">
          <CoffeeBeanRule/>
          <h2 id="trc-about-cta-title">YOUR TABLE IS WAITING</h2>
          <p>Celebrate, catch up, or simply take a break.<br/>Book your table and let us take care of the rest.</p>
          <ButtonLink href="/reservation">BOOK A TABLE <Armchair size={17} aria-hidden="true"/></ButtonLink>
        </div>
      </section>

      <div className="trc-about-contact-link">
        <Link href="/contact">Find us in Prayagraj <ArrowRight size={16} aria-hidden="true"/></Link>
      </div>
    </div>
  );
}
