import type { Metadata, Viewport } from "next";
import { CAFE } from "@/lib/site";
import { cafeStructuredData, productionBaseUrl, safeJsonLd } from "@/lib/seo";
import "./tailwind.css";
import "./tokens.css";
import "./globals.css";
import "./home-about.css";
import "./menu.css";
import "./ordering.css";
import "./reservation.css";
import "./showcase.css";
import "./quality.css";

const siteUrl = productionBaseUrl();

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: siteUrl } : {}),
  title: {
    default: CAFE.name + " | " + CAFE.tagline,
    template: "%s | " + CAFE.name,
  },
  description: "Visit The Rouché Café in Prayagraj for food and coffee. Reach the café directly to confirm opening hours and request a table.",
  applicationName: CAFE.name,
  robots: { index: Boolean(siteUrl), follow: Boolean(siteUrl) },
  icons: { icon: "/icon.svg" },
  category: "food",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#073e2b",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const schema = safeJsonLd(cafeStructuredData(siteUrl));
  return (
    <html lang="en-IN">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schema }}
        />
        {children}
      </body>
    </html>
  );
}
