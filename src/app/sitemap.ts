import type { MetadataRoute } from "next";
import { publishedProducts } from "@/data/products";

const origin = "https://www.souravfoodandagro.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/products", "/quality", "/business", "/contact"];
  return [
    ...routes.map((route, index) => ({
      url: `${origin}${route}`,
      lastModified: new Date(),
      changeFrequency: index === 0 ? ("monthly" as const) : ("yearly" as const),
      priority: index === 0 ? 1 : 0.8,
    })),
    ...publishedProducts.map((product) => ({
      url: `${origin}/products/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
  ];
}
