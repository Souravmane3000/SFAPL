import type { Metadata } from "next";
import { BusinessCta, PageHero, ProductCard } from "@/components/content-components";
import { publishedProducts } from "@/data/products";

export const metadata: Metadata = {
  title: "Products",
  description: "Explore raisins, turmeric, jaggery, and rice from Sourav Food & Agro.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Product portfolio"
        title="Agricultural products for business buyers."
        copy="Explore the four core product categories and send a product-specific enquiry for current commercial details."
      />
      <section className="section-space">
        <div className="container-shell grid gap-6 md:grid-cols-2">
          {publishedProducts.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>
      <BusinessCta />
    </>
  );
}
