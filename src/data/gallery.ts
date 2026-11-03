import { PHOTOS } from "@/lib/photos";

export type GalleryCategory = "All" | "Ambience" | "Food" | "Beverages" | "Events" | "Celebrations";
export type GalleryItem = {
  id: string;
  category: Exclude<GalleryCategory, "All">;
  src: string;
  alt: string;
  caption: string;
  /** All current photos are illustrative until the café supplies its actual images. */
  placeholder: boolean;
};

export const GALLERY_CATEGORIES: readonly GalleryCategory[] = [
  "All", "Ambience", "Food", "Beverages", "Events", "Celebrations",
];

/**
 * Temporary photography. Replace with /images/gallery/*.webp when the client
 * sends real photos. IDs remain stable to support filtering and lightbox keys.
 */
export const GALLERY_ITEMS: readonly GalleryItem[] = [
  { id: "interior-main", category: "Ambience", src: PHOTOS.interior, alt: "Illustrative café interior with dining tables", caption: "A cozy café setting", placeholder: true },
  { id: "cappuccino", category: "Beverages", src: PHOTOS.cappuccino, alt: "Illustrative cappuccino photograph", caption: "Coffee moments", placeholder: true },
  { id: "chocolate-dessert", category: "Food", src: PHOTOS.brownie, alt: "Illustrative chocolate dessert", caption: "Sweet indulgence", placeholder: true },
  { id: "pasta", category: "Food", src: PHOTOS.pasta, alt: "Illustrative pasta dish", caption: "Comfort food", placeholder: true },
  { id: "cake", category: "Celebrations", src: PHOTOS.cake, alt: "Illustrative cake photograph", caption: "Celebration treats", placeholder: true },
  { id: "cafe-seating", category: "Ambience", src: PHOTOS.interior2, alt: "Illustrative café seating", caption: "A relaxed corner", placeholder: true },
  { id: "iced-coffee", category: "Beverages", src: PHOTOS.icedCoffee, alt: "Illustrative iced coffee", caption: "Refreshing sips", placeholder: true },
  { id: "fresh-plate", category: "Food", src: PHOTOS.salad, alt: "Illustrative plated food", caption: "Fresh flavours", placeholder: true },
  { id: "pastry", category: "Food", src: PHOTOS.croissant, alt: "Illustrative buttery pastry", caption: "Freshly baked", placeholder: true },
  { id: "warm-interior", category: "Ambience", src: PHOTOS.cafe, alt: "Illustrative warm coffee shop", caption: "A warm welcome", placeholder: true },
  { id: "friends", category: "Events", src: PHOTOS.group, alt: "Illustrative group gathering", caption: "Gather together", placeholder: true },
  { id: "matcha", category: "Beverages", src: PHOTOS.matcha, alt: "Illustrative matcha beverage", caption: "Something different", placeholder: true },
  { id: "pancakes", category: "Food", src: PHOTOS.pancakes, alt: "Illustrative breakfast plate", caption: "Morning favourites", placeholder: true },
  { id: "birthday", category: "Celebrations", src: PHOTOS.cake, alt: "Illustrative celebration cake", caption: "Special occasions", placeholder: true },
  { id: "coffee-cup", category: "Beverages", src: PHOTOS.coffee, alt: "Illustrative coffee cup", caption: "Crafted with care", placeholder: true },
];

export function filterGallery(category: GalleryCategory): GalleryItem[] {
  return GALLERY_ITEMS.filter((item) => category === "All" || item.category === category);
}
