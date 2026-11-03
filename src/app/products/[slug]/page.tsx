import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { notFound } from "next/navigation";
import { ButtonLink, ProductCard } from "@/components/content-components";
import { EnquiryForm } from "@/components/enquiry-form";
import { ProductGallery } from "@/components/product-gallery";
import { company } from "@/data/company";
import { getProductBySlug, publishedProducts } from "@/data/products";
import { publishedGallery } from "@/lib/gallery";

export function generateStaticParams() {
  return publishedProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: { images: [{ url: product.heroImage }] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const gallery = publishedGallery(product);
  const related = publishedProducts.filter((item) => item.id !== product.id).slice(0, 3);
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: [`https://www.souravfoodandagro.com${product.heroImage}`],
    manufacturer: { "@type": "Organization", name: company.legalName },
  };

  return (
    <>
      <section className="bg-amber-50">
        <div className="grid min-h-[44rem] lg:grid-cols-2">
          <div className="container-shell flex w-full items-center py-16 lg:max-w-none lg:pl-[max(2.5rem,calc((100vw-80rem)/2))] lg:pr-16">
            <div>
              <Link href="/products" className="focus-ring mb-12 inline-flex items-center gap-2 rounded-sm text-sm font-bold text-forest-700">
                <ArrowLeft className="size-4" aria-hidden="true" /> All products
              </Link>
              <p className="eyebrow">{product.eyebrow}</p>
              <h1 className="display-title mt-5">{product.name}</h1>
              <p className="body-large mt-6 max-w-xl">{product.tagline}</p>
              <div className="mt-9"><ButtonLink href="#product-enquiry">Request a quote</ButtonLink></div>
            </div>
          </div>
          <div className="relative min-h-[25rem] p-6 lg:min-h-full lg:p-10">
            <ProductGallery images={gallery} label={product.slug} />
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell grid gap-12 lg:grid-cols-[1.2fr_.8fr]">
          <div>
            <p className="eyebrow">Product overview</p>
            <h2 className="section-title mt-5">Clear information for a confident enquiry.</h2>
            <p className="body-large mt-7 max-w-3xl">{product.longDescription}</p>
          </div>
          <aside className="h-fit rounded-[2rem] bg-forest-50 p-7 md:p-9 lg:sticky lg:top-28">
            <h2 className="font-sans text-xl font-bold">Common business requirements</h2>
            <ul className="mt-6 space-y-4">
              {product.applications.map((application) => (
                <li key={application} className="flex gap-3 text-sm leading-6 text-stone-700">
                  <Check className="mt-1 size-4 shrink-0 text-forest-700" aria-hidden="true" />
                  {application}
                </li>
              ))}
            </ul>
            <div className="mt-8 border-t border-forest-200 pt-7">
              <p className="text-sm leading-6 text-stone-600">
                Packaging, grade, quantity, and commercial details are shared against your requirement.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section id="product-enquiry" className="section-space bg-amber-50 scroll-mt-24">
        <div className="container-shell grid gap-12 lg:grid-cols-[.75fr_1.25fr]">
          <div>
            <p className="eyebrow">Product enquiry</p>
            <h2 className="section-title mt-5">Tell us what you need.</h2>
            <p className="body-large mt-5">Share the quantity and destination so the team can understand your {product.name.toLowerCase()} requirement.</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-card md:p-9">
            <EnquiryForm defaultProduct={product.name} />
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell">
          <h2 className="section-title">Explore related products.</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {related.map((item) => <ProductCard key={item.id} product={item} />)}
          </div>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema).replace(/</g, "\\u003c") }} />
    </>
  );
}
