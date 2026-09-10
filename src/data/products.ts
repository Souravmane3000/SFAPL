import type { Product } from "@/types";

export const products: Product[] = [
  {
    id: "raisins",
    slug: "raisins",
    name: "Raisins",
    eyebrow: "Our flagship product",
    tagline: "Distinctive raisin varieties for discerning business buyers.",
    description:
      "Green, golden, black, and brown raisins presented for wholesale and business enquiries.",
    longDescription:
      "Raisins are central to the Sourav Food & Agro story. The company works from Maharashtra's Sangli agricultural region and follows quality checks from raw-material procurement through pre-dispatch inspection.",
    heroImage: "/images/products/raisins-hero.png",
    galleryImages: [
      "/images/products/golden-raisins.png",
      "/images/products/green-raisins.png",
      "/images/products/black-raisins.png",
      "/images/products/brown-raisins.png",
    ],
    variants: [
      { id: "golden", label: "Golden raisins", image: "/images/products/golden-raisins.png", status: "verified" },
      { id: "green", label: "Green raisins", image: "/images/products/green-raisins.png", status: "verified" },
      { id: "black", label: "Black raisins", image: "/images/products/black-raisins.png", status: "pending" },
      { id: "brown", label: "Brown raisins", image: "/images/products/brown-raisins.png", status: "verified" },
    ],
    applications: ["Wholesale supply", "Food manufacturing", "Bakery and confectionery", "Gift packing"],
    status: "verified",
    featured: true,
    sortOrder: 1,
  },
  {
    id: "turmeric",
    slug: "turmeric",
    name: "Turmeric",
    eyebrow: "Indian spice",
    tagline: "Whole turmeric fingers and finely ground turmeric powder.",
    description:
      "A versatile agricultural product supplied for wholesale and food-industry requirements.",
    longDescription:
      "Turmeric is offered as a core product category for business buyers. Procurement and dispatch checks form part of the company's stated quality approach.",
    heroImage: "/images/products/turmeric-hero.png",
    galleryImages: ["/images/products/turmeric-fingers.png", "/images/products/turmeric-powder.png"],
    variants: [
      { id: "fingers", label: "Turmeric fingers", image: "/images/products/turmeric-fingers.png", status: "verified" },
      { id: "powder", label: "Turmeric powder", image: "/images/products/turmeric-powder.png", status: "verified" },
    ],
    applications: ["Wholesale supply", "Food manufacturing", "Spice trade"],
    status: "verified",
    featured: true,
    sortOrder: 2,
  },
  {
    id: "jaggery",
    slug: "jaggery",
    name: "Jaggery",
    eyebrow: "Traditional ingredient",
    tagline: "An established product category for wholesale enquiries.",
    description:
      "Jaggery forms part of the company's official agricultural food portfolio.",
    longDescription:
      "Sourav Food & Agro lists jaggery among its four core product categories. Current forms, grades, packaging sizes, and order quantities are available through a direct enquiry.",
    heroImage: "/images/products/jaggery-hero.png",
    galleryImages: [],
    variants: [],
    applications: ["Wholesale supply", "Food manufacturing"],
    status: "verified",
    featured: true,
    sortOrder: 3,
  },
  {
    id: "rice",
    slug: "rice",
    name: "Rice",
    eyebrow: "Staple grain",
    tagline: "Rice supplied for business and wholesale requirements.",
    description:
      "A core product category supported by direct product and quantity enquiries.",
    longDescription:
      "Rice is part of the official Sourav Food & Agro product portfolio. Variety, grade, packaging, and commercial details are shared against buyer requirements.",
    heroImage: "/images/products/rice-hero.png",
    galleryImages: [],
    variants: [],
    applications: ["Wholesale supply", "Food-industry requirements"],
    status: "verified",
    featured: false,
    sortOrder: 4,
  },
];

export const publishedProducts = products
  .filter((product) => product.status === "verified")
  .sort((a, b) => a.sortOrder - b.sortOrder);

export function getProductBySlug(slug: string) {
  return publishedProducts.find((product) => product.slug === slug);
}

export function getPublishedVariants(product: Product) {
  return product.variants.filter((variant) => variant.status === "verified");
}
