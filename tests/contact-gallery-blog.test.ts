import test from "node:test";
import assert from "node:assert/strict";
import { CONTACT_SUBJECTS, EMPTY_CONTACT, validateContact, formatContactRequest, validatedMapsEmbedUrl } from "../src/lib/contact";
import { GALLERY_CATEGORIES, GALLERY_ITEMS, filterGallery } from "../src/data/gallery";
import { BLOG_POSTS, filterBlogPosts, BLOG_CATEGORIES } from "../src/data/blog";
import { VERIFIED_SOCIAL_PROFILES } from "../src/lib/social";

test("gallery has stable unique identifiers and every category is filterable", () => {
  assert.equal(new Set(GALLERY_ITEMS.map((item) => item.id)).size, GALLERY_ITEMS.length);
  assert.equal(filterGallery("All").length, GALLERY_ITEMS.length);
  for (const category of GALLERY_CATEGORIES) {
    const result = filterGallery(category);
    assert.ok(result.every((item) => category === "All" || item.category === category));
  }
  assert.ok(GALLERY_ITEMS.every((item) => item.placeholder));
});

test("blog deliberately starts without invented posts", () => {
  assert.equal(BLOG_POSTS.length, 0);
  assert.deepEqual(filterBlogPosts("All"), []);
  assert.deepEqual(filterBlogPosts(BLOG_CATEGORIES[0]), []);
  assert.deepEqual(VERIFIED_SOCIAL_PROFILES, []);
});

const valid = {
  ...EMPTY_CONTACT,
  name: "Example Customer",
  phone: "+91 9935754959",
  subject: CONTACT_SUBJECTS[3],
  message: "I would like to enquire about an event.",
};

test("contact validates required fields and optional email", () => {
  assert.deepEqual(validateContact(valid), []);
  assert.ok(validateContact({...valid, phone: "123"}).some((error) => error.includes("phone")));
  assert.ok(validateContact({...valid, message: "Hi"}).some((error) => error.includes("message")));
  assert.ok(validateContact({...valid, email: "x@invalid"}).some((error) => error.includes("email")));
  assert.deepEqual(validateContact({...valid, email: "guest@example.com"}), []);
});

test("contact WhatsApp request includes contact details and normalizes line breaks", () => {
  const message = formatContactRequest({...valid, message: "Birthday\nsetup enquiry"});
  assert.match(message, /Example Customer/);
  assert.match(message, /Subject: Private Event/);
  assert.match(message, /Birthday setup enquiry/);
  assert.match(message, /Email: Not provided/);
  assert.doesNotMatch(message, /Message sent|Enquiry received/);
});

test("Maps embed whitelist prevents arbitrary iframe URLs", () => {
  assert.equal(validatedMapsEmbedUrl(undefined), null);
  assert.equal(validatedMapsEmbedUrl("https://example.org/maps/embed"), null);
  assert.equal(validatedMapsEmbedUrl("javascript:alert(1)"), null);
  assert.equal(validatedMapsEmbedUrl("https://www.google.com/maps/embed?pb=abc"), "https://www.google.com/maps/embed?pb=abc");
});
