import type { Metadata } from "next";
import CafeSite from "@/components/CafeSite";

const titles: Record<string,string> = {
  about: "About Us", menu: "Explore Our Menu", reservation: "Reserve a Table",
  gallery: "Gallery", blog: "Journal", contact: "Contact Us",
  cart: "Your Cart", checkout: "Checkout"
};

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug?: string[] }>
}): Promise<Metadata> {
  const { slug = [] } = await params;
  const key = slug[0] || "home";
  return { title: titles[key] || "Good Coffee, Brighter Days" };
}

export default function SitePage() {
  return <CafeSite />;
}
