import assert from "node:assert/strict";
import test from "node:test";
import {
  canonicalFor, cafeStructuredData, descriptionFor,
  productionBaseUrl, safeJsonLd, shouldIndex, PUBLIC_ROUTES,
} from "../src/lib/seo";
import { isPageKey, PAGE_TITLES } from "../src/lib/routes";
import { CAFE } from "../src/lib/site";

test("production base URL rejects localhost and placeholders", () => {
  assert.equal(productionBaseUrl("http://localhost:3000"), null);
  assert.equal(productionBaseUrl("https://example.com"), null);
  assert.equal(productionBaseUrl("https://rouche.example.com"), null);
  assert.equal(productionBaseUrl("https://rouchecafe.vercel.app/path"), null);
  assert.equal(productionBaseUrl("https://user:password@rouchecafe.com"), null);
  assert.equal(productionBaseUrl("https://rouchecafe.vercel.app")?.origin, "https://rouchecafe.vercel.app");
});

test("only approved public routes are indexable", () => {
  const base = productionBaseUrl("https://therouchecafe.example.org");
  assert.ok(base);
  assert.equal(shouldIndex("home", base), true);
  assert.equal(shouldIndex("about", base), true);
  assert.equal(shouldIndex("reservation", base), true);
  assert.equal(shouldIndex("contact", base), true);
  assert.equal(shouldIndex("cart", base), false);
  assert.equal(shouldIndex("checkout", base), false);
  assert.equal(shouldIndex("menu", base), false);
  assert.equal(shouldIndex("gallery", base), false);
  assert.equal(shouldIndex("blog", base), false);
  assert.equal(shouldIndex("home", null), false);
});

test("canonical URLs respect the production host", () => {
  const base = productionBaseUrl("https://rouchecafe.vercel.app");
  assert.equal(canonicalFor("home", base), "https://rouchecafe.vercel.app/");
  assert.equal(canonicalFor("contact", base), "https://rouchecafe.vercel.app/contact");
  assert.equal(canonicalFor("cart", base), undefined);
  assert.equal(canonicalFor("home", null), undefined);
});

test("public routes have titles and meaningful descriptions", () => {
  for (const path of PUBLIC_ROUTES) {
    const key = path === "/" ? "home" : path.slice(1);
    assert.ok(isPageKey(key));
    assert.ok(PAGE_TITLES[key as keyof typeof PAGE_TITLES]);
    assert.ok(descriptionFor(key as keyof typeof PAGE_TITLES).length > 75);
  }
});

test("structured data avoids unconfirmed ratings, fees, hours or addresses", () => {
  const schema = cafeStructuredData(productionBaseUrl("https://rouchecafe.vercel.app"));
  assert.equal(schema["@type"], "CafeOrCoffeeShop");
  assert.equal(schema["telephone"], "+" + CAFE.whatsapp);
  assert.equal(schema["hasMap"], CAFE.mapUrl);
  assert.equal(schema["url"], "https://rouchecafe.vercel.app/");
  assert.equal(schema["aggregateRating"], undefined);
  assert.equal(schema["openingHours"], undefined);
  assert.equal(schema["priceRange"], undefined);
  assert.equal(schema["streetAddress"], undefined);
  assert.equal(schema["menu"], undefined);
  assert.ok(!safeJsonLd({ x: "</script><script>alert(1)</script>" }).includes("</script>"));
});
