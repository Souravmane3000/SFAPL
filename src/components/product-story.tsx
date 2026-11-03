"use client";

import Image from "next/image";
import { useState } from "react";
import { ButtonLink } from "@/components/content-components";
import { CategoryMark } from "@/components/graphics/motifs";
import { nextStoryIndex, storyDeltaFromKey } from "@/lib/story";
import type { Product } from "@/types";

export function ProductStory({ products }: { products: Product[] }) {
  const [active, setActive] = useState(0);
  const product = products[active] ?? products[0];
  if (!product) return null;

  return (
    <section id="products" className="section-space bg-stone-50">
      <div className="container-shell grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
        <div className="media-frame aspect-[4/5] min-h-[28rem] lg:sticky lg:top-28">
          {products.map((item, index) => (
            <Image key={item.id} src={item.heroImage} alt="" fill sizes="(max-width: 1024px) 100vw, 50vw" className={`object-cover transition-opacity duration-700 ${index === active ? "opacity-100" : "opacity-0"}`} />
          ))}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-950/80 to-transparent p-7 text-white">
            <p className="text-xs font-bold tracking-[0.12em] text-amber-300">{product.eyebrow}</p>
            <p className="mt-2 font-display text-5xl">{product.name}</p>
          </div>
        </div>
        <div>
          <p className="eyebrow">Our products</p>
          <h2 className="section-title mt-4">A focused agricultural portfolio.</h2>
          <p className="body-large mt-5">Four core categories, presented clearly for wholesale and business buyers.</p>
          <div role="tablist" aria-label="Product categories" className="mt-8 grid grid-cols-2 gap-3" onKeyDown={(event) => {
            const delta = storyDeltaFromKey(event.key);
            if (delta === null) return;
            event.preventDefault();
            const next = nextStoryIndex(active, products.length, delta);
            setActive(next);
            document.getElementById(`product-tab-${products[next]?.id}`)?.focus();
          }}>
            {products.map((item, index) => (
              <button key={item.id} id={`product-tab-${item.id}`} role="tab" type="button" aria-selected={index === active} aria-controls="product-story-panel" tabIndex={index === active ? 0 : -1} className={`focus-ring flex min-h-14 items-center gap-3 rounded-2xl border px-4 text-left text-sm font-bold transition-colors ${index === active ? "border-forest-800 bg-forest-900 text-white" : "border-stone-200 bg-white text-stone-800 hover:border-forest-300"}`} onClick={() => setActive(index)}>
                <CategoryMark category={item.id} />{item.name}
              </button>
            ))}
          </div>
          <div id="product-story-panel" role="tabpanel" aria-labelledby={`product-tab-${product.id}`} className="mt-7">
            <p className="text-lg leading-8 text-stone-700">{product.longDescription}</p>
            <div className="mt-7"><ButtonLink href={`/products/${product.slug}`}>Explore {product.name}</ButtonLink></div>
          </div>
        </div>
      </div>
    </section>
  );
}
