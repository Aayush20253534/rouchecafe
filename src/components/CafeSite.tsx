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

function MenuPage({add,cart,change}:{add:(id:string)=>void;cart:Cart;change:(id:string,diff:number)=>void}) {
  const [category,setCategory]=useState("All"); const [filter,setFilter]=useState("All"); const [query,setQuery]=useState("");
  const matches=menu.filter(item=>(category==="All"||item.category===category)&&(filter==="All"||(filter==="Bestseller"&&item.bestseller)||(filter==="Veg"&&item.veg)||(filter==="Non-Veg"&&!item.veg))&&(item.name+" "+item.description).toLowerCase().includes(query.toLowerCase()));
  const visibleCats=category==="All"?categories:[category];
  return <>
    <Hero eyebrow="Our Menu" title="Explore Our Signature Menu" description="A delightful selection of artisan coffee, freshly prepared meals, and irresistible desserts." image={PHOTOS.hero}><ButtonLink href="#browse">BROWSE OUR MENU <ArrowRight size={17}/></ButtonLink><ButtonLink href="/reservation" light>DINE AT CAFE <Coffee size={17}/></ButtonLink></Hero>
    <FeatureStrip features={[{icon:<Truck/>,title:"ORDER ONLINE",desc:"WhatsApp ordering after menu confirmation"},{icon:<ShoppingBag/>,title:"TAKEAWAY",desc:"Pick up at your convenience"},{icon:<UtensilsCrossed/>,title:"DINE IN",desc:"Enjoy the café experience"},{icon:<Leaf/>,title:"FRESH & QUALITY",desc:"Thoughtfully prepared favourites"}]}/>
    <section className="section page-width" id="browse"><SectionHeading eyebrow="OUR MENU" title="Browse & Order Your Favourites"/>
      {CAFE.demoMenu&&<div className="demo-banner"><Info size={19}/><div><strong>Menu preview only.</strong> These dishes and prices are taken from the design mockups, not a confirmed café menu. WhatsApp food-order submission stays disabled until the actual menu is supplied.</div></div>}
      <div className="menu-toolbar"><div className="search-box"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search for dishes, coffee, pasta..." aria-label="Search menu"/></div><div className="filter-pills">{["All","Bestseller","Veg","Non-Veg"].map(f=><button className={filter===f?"selected":""} onClick={()=>setFilter(f)} key={f}>{f}</button>)}</div></div>
      <div className="menu-layout"><aside className="category-panel"><div className="categories">{["All",...categories].map((cat,i)=><button key={cat} onClick={()=>setCategory(cat)} className={category===cat?"active":""}><span className="cat-icon">{i===0?<Sparkles size={17}/>:i===1?<Coffee size={17}/>:i===2?<CakeSlice size={17}/>:i===3?<Flame size={17}/>:i===4?<UtensilsCrossed size={17}/>:i===5?<ChefHat size={17}/>:i===6?<Sandwich size={17}/>:<Gift size={17}/>}</span>{cat}</button>)}</div><div className="combo-promo"><span className="script">Coffee Combos</span><p>Explore café favourites and pair your perfect treat.</p><Link href="/reservation">Dine With Us <ArrowRight size={14}/></Link></div></aside>
      <div className="menu-products">{matches.length===0?<div className="empty-state">No items match your filters.</div>:visibleCats.map(cat=>{const entries=matches.filter(x=>x.category===cat);return entries.length?<section className="menu-category" key={cat}><h3><Coffee size={20}/> {cat}</h3><div className="product-grid">{entries.map(item=><ProductCard key={item.id} item={item} add={add}/>)}</div></section>:null;})}</div>
      <MiniCart cart={cart} change={change}/></div>
    </section>
  </>;
}
function MiniCart({cart,change}:{cart:Cart;change:(id:string,diff:number)=>void}) {
  const entries=menu.filter(x=>(cart[x.id]||0)>0); const total=entries.reduce((s,x)=>s+x.price*(cart[x.id]||0),0);
  return <aside className="mini-cart"><h3><ShoppingBasketIcon/> Your Cart ({entries.reduce((s,x)=>s+(cart[x.id]||0),0)})</h3>{entries.length===0?<p className="empty-cart-msg">Your bag is empty. Add something delicious.</p>:<div className="mini-cart-items">{entries.map(x=><div key={x.id}><Photo src={x.image} alt={x.name}/><div><strong>{x.name}</strong><small>{money(x.price)} × {cart[x.id]}</small><div className="qty"><button onClick={()=>change(x.id,-1)} aria-label="Decrease"><Minus size={13}/></button>{cart[x.id]}<button onClick={()=>change(x.id,1)} aria-label="Increase"><Plus size={13}/></button></div></div></div>)}</div>}
    <div className="mini-total"><span>Subtotal</span><b>{money(total)}</b></div><Link className="btn btn-green full" href="/cart">VIEW YOUR CART <ArrowRight size={17}/></Link><div className="whatsapp-hint"><MessageCircle size={25}/><div><strong>WhatsApp ordering</strong><small>Complete your details and send your order once the verified menu is live.</small></div></div></aside>;
}
function ShoppingBasketIcon(){return <ShoppingBag size={22}/>;}
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
function CartPage({cart,change,clear,add}:{cart:Cart;change:(id:string,diff:number)=>void;clear:()=>void;add:(id:string)=>void}) {
  const entries=menu.filter(x=>(cart[x.id]||0)>0); const subtotal=entries.reduce((s,x)=>s+x.price*(cart[x.id]||0),0);
  return <>
    <Hero eyebrow="Your Order" title="My Cart" description="Review your items, update quantities, and proceed to place your order." image={PHOTOS.coffee}/>
    <section className="section page-width cart-layout"><div><div className="cart-heading"><h2><ShoppingCart/> Your Cart <small>({entries.reduce((s,x)=>s+(cart[x.id]||0),0)} items)</small></h2>{entries.length>0&&<button className="text-button" onClick={clear}><Trash2 size={16}/> Clear Cart</button>}</div>{entries.length===0?<div className="cart-empty"><ShoppingBag size={50}/><h3>Your cart is empty</h3><p>There&apos;s something delicious waiting on the menu.</p><ButtonLink href="/menu">EXPLORE MENU <ArrowRight size={16}/></ButtonLink></div>:<div className="cart-items">{entries.map(item=><div className="cart-row" key={item.id}><Photo src={item.image} alt={item.name}/><div><h3>{item.name}</h3><p>{item.description}</p><b>{money(item.price)}</b></div><div className="qty qty-large"><button onClick={()=>change(item.id,-1)} aria-label={"Decrease "+item.name}><Minus size={16}/></button>{cart[item.id]}<button onClick={()=>change(item.id,1)} aria-label={"Increase "+item.name}><Plus size={16}/></button></div><strong>{money(item.price*(cart[item.id]||0))}</strong><button className="remove-item" onClick={()=>change(item.id,-(cart[item.id]||0))} aria-label={"Remove "+item.name}><Trash2 size={18}/></button></div>)}</div>}<Link href="/menu" className="continue-shopping"><ArrowLeft size={17}/> Continue Shopping</Link></div>
    <aside className="order-summary"><h2><ClipboardList/> Order Summary</h2><div><span>Subtotal</span><b>{money(subtotal)}</b></div><div><span>Delivery / Packing</span><span>Confirmed by café</span></div><div className="order-total"><strong>Estimated Total</strong><b>{money(subtotal)}</b></div><Link href={entries.length?"/checkout":"/menu"} className="btn btn-gold full">{entries.length?"PROCEED TO CHECKOUT":"EXPLORE MENU"} <ArrowRight size={17}/></Link><p><Info size={18}/> Delivery or packing charges, if any, will be confirmed by the café.</p></aside></section>
    <section className="section page-width"><SectionHeading eyebrow="FRESH INSPIRATION" title="You May Also Like"/><div className="related-grid">{[menu[13],menu[8],menu[14],menu[2]].map(item=><ProductCard key={item.id} item={item} add={add} compact/>)}</div></section>
    <FeatureStrip features={[{icon:<Truck/>,title:"QUICK ORDER ENQUIRY",desc:"Direct WhatsApp communication"},{icon:<PackageCheck/>,title:"FRESHLY PREPARED",desc:"Made with care"},{icon:<Leaf/>,title:"QUALITY INGREDIENTS",desc:"Always a priority"},{icon:<Coffee/>,title:"GREAT FOOD",desc:"And beverages"}]}/>
  </>;
}
function Checkout({cart,clear}:{cart:Cart;clear:()=>void}) {
  const entries=menu.filter(x=>(cart[x.id]||0)>0);const subtotal=entries.reduce((s,x)=>s+x.price*(cart[x.id]||0),0);
  const [name,setName]=useState("");const [phone,setPhone]=useState("");const [email,setEmail]=useState("");const [type,setType]=useState<"Pickup"|"Delivery">("Pickup");const [address,setAddress]=useState("");const [date,setDate]=useState("");const [time,setTime]=useState("");const [notes,setNotes]=useState("");
  function submit(e:FormEvent){e.preventDefault();if(CAFE.demoMenu)return;const lines=["Hello The Rouché Café, I would like to place an order.","","ORDER ITEMS",...entries.map(x=>"- "+x.name+" x "+cart[x.id]+" = "+money(x.price*cart[x.id])),"","Subtotal: "+money(subtotal),"Delivery or packing charges: To be confirmed","Order type: "+type,"Name: "+name,"Phone: "+phone,"Email: "+(email||"Not provided"),"Requested date: "+date,"Requested time: "+time,...(type==="Delivery"?["Delivery address: "+address]:[]),"Instructions: "+(notes||"None"),"Please confirm the total and availability."];openWa(lines.join("\n"));}
  return <>
    <Hero eyebrow="Checkout" title="Complete Your Order" description="Just a few more details and your café favourites will be ready for you." image={PHOTOS.coffee}/>
    <div className="checkout-steps page-width"><span className="done"><CheckCircle2/> Cart</span><i/><span className="current"><MapPin/> Details</span><i/><span><ClipboardList/> Review</span><i/><span><MessageCircle/> Café Confirmation</span></div>
    {CAFE.demoMenu&&<div className="page-width demo-banner"><Info size={20}/><div><strong>Checkout preview.</strong> The design-menu data is not verified, so live food orders are disabled. Replace the sample menu and set demoMenu to false after approval.</div></div>}
    <form className="section page-width checkout-layout" onSubmit={submit}><div className="checkout-form"><section className="form-section"><h2><Users/> Customer Details</h2><div className="form-two"><label>Full Name *<input required value={name} onChange={e=>setName(e.target.value)} placeholder="Your name"/></label><label>Phone Number *<input required minLength={10} inputMode="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+91 ..."/></label></div><label>Email Address (optional)<input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/></label></section>
      <section className="form-section"><h2><ShoppingBag/> Order Type</h2><div className="type-choice"><button type="button" className={type==="Pickup"?"selected":""} onClick={()=>setType("Pickup")}><ShoppingBag size={30}/><strong>Pickup (Takeaway)</strong><small>I&apos;ll collect my order from the café</small></button><button type="button" className={type==="Delivery"?"selected":""} onClick={()=>setType("Delivery")}><Truck size={31}/><strong>Home Delivery</strong><small>Subject to café service area confirmation</small></button></div>{type==="Delivery"&&<label>Delivery Address *<textarea required value={address} onChange={e=>setAddress(e.target.value)} placeholder="House, street, landmark, area and city" rows={3}/></label>}</section>
      <section className="form-section"><h2><Clock3/> Preferred {type==="Pickup"?"Pickup":"Delivery"} Time</h2><div className="form-two"><label>Date *<input type="date" required min={new Date().toLocaleDateString("en-CA")} value={date} onChange={e=>setDate(e.target.value)}/></label><label>Time *<select required value={time} onChange={e=>setTime(e.target.value)}><option value="">Select time</option>{reservationTimes.map(x=><option key={x}>{x}</option>)}</select></label></div></section>
      <section className="form-section"><h2><MessageCircle/> Special Instructions (optional)</h2><textarea rows={4} value={notes} onChange={e=>setNotes(e.target.value)} placeholder="No onion, extra cheese, dietary notes..."/></section></div>
      <aside className="order-summary checkout-summary"><h2><ClipboardList/> Order Summary</h2>{entries.length===0?<p>Your cart is empty. <Link href="/menu">Explore the menu</Link></p>:entries.map(item=><div className="summary-item" key={item.id}><Photo src={item.image} alt={item.name}/><span><strong>{item.name}</strong><small>{money(item.price)} × {cart[item.id]}</small></span><b>{money(item.price*cart[item.id])}</b></div>)}<div><span>Subtotal</span><b>{money(subtotal)}</b></div><div><span>Delivery / Packing</span><span>To be confirmed</span></div><div className="order-total"><strong>Estimated Total</strong><b>{money(subtotal)}</b></div><button type="submit" className="btn btn-gold full" disabled={CAFE.demoMenu||entries.length===0}><MessageCircle size={18}/> {CAFE.demoMenu?"ORDERS AVAILABLE AFTER MENU APPROVAL":"PLACE ORDER ON WHATSAPP"} <ArrowRight size={17}/></button><p><Info size={18}/> The café confirms final charges and order acceptance on WhatsApp. No online payment is collected.</p></aside></form>
    <FeatureStrip features={[{icon:<Truck/>,title:"CONVENIENT",desc:"Pickup and delivery enquiries"},{icon:<ShieldCheck/>,title:"NO ONLINE PAYMENT",desc:"Confirm directly with café"},{icon:<Leaf/>,title:"QUALITY INGREDIENTS",desc:"Prepared with care"},{icon:<Heart/>,title:"SERVED WITH LOVE",desc:"A welcoming café experience"}]}/>
  </>;
}
function Blog(){
  return <><Hero eyebrow="From Our Café" title="Stories & Sips" description="A space for coffee stories, café updates, seasonal favourites and the moments that make The Rouché special." image={PHOTOS.cafe}/><section className="section page-width blog-content"><SectionHeading eyebrow="THE CAFÉ JOURNAL" title="Something Wonderful Is Brewing"/><div className="blog-intro"><Coffee size={44}/><h3>Our journal is coming soon</h3><p>We&apos;ll share real café stories, news, seasonal menus and celebrations here once the content is ready.</p><ButtonLink href="/gallery">EXPLORE GALLERY <ArrowRight size={16}/></ButtonLink></div></section></>;
}
export default function CafeSite() {
  const pathname=usePathname();
  const [cart,setCart]=useState<Cart>({});const [hydrated,setHydrated]=useState(false);const [toast,setToast]=useState("");
  useEffect(()=>{try{const raw=localStorage.getItem("rouche-cart");if(raw){const parsed:unknown=JSON.parse(raw);if(parsed&&typeof parsed==="object"&&!Array.isArray(parsed)){const allowed=new Set(menu.map(x=>x.id));const safe:Cart={};for(const [k,v] of Object.entries(parsed as Record<string,unknown>)){if(allowed.has(k)&&typeof v==="number"&&Number.isInteger(v)&&v>0&&v<100)safe[k]=v;}setCart(safe);}}}catch{}setHydrated(true);},[]);
  useEffect(()=>{if(hydrated)localStorage.setItem("rouche-cart",JSON.stringify(cart));},[cart,hydrated]);
  useEffect(()=>{if(toast){const timer=setTimeout(()=>setToast(""),2200);return()=>clearTimeout(timer);}},[toast]);
  const change=(id:string,diff:number)=>setCart(c=>{const n=Math.max(0,Math.min(99,(c[id]||0)+diff));const out={...c};if(n===0)delete out[id];else out[id]=n;return out;});
  const add=(id:string)=>{change(id,1);const item=menu.find(x=>x.id===id);setToast(item?item.name+" added to cart":"Item added");};
  const clear=()=>setCart({});
  const count=useMemo(()=>Object.values(cart).reduce((s,x)=>s+x,0),[cart]);
  const route=(pathname||"/").split("/").filter(Boolean)[0]||"home";
  const current:Record<string,React.ReactNode>={
    home:<HomePage/>,about:<AboutPage/>,menu:<MenuPage add={add} cart={cart} change={change}/>,
    reservation:<Reservation/>,gallery:<Gallery/>,contact:<Contact/>,
    cart:<CartPage cart={cart} change={change} clear={clear} add={add}/>,
    checkout:<Checkout cart={cart} clear={clear}/>,blog:<Blog/>
  };
  return <><SiteHeader cartCount={count}/><main id="main">{current[route]||<section className="section page-width not-found"><h1>Page not found</h1><ButtonLink href="/">RETURN HOME</ButtonLink></section>}</main><SiteFooter/>{toast&&<div className="cart-toast" role="status"><CheckCircle2 size={18}/>{toast}<Link href="/cart">View cart</Link></div>}</>;
}
