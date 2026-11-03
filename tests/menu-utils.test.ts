import assert from "node:assert/strict";
import test from "node:test";
import { menu, categories } from "../src/data/menu";
import { CAFE } from "../src/lib/site";
import { cartEntries, cartItemCount, cartSubtotal, filterMenu } from "../src/lib/menu-utils";

test("sample catalogue is structurally valid and disabled for live orders", () => {
  assert.equal(CAFE.demoMenu, true);
  assert.ok(menu.length > 0);
  assert.equal(new Set(menu.map(item => item.id)).size, menu.length);
  for (const item of menu) {
    assert.ok(item.price >= 0 && Number.isFinite(item.price));
    assert.ok(item.name.trim());
    assert.ok(categories.includes(item.category));
  }
});

test("search is case insensitive, matches descriptions and trims whitespace", () => {
  const found = filterMenu(menu, { category:"All", filter:"All", query:"   CAPPUCCINO   " });
  assert.equal(found.length, 1);
  assert.equal(found[0].id, "cappuccino");
  const described = filterMenu(menu, {category:"All",filter:"All",query:"buttery"});
  assert.ok(described.some(item=>item.id==="croissant"));
});

test("category and dietary filters combine and respect bestseller flags", () => {
  const drinks = filterMenu(menu, { category:"Coffee & Beverages", filter:"Veg", query:"" });
  assert.ok(drinks.length > 0);
  assert.ok(drinks.every(item=>item.category==="Coffee & Beverages" && item.veg));
  const best = filterMenu(menu, { category:"All",filter:"Bestseller",query:"" });
  assert.ok(best.length>0 && best.every(item=>item.bestseller));
  const nonVeg = filterMenu(menu, { category:"All",filter:"Non-Veg",query:"" });
  assert.ok(nonVeg.length>0 && nonVeg.every(item=>!item.veg));
  const empty = filterMenu(menu,{category:"Chef's Special",filter:"All",query:""});
  assert.equal(empty.length,0);
});

test("cart count and subtotal use only known menu items", () => {
  const cart = {cappuccino:2,croissant:1,unknown:3};
  assert.equal(cartEntries(menu,cart).length,2);
  assert.equal(cartSubtotal(menu,cart), 2*260+180);
  assert.equal(cartItemCount(cart),6);
  assert.equal(cartSubtotal(menu,{}),0);
});
