"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight, Armchair, CakeSlice, CalendarDays, Coffee,
  Image as ImageIcon, Info, Leaf, Sparkles, Users, X,
} from "lucide-react";
import { PHOTOS } from "@/lib/site";
import { GALLERY_CATEGORIES, filterGallery, type GalleryCategory } from "@/data/gallery";
import { Hero, Photo } from "@/components/ui/CafePrimitives";
import { BotanicalSprig, CoffeeBeanRule } from "@/components/ui/CafeDecorations";

const ICONS = {
  All: Sparkles,
  Ambience: Armchair,
  Food: CakeSlice,
  Beverages: Coffee,
  Events: CalendarDays,
  Celebrations: Users,
} as const;

export function GalleryPage() {
  const [category, setCategory] = useState<GalleryCategory>("All");
  const [selected, setSelected] = useState<number | null>(null);
  const visible = useMemo(() => filterGallery(category), [category]);
  const closeRef = useRef<HTMLButtonElement>(null);
  const focusBeforeDialog = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (selected === null) return;
    focusBeforeDialog.current = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") setSelected(null);
      if (event.key === "ArrowRight") setSelected((current) =>
        current === null ? null : (current + 1) % visible.length);
      if (event.key === "ArrowLeft") setSelected((current) =>
        current === null ? null : (current - 1 + visible.length) % visible.length);
      if (event.key === "Tab") {
        const modal = document.getElementById("trc-gallery-dialog");
        const buttons = modal?.querySelectorAll<HTMLButtonElement>("button");
        if (!buttons?.length) return;
        const first = buttons[0];
        const last = buttons[buttons.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKey);
      focusBeforeDialog.current?.focus();
    };
  }, [selected, visible.length]);

  const active = selected === null ? null : visible[selected];

  return (
    <div className="trc-gallery-page">
      <div className="trc-gallery-hero-wrap">
        <BotanicalSprig className="trc-botanical trc-gallery-hero-sprig"/>
        <Hero
          eyebrow="Our Gallery"
          title="A Glimpse of The Rouché Café"
          description="Explore the atmosphere, flavours and special moments that make café visits worth remembering."
          image={PHOTOS.cafe}
        />
      </div>

      <section className="page-width trc-gallery-content" aria-label="Café gallery">
        <nav className="trc-gallery-filters" aria-label="Filter gallery photos">
          {GALLERY_CATEGORIES.map((value) => {
            const Icon = ICONS[value];
            return (
              <button type="button" key={value} className={category === value ? "active" : ""}
                aria-pressed={category === value}
                onClick={() => { setCategory(value); setSelected(null); }}>
                <Icon size={18} aria-hidden="true"/> {value}
              </button>
            );
          })}
        </nav>

        <div className="trc-gallery-preview-note" role="note">
          <Info size={19} aria-hidden="true"/>
          <span>Preview photography only. The café&apos;s own images will replace these examples when supplied.</span>
        </div>

        <div className="trc-gallery-status" role="status" aria-live="polite">
          {visible.length} {visible.length === 1 ? "photo" : "photos"} in {category === "All" ? "the gallery" : category}
        </div>

        {visible.length === 0 ? (
          <div className="trc-gallery-empty">
            <ImageIcon size={46} aria-hidden="true"/>
            <h2>Photos coming soon</h2>
            <p>We&apos;ll add more moments once the café shares its official collection.</p>
            <button type="button" onClick={() => setCategory("All")}>SEE ALL PHOTOS</button>
          </div>
        ) : (
          <div className="trc-gallery-mosaic">
            {visible.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={"trc-gallery-item trc-gallery-item-" + (index % 12)}
                onClick={() => setSelected(index)}
                aria-label={"View larger photo: " + item.alt}
              >
                <Photo src={item.src} alt={item.alt}/>
                <span className="trc-gallery-photo-caption">{item.caption}</span>
                <span className="trc-gallery-photo-expand"><ImageIcon size={18} aria-hidden="true"/></span>
              </button>
            ))}
          </div>
        )}

        <aside className="trc-gallery-visit">
          <div>
            <CoffeeBeanRule/>
            <h2>Create Your Own Moments at TRC</h2>
          </div>
          <p>From casual meetups to special celebrations, The Rouché Café is a place to make memories.</p>
          <Link href="/reservation">BOOK A TABLE <ArrowRight size={18} aria-hidden="true"/></Link>
          <BotanicalSprig className="trc-botanical trc-gallery-visit-sprig"/>
        </aside>
      </section>

      {active && (
        <div className="trc-gallery-lightbox" id="trc-gallery-dialog"
          role="dialog" aria-modal="true" aria-label={"Gallery photo: " + active.caption}
          onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}>
          <button type="button" ref={closeRef} className="trc-gallery-lightbox-close"
            onClick={() => setSelected(null)} aria-label="Close photo viewer">
            <X size={26} aria-hidden="true"/>
          </button>
          <button type="button" className="trc-gallery-lightbox-prev"
            onClick={() => setSelected((current) => current === null ? null : (current - 1 + visible.length) % visible.length)}
            aria-label="Previous photo">
            <ArrowLeft size={25} aria-hidden="true"/>
          </button>
          <figure>
            <Photo src={active.src} alt={active.alt} loading="eager"/>
            <figcaption>{active.caption} <small>{(selected ?? 0) + 1} / {visible.length}</small></figcaption>
          </figure>
          <button type="button" className="trc-gallery-lightbox-next"
            onClick={() => setSelected((current) => current === null ? null : (current + 1) % visible.length)}
            aria-label="Next photo">
            <ArrowRight size={25} aria-hidden="true"/>
          </button>
        </div>
      )}
    </div>
  );
}
