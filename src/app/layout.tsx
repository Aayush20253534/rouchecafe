import type { Metadata, Viewport } from "next";
import "./tailwind.css";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "The Rouché Café | Good Coffee, Brighter Days",
    template: "%s | The Rouché Café",
  },
  description:
    "Discover The Rouché Café: handcrafted beverages, delicious food, a welcoming atmosphere, and convenient table booking in Prayagraj.",
  applicationName: "The Rouché Café",
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#073e2b",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
