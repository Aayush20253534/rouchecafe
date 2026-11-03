export const CAFE = {
  name: "The Rouché Café",
  tagline: "Good Coffee, Brighter Days",
  whatsapp: "919935754959",
  displayPhone: "+91 99357 54959",
  mapUrl: "https://maps.app.goo.gl/hFJA5p2F91QixMgQ7",
  location: "Prayagraj, Uttar Pradesh",
  // Keep true until the owner confirms the actual menu, prices and fulfilment.
  demoMenu: true
} as const;

// Café photo references and demo menu are kept in independent modules for easy replacement.
export { PHOTOS } from "@/lib/photos";
export { categories, menu } from "@/data/menu";
export type { MenuItem } from "@/data/menu";

export const money = (value:number) => "₹" + value.toLocaleString("en-IN");
export const waLink = (text:string) => "https://wa.me/" + CAFE.whatsapp + "?text=" + encodeURIComponent(text);
