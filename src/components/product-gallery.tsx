"use client";

import Image from "next/image";
import { useState } from "react";
import { nextStoryIndex, storyDeltaFromKey } from "@/lib/story";

export function ProductGallery({ images, label }: { images: { src: string; alt: string }[]; label: string }) {
  const [active, setActive] = useState(0);
  const image = images[active];
  if (!image) return null;
  return (
    <div>
      <div className="media-frame aspect-[4/3]">
        <Image src={image.src} alt={image.alt} fill priority sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
      </div>
      {images.length > 1 ? (
        <div role="tablist" aria-label={`${label} views`} className="mt-4 flex snap-x gap-3 overflow-x-auto" onKeyDown={(event) => {
          const delta = storyDeltaFromKey(event.key);
          if (delta === null) return;
          event.preventDefault();
          const next = nextStoryIndex(active, images.length, delta);
          setActive(next);
          document.getElementById(`${label}-view-${next}`)?.focus();
        }}>
          {images.map((item, index) => (
            <button id={`${label}-view-${index}`} key={item.src} role="tab" type="button" aria-selected={index === active} tabIndex={index === active ? 0 : -1} className={`focus-ring relative aspect-[4/3] w-28 shrink-0 snap-start overflow-hidden rounded-xl border-2 ${index === active ? "border-forest-800" : "border-transparent"}`} onClick={() => setActive(index)}>
              <Image src={item.src} alt="" fill sizes="112px" className="object-cover" />
              <span className="sr-only">{item.alt}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
