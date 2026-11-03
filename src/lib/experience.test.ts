import assert from "node:assert/strict";
import test from "node:test";
import { enquiryDeliveryStatus, enquirySchema } from "./enquiry.ts";
import { trapTabTarget } from "./focus-trap.ts";
import { publishedGallery } from "./gallery.ts";
import { nextStoryIndex, revealMotion, storyDeltaFromKey } from "./story.ts";
import type { Product } from "../types/index.ts";

const raisin: Product = {
  id: "raisins",
  slug: "raisins",
  name: "Raisins",
  eyebrow: "Flagship",
  tagline: "Raisins",
  description: "Raisins",
  longDescription: "Raisins",
  heroImage: "/images/products/raisins-hero.png",
  galleryImages: ["/images/products/black-raisins.png"],
  variants: [
    { id: "golden", label: "Golden raisins", image: "/images/products/golden-raisins.png", status: "verified" },
    { id: "black", label: "Black raisins", image: "/images/products/black-raisins.png", status: "pending" },
  ],
  applications: [],
  status: "verified",
  featured: true,
  sortOrder: 1,
};

test("product story and gallery keyboard selection wraps", () => {
  assert.equal(storyDeltaFromKey("ArrowRight"), 1);
  assert.equal(storyDeltaFromKey("ArrowUp"), -1);
  assert.equal(storyDeltaFromKey("Enter"), null);
  assert.equal(nextStoryIndex(3, 4, 1), 0);
  assert.equal(nextStoryIndex(0, 4, -1), 3);
  assert.equal(nextStoryIndex(0, 0, 1), 0);
});

test("published gallery hides pending varieties", () => {
  const images = publishedGallery(raisin);
  assert.deepEqual(images.map((image) => image.src), [
    "/images/products/raisins-hero.png",
    "/images/products/golden-raisins.png",
  ]);
});

test("mobile menu traps tab and closes on escape", () => {
  assert.equal(trapTabTarget("Escape", false, false, false), "close");
  assert.equal(trapTabTarget("Tab", false, false, true), "first");
  assert.equal(trapTabTarget("Tab", true, true, false), "last");
  assert.equal(trapTabTarget("Tab", false, false, false), null);
});

test("reduced motion keeps content visible without an entrance offset", () => {
  assert.equal(revealMotion(true).initial, false);
  assert.deepEqual(revealMotion(false).initial, { opacity: 0, y: 22 });
});

test("enquiry states succeed only after a configured provider accepts", () => {
  assert.equal(enquiryDeliveryStatus(false, false), "error");
  assert.equal(enquiryDeliveryStatus(true, false), "error");
  assert.equal(enquiryDeliveryStatus(true, true), "success");
  const valid = enquirySchema.safeParse({
    name: "Asha Rao",
    email: "asha@example.com",
    phone: "2332226291",
    productInterest: "Raisins",
    website: "",
  });
  const invalid = enquirySchema.safeParse({
    name: "A",
    email: "not-an-email",
    phone: "12",
    productInterest: "",
    message: "x".repeat(501),
    website: "https://spam.example",
  });
  assert.equal(valid.success, true);
  assert.equal(invalid.success, false);
});
