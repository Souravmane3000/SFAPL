import type { Product } from "@/types";

export function publishedGallery(product: Product) {
  return [
    { src: product.heroImage, alt: `${product.name} product presentation` },
    ...product.variants.flatMap((variant) =>
      variant.status === "verified" && variant.image ? [{ src: variant.image, alt: variant.label }] : [],
    ),
  ];
}
