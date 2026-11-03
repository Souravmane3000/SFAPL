import type { Metadata } from "next";
import Image from "next/image";
import { BusinessCta, ButtonLink, PageHero } from "@/components/content-components";
import { CategoryMark } from "@/components/graphics/motifs";
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
        image="/images/products/raisins-hero.png"
        imageAlt=""
      />
      <div className="sticky top-16 z-30 border-b border-stone-200 bg-stone-50/90 backdrop-blur md:top-20">
        <nav aria-label="Product categories" className="container-shell flex gap-2 overflow-x-auto py-3">
          {publishedProducts.map((product) => (
            <a key={product.id} href={`#${product.slug}`} className="focus-ring inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-stone-200 bg-white px-4 text-sm font-bold text-stone-800">
              <CategoryMark category={product.id} />
              {product.name}
            </a>
          ))}
        </nav>
      </div>
      <section className="section-space">
        <div className="container-shell space-y-20">
          {publishedProducts.map((product, index) => (
            <article id={product.slug} key={product.id} className="grid scroll-mt-36 items-center gap-8 lg:grid-cols-2 lg:gap-14">
              <div className={`media-frame aspect-[5/4] ${index % 2 ? "lg:order-2" : ""}`}>
                <Image src={product.heroImage} alt={`${product.name} presented for business buyers`} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              </div>
              <div>
                <p className="eyebrow">{product.eyebrow}</p>
                <h2 className="mt-4 font-display text-5xl font-semibold tracking-[-0.04em]">{product.name}</h2>
                <p className="mt-5 max-w-xl text-lg leading-8 text-stone-600">{product.longDescription}</p>
                <div className="mt-8"><ButtonLink href={`/products/${product.slug}`}>Explore {product.name}</ButtonLink></div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <BusinessCta />
    </>
  );
}
