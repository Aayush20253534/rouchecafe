"use client";

import React, { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRight, ArrowLeft, CalendarDays, CheckCircle2, ChevronDown, Clock3,
  Coffee, Heart, Leaf, Mail, MapPin, Menu as MenuIcon, Minus, Plus, Phone,
  Search, ShoppingBag, ShoppingCart, Star, Trash2, Users, UtensilsCrossed,
  X, MessageCircle, Instagram, Facebook, Youtube, Linkedin, Send, Sparkles,
  Truck, PackageCheck, ShieldCheck, ChefHat, Armchair, CakeSlice, Gift,
  Info, ClipboardList, Flame, Sandwich, BookOpen
} from "lucide-react";
import { CAFE, PHOTOS, categories, menu, money, waLink, type MenuItem } from "@/lib/site";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { HomePage } from "@/components/pages/HomePage";
import { AboutPage } from "@/components/pages/AboutPage";
import { MenuPage } from "@/components/pages/MenuPage";
import { CartPage } from "@/components/pages/CartPage";
import { CheckoutPage } from "@/components/pages/CheckoutPage";
import { parseStoredCart, updateCartQuantity } from "@/lib/cart-storage";
import { cartItemCount } from "@/lib/menu-utils";
import { Pill, SectionHeading, Photo, Hero, FeatureStrip, OpenWhatsApp, ButtonLink } from "@/components/ui/CafePrimitives";

type Cart = Record<string, number>;

function ProductCard({item,add,compact=false}:{item:MenuItem;add:(id:string)=>void;compact?:boolean}) {
  const [liked,setLiked]=useState(false);
  return <article className={"product-card "+(compact?"compact":"")}>
    <div className="product-img-wrap"><Photo src={item.image} alt={item.name} className="product-photo"/><button className={"heart "+(liked?"active":"")} onClick={()=>setLiked(v=>!v)} aria-label={liked?"Remove from favourites":"Add to favourites"}><Heart size={19} fill={liked?"currentColor":"none"}/></button></div>
    <div className="product-body"><strong>{item.name}</strong>{!compact&&<p>{item.description}</p>}<div className="product-bottom"><b>{money(item.price)}</b><button onClick={()=>add(item.id)} className="add-btn"><ShoppingBag size={14}/> Add to Cart</button></div></div>
  </article>;
}
const openWa=(message:string)=>window.open(waLink(message),"_blank","noopener,noreferrer");

const galleryEntries = [
  {image:PHOTOS.interior,type:"Ambience",alt:"Café interior and seating"},
  {image:PHOTOS.cappuccino,type:"Beverages",alt:"Fresh café coffee"},
  {image:PHOTOS.brownie,type:"Food",alt:"Chocolate dessert"},
  {image:PHOTOS.pasta,type:"Food",alt:"Freshly prepared pasta"},
  {image:PHOTOS.cake,type:"Food",alt:"Dessert"},
  {image:PHOTOS.interior2,type:"Ambience",alt:"Cozy café interior"},
  {image:PHOTOS.icedCoffee,type:"Beverages",alt:"Cold coffee"},
  {image:PHOTOS.salad,type:"Food",alt:"Freshly prepared meal"},
  {image:PHOTOS.croissant,type:"Food",alt:"Fresh croissant"},
  {image:PHOTOS.cafe,type:"Ambience",alt:"Coffee shop"},
  {image:PHOTOS.group,type:"Celebrations",alt:"Friends enjoying time together"},
  {image:PHOTOS.matcha,type:"Beverages",alt:"Matcha drink"}
];
function Gallery(){
  const [filter,setFilter]=useState("All");
  const [focus,setFocus]=useState<string|null>(null);
  const visible=galleryEntries.filter(x=>filter==="All"||x.type===filter);
  return <>
    <Hero eyebrow="Our Gallery" title="A Glimpse of The Rouché Cafe" description="Explore the moments, flavours and ambience that make The Rouché Café a special place." image={PHOTOS.interior2}/>
    <section className="section page-width gallery-page"><div className="filter-pills gallery-filter">{["All","Ambience","Food","Beverages","Celebrations"].map(x=><button className={filter===x?"selected":""} key={x} onClick={()=>setFilter(x)}>{x}</button>)}</div>
      <div className="gallery-masonry">{visible.map((item,i)=><button type="button" className={"gallery-tile tile-"+(i%7)} key={item.image+"-"+i} onClick={()=>setFocus(item.image)} aria-label={"Enlarge "+item.alt}><Photo src={item.image} alt={item.alt}/><span>{item.type}</span></button>)}</div>
      <p className="demo-note centered"><Info size={15}/> Gallery currently contains temporary reference photos. Official café photos will replace them.</p>
      <div className="gallery-cta"><h2>Create Your Own Moments at TRC</h2><p>From casual meetups to special celebrations, The Rouché Café is a place to make memories.</p><ButtonLink href="/reservation">BOOK A TABLE <ArrowRight size={16}/></ButtonLink></div>
    </section>
    {focus&&<div className="lightbox" role="dialog" aria-modal="true" aria-label="Enlarged gallery photo" onClick={()=>setFocus(null)}><button aria-label="Close image" onClick={()=>setFocus(null)}><X size={25}/></button><Photo src={focus} alt="Enlarged café gallery image"/></div>}
  </>;
}
const reservationTimes=["08:00 AM","08:30 AM","09:00 AM","09:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM","12:00 PM","12:30 PM","01:00 PM","01:30 PM","02:00 PM","02:30 PM","03:00 PM","03:30 PM","04:00 PM","04:30 PM","05:00 PM","05:30 PM","06:00 PM","06:30 PM","07:00 PM","07:30 PM","08:00 PM","08:30 PM","09:00 PM"];
function Reservation(){
  const [name,setName]=useState(""); const [phone,setPhone]=useState(""); const [date,setDate]=useState(""); const [time,setTime]=useState(""); const [guests,setGuests]=useState("2"); const [occasion,setOccasion]=useState(""); const [notes,setNotes]=useState("");
  function submit(e:FormEvent){e.preventDefault();openWa(["Hello The Rouché Café, I'd like to request a table reservation.","Name: "+name,"Phone: "+phone,"Date: "+date,"Time: "+time,"Guests: "+guests,"Occasion: "+(occasion||"Not specified"),"Special requests: "+(notes||"None"),"Please confirm availability."].join("\n"));}
  return <>
    <Hero eyebrow="Reserve Your Table" title="Book My Table" description="Planning a casual meet-up, work session, birthday celebration, or a special evening? Request your table in advance and enjoy a seamless experience." image={PHOTOS.interior}>
      <div className="hero-highlights"><span><CalendarDays/> Quick & Easy</span><span><CheckCircle2/> Direct Enquiry</span><span><MessageCircle/> Via WhatsApp</span></div>
    </Hero>
    <section className="section page-width reservation-layout"><div className="reservation-photos"><Photo src={PHOTOS.interior2} alt="Café seating area"/><div className="occasions"><span className="script">Perfect For</span><div><span><CakeSlice/> Birthday Celebrations</span><span><Users/> Meetups & Hangouts</span><span><BookOpen/> Work Sessions</span><span><Gift/> Special Occasions</span></div></div></div>
      <form className="form-card" onSubmit={submit}><Pill>TABLE BOOKING</Pill><h2>Reserve Your Table</h2><p>Fill in your details and we&apos;ll confirm your booking with you on WhatsApp.</p><div className="form-two"><label>Full Name *<input required value={name} onChange={e=>setName(e.target.value)} placeholder="Your full name"/></label><label>Phone Number *<input required inputMode="tel" minLength={10} value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+91 ..."/></label><label>Date *<input required type="date" min={new Date().toLocaleDateString("en-CA")} value={date} onChange={e=>setDate(e.target.value)}/></label><label>Time *<select required value={time} onChange={e=>setTime(e.target.value)}><option value="">Select time</option>{reservationTimes.map(t=><option key={t}>{t}</option>)}</select></label></div>
      <label>Number of Guests *<select required value={guests} onChange={e=>setGuests(e.target.value)}>{Array.from({length:20},(_,i)=><option key={i} value={i+1}>{i+1} {i?"Guests":"Guest"}</option>)}</select></label><label>Occasion (optional)<select value={occasion} onChange={e=>setOccasion(e.target.value)}><option value="">Select occasion</option>{["Casual Visit","Birthday","Anniversary","Work Meeting","Friends & Family","Other"].map(t=><option key={t}>{t}</option>)}</select></label><label>Special Requests (optional)<textarea rows={4} value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Birthday setup, seating preference, etc."/></label>
      <button className="btn btn-green full" type="submit"><MessageCircle size={19}/> REQUEST TABLE ON WHATSAPP <ArrowRight size={17}/></button><small className="form-info"><Info size={16}/> A request is not a confirmed reservation. The café will confirm availability directly.</small></form></section>
      <section className="page-width occasion-strip"><div><Armchair/> Cozy & Aesthetic Ambience</div><div><UtensilsCrossed/> Food & Beverages</div><div><Users/> Great for Groups & Events</div><div><MapPin/> Prayagraj</div></section>
      <section className="page-width celebration-banner" style={{backgroundImage:"linear-gradient(90deg,rgba(0,48,29,.93),rgba(0,48,29,.86)),url("+PHOTOS.coffee+")"}}><span className="script">Celebrate Your Special Moments at The Rouché Café</span><p>From birthdays to small gatherings, we make every occasion a little more special.</p></section>
  </>;
}
function Contact(){
  const [name,setName]=useState(""); const [phone,setPhone]=useState(""); const [email,setEmail]=useState(""); const [subject,setSubject]=useState("General Enquiry"); const [message,setMessage]=useState("");
  function submit(e:FormEvent){e.preventDefault();openWa(["Hello The Rouché Café, I have an enquiry.","Name: "+name,"Phone: "+phone,"Email: "+(email||"Not provided"),"Subject: "+subject,"Message: "+message].join("\n"));}
  return <>
    <Hero eyebrow="Get in Touch" title="Contact Us" description="We'd love to hear from you. Whether it's a reservation, an order, an event, or a general enquiry, our team is here to help." image={PHOTOS.cappuccino}><OpenWhatsApp message="Hello The Rouché Café, I have an enquiry."><MessageCircle size={18}/> CHAT ON WHATSAPP</OpenWhatsApp><ButtonLink href="/reservation" light>BOOK A TABLE <ArrowRight size={17}/></ButtonLink></Hero>
    <FeatureStrip features={[{icon:<MapPin/>,title:"VISIT US",desc:CAFE.location},{icon:<Phone/>,title:"CALL US",desc:CAFE.displayPhone},{icon:<MessageCircle/>,title:"WHATSAPP",desc:"Chat with our team"},{icon:<Clock3/>,title:"OPEN HOURS",desc:"Contact café to confirm hours"}]}/>
    <section className="section page-width contact-layout"><div className="contact-photo"><Photo src={PHOTOS.interior} alt="The Rouché Café ambience"/></div><form className="form-card" onSubmit={submit}><Pill>SEND US A MESSAGE</Pill><h2>Have a Question or Request?</h2><p>Drop us a message and we&apos;ll get back to you as soon as possible.</p><div className="form-two"><label>Full Name *<input required placeholder="Full name" value={name} onChange={e=>setName(e.target.value)}/></label><label>Phone Number *<input required minLength={10} inputMode="tel" placeholder="Phone number" value={phone} onChange={e=>setPhone(e.target.value)}/></label></div><label>Email Address (optional)<input type="email" placeholder="Email address" value={email} onChange={e=>setEmail(e.target.value)}/></label><label>Subject<select value={subject} onChange={e=>setSubject(e.target.value)}>{["General Enquiry","Table Booking","Order Enquiry","Private Event","Feedback","Other"].map(x=><option key={x}>{x}</option>)}</select></label><label>Your Message *<textarea required rows={5} placeholder="How can we help?" value={message} onChange={e=>setMessage(e.target.value)}/></label><button type="submit" className="btn btn-green full"><Send size={17}/> SEND MESSAGE ON WHATSAPP</button></form></section>
    <section className="section page-width location-grid"><div><Pill>FIND US HERE</Pill><h2>Visit The Rouché Café</h2><p>Experience great coffee, delicious food and a cozy atmosphere.</p><p><MapPin size={19}/> {CAFE.location}</p><p><Phone size={19}/> {CAFE.displayPhone}</p><p><Clock3 size={19}/> Confirm today's hours with the café</p><a href={CAFE.mapUrl} target="_blank" rel="noopener noreferrer" className="btn btn-green">OPEN DIRECTIONS <ArrowRight size={17}/></a></div><a className="map-preview" href={CAFE.mapUrl} target="_blank" rel="noopener noreferrer"><MapPin size={42}/><h3>Find Us on Google Maps</h3><p>Open the verified location shared by the café</p><span>GET DIRECTIONS <ArrowRight size={15}/></span></a></section>
    <section className="page-width gallery-cta contact-cta"><h2>Plan Your Visit</h2><p>Whether it&apos;s a casual coffee, a work meet-up, or a special celebration, we&apos;re here for you.</p><ButtonLink href="/reservation">BOOK A TABLE <ArrowRight size={17}/></ButtonLink></section>
  </>;
}
function Blog(){
  return <><Hero eyebrow="From Our Café" title="Stories & Sips" description="A space for coffee stories, café updates, seasonal favourites and the moments that make The Rouché special." image={PHOTOS.cafe}/><section className="section page-width blog-content"><SectionHeading eyebrow="THE CAFÉ JOURNAL" title="Something Wonderful Is Brewing"/><div className="blog-intro"><Coffee size={44}/><h3>Our journal is coming soon</h3><p>We&apos;ll share real café stories, news, seasonal menus and celebrations here once the content is ready.</p><ButtonLink href="/gallery">EXPLORE GALLERY <ArrowRight size={16}/></ButtonLink></div></section></>;
}
const knownItemIds = new Set(menu.map((item) => item.id));

export default function CafeSite() {
  const pathname = usePathname();
  const [cart, setCart] = useState<Cart>({});
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    let raw: string | null = null;
    try { raw = window.localStorage.getItem("rouche-cart"); } catch {}
    setCart(parseStoredCart(raw, knownItemIds));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try { window.localStorage.setItem("rouche-cart", JSON.stringify(cart)); } catch {}
  }, [cart, hydrated]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const change = (id: string, delta: number) => {
    setCart((current) => updateCartQuantity(current, id, delta, knownItemIds));
  };
  const add = (id: string, quantity = 1) => {
    if (!knownItemIds.has(id) || !Number.isInteger(quantity) || quantity < 1) return;
    change(id, quantity);
    const item = menu.find((product) => product.id === id);
    setToast(item ? (quantity > 1 ? quantity + " × " : "") + item.name + " added to cart" : "");
  };
  const clear = () => setCart({});
  const count = useMemo(() => cartItemCount(cart), [cart]);
  const route = (pathname || "/").split("/").filter(Boolean)[0] || "home";

  const current: Record<string, React.ReactNode> = {
    home: <HomePage />,
    about: <AboutPage />,
    menu: <MenuPage add={add} cart={cart} change={change} />,
    reservation: <Reservation />,
    gallery: <Gallery />,
    contact: <Contact />,
    cart: <CartPage cart={cart} change={change} clear={clear} add={add} />,
    checkout: <CheckoutPage cart={cart} />,
    blog: <Blog />,
  };

  return (
    <>
      <SiteHeader cartCount={count} />
      <main id="main">{current[route] || <section className="section page-width not-found"><h1>Page not found</h1><ButtonLink href="/">RETURN HOME</ButtonLink></section>}</main>
      <SiteFooter />
      {toast && <div className="cart-toast" role="status"><CheckCircle2 size={18} />{toast}<Link href="/cart">View cart</Link></div>}
    </>
  );
}
