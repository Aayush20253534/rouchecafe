"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight, BookOpen, CalendarDays, Coffee, Images, Leaf, Newspaper, Sparkles,
} from "lucide-react";
import { BLOG_CATEGORIES, filterBlogPosts, type BlogCategory } from "@/data/blog";
import { PHOTOS } from "@/lib/site";
import { Hero, Photo } from "@/components/ui/CafePrimitives";
import { BotanicalSprig, CoffeeBeanRule } from "@/components/ui/CafeDecorations";

export function BlogPage() {
  const [category, setCategory] = useState<BlogCategory | "All">("All");
  const posts = useMemo(() => filterBlogPosts(category), [category]);

  return (
    <div className="trc-blog-page">
      <div className="trc-blog-hero-wrap">
        <BotanicalSprig className="trc-botanical trc-blog-sprig"/>
        <Hero
          eyebrow="The Café Journal"
          title="Stories & Sips"
          description="A corner for coffee stories, café updates and the little things that make good days brighter."
          image={PHOTOS.coffee}
        >
          <Link href="/gallery" className="btn btn-green">EXPLORE GALLERY <ArrowRight size={17} aria-hidden="true"/></Link>
        </Hero>
      </div>

      <section className="page-width trc-blog-content" aria-label="Café journal">
        <div className="trc-blog-heading">
          <span className="trc-blog-eyebrow">FROM THE ROUCHÉ CAFÉ</span>
          <h2>Something Wonderful Is Brewing</h2>
          <CoffeeBeanRule/>
          <p>Once the café provides its first stories, they will appear here with proper titles, dates and photographs.</p>
        </div>

        <div className="trc-blog-filter" role="group" aria-label="Filter journal posts">
          {(["All", ...BLOG_CATEGORIES] as const).map((filter) => (
            <button key={filter} type="button"
              aria-pressed={category === filter}
              className={category === filter ? "active" : ""}
              onClick={() => setCategory(filter)}>{filter}</button>
          ))}
        </div>

        {posts.length ? (
          <div className="trc-blog-grid">
            {posts.map((post) => (
              <article className="trc-blog-card" key={post.slug}>
                <Photo src={post.image} alt={post.title}/>
                <div className="trc-blog-card-copy">
                  <span className="trc-blog-category">{post.category}</span>
                  <h3>{post.title}</h3>
                  <time dateTime={post.datePublished}>
                    <CalendarDays size={14} aria-hidden="true"/> {post.datePublished}
                  </time>
                  <p>{post.excerpt}</p>
                  <details>
                    <summary>READ STORY <ArrowRight size={15} aria-hidden="true"/></summary>
                    {post.content.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                  </details>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="trc-blog-empty" role="status">
            <div className="trc-blog-empty-icon"><BookOpen size={44} aria-hidden="true"/></div>
            <span className="script">Coming Soon</span>
            <h3>{category === "All" ? "Our Café Journal Is on Its Way" : "No Stories in This Category Yet"}</h3>
            <p>
              We&apos;re preparing this space for stories from The Rouché Café.
              No sample articles are being published as real café news.
            </p>
            <div className="trc-blog-empty-actions">
              {category !== "All" && <button type="button" onClick={() => setCategory("All")}>ALL STORIES</button>}
              <Link href="/gallery">VIEW GALLERY <ArrowRight size={17} aria-hidden="true"/></Link>
            </div>
          </div>
        )}

        <div className="trc-blog-coming-grid" aria-label="What to expect from our journal">
          <div><Coffee size={30} aria-hidden="true"/><h3>Coffee Culture</h3><p>Notes on the café&apos;s coffees and favourite drinks, once approved.</p></div>
          <div><Leaf size={30} aria-hidden="true"/><h3>Food & Flavours</h3><p>Menus, seasonal highlights and kitchen stories from our team.</p></div>
          <div><Newspaper size={30} aria-hidden="true"/><h3>Café Updates</h3><p>Official announcements, events and celebrations.</p></div>
        </div>
      </section>

      <section className="trc-blog-bottom">
        <div className="page-width trc-blog-bottom-inner">
          <div><span className="script">Good Coffee, Brighter Days</span><h2>Come Make a Story With Us</h2></div>
          <p>Share a coffee, enjoy a meal and make a moment worth remembering.</p>
          <Link href="/reservation">BOOK A TABLE <ArrowRight size={18} aria-hidden="true"/></Link>
        </div>
      </section>
    </div>
  );
}
