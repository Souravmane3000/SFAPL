"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ChevronDown, Mail, Menu, Phone, X } from "lucide-react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { company } from "@/data/company";
import { navItems } from "@/data/navigation";
import { CategoryMark } from "@/components/graphics/motifs";
import { trapTabTarget } from "@/lib/focus-trap";

export function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="focus-ring flex items-center gap-3 rounded-md" aria-label="Sourav Food & Agro home">
      <span className={`grid size-10 place-items-center rounded-full border ${light ? "border-white/25 text-amber-400" : "border-forest-700/25 text-forest-800"}`} aria-hidden="true">
        <svg viewBox="0 0 40 40" className="size-7" fill="none">
          <path d="M20 33V15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M20 21c-7-1-10-5-10-11 7 1 10 5 10 11Z" fill="currentColor" opacity=".92" />
          <path d="M20 16c6-.8 9-4 9-9-6 .8-9 4-9 9Z" fill="currentColor" opacity=".6" />
          <circle cx="20" cy="28" r="3" fill="currentColor" opacity=".75" />
        </svg>
      </span>
      <span className="leading-none">
        <span className={`block font-display text-lg font-semibold ${light ? "text-white" : "text-stone-900"}`}>Sourav</span>
        <span className={`mt-1 block text-[10px] font-semibold tracking-[0.18em] ${light ? "text-stone-300" : "text-stone-500"}`}>FOOD &amp; AGRO</span>
      </span>
    </Link>
  );
}

function subscribeToCompactHeader(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

function getCompactHeaderSnapshot() {
  return window.scrollY > 16;
}

function getServerCompactHeaderSnapshot() {
  return false;
}

function isCurrent(pathname: string, href: string) {
  return pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const compact = useSyncExternalStore(subscribeToCompactHeader, getCompactHeaderSnapshot, getServerCompactHeaderSnapshot);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      if (wasOpen.current) toggleRef.current?.focus();
      wasOpen.current = false;
      return;
    }
    wasOpen.current = true;
    document.body.style.overflow = "hidden";
    const menu = menuRef.current;
    const focusable = menu ? [...menu.querySelectorAll<HTMLElement>("a, button")] : [];
    focusable[0]?.focus();
    const onKey = (event: KeyboardEvent) => {
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const target = trapTabTarget(event.key, event.shiftKey, document.activeElement === first, document.activeElement === last);
      if (target === "close") setOpen(false);
      if (target === "last" && last) {
        event.preventDefault();
        last.focus();
      }
      if (target === "first" && first) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`sticky top-0 z-50 border-b border-white/10 bg-forest-950/95 text-white backdrop-blur-md transition-[height] ${compact ? "shadow-2xl" : ""}`}>
      <a href="#main-content" className="focus-ring absolute left-4 top-3 -translate-y-20 rounded-full bg-amber-400 px-4 py-2 text-sm font-bold text-forest-950 focus:translate-y-0">Skip to content</a>
      <div className={`container-shell flex items-center justify-between transition-[height] ${compact ? "h-16" : "h-20"}`}>
        <BrandMark light />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => {
            const current = isCurrent(pathname, item.href);
            return (
              <div key={item.href} className="group relative">
                <Link href={item.href} className={`focus-ring relative flex items-center gap-1 rounded-sm py-3 text-sm font-medium transition-colors hover:text-amber-400 ${current ? "text-amber-400" : "text-stone-100"}`} aria-current={current ? "page" : undefined}>
                  {item.label}
                  {item.children ? <ChevronDown className="size-3.5" aria-hidden="true" /> : null}
                  {current ? (
                    <LazyMotion features={domAnimation}>
                      <m.span layoutId="active-nav" className="absolute inset-x-0 -bottom-0.5 h-px bg-amber-400" />
                    </LazyMotion>
                  ) : null}
                </Link>
                {item.children ? (
                  <div className="invisible absolute left-1/2 top-full w-[28rem] -translate-x-1/2 translate-y-3 rounded-2xl border border-stone-200 bg-white p-3 opacity-0 shadow-2xl transition-all group-focus-within:visible group-focus-within:translate-y-1 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-1 group-hover:opacity-100">
                    <div className="grid grid-cols-2 gap-2">
                      {item.children.map((child) => (
                        <Link key={child.href} href={child.href} className="focus-ring flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-stone-700 hover:bg-forest-50 hover:text-forest-800">
                          <span className="text-forest-700"><CategoryMark category={child.label.toLowerCase()} /></span>
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>
        <Link href="/contact" className="focus-ring hidden rounded-full bg-amber-500 px-5 py-3 text-sm font-bold text-forest-950 transition-colors hover:bg-amber-400 lg:inline-flex">Request an enquiry</Link>
        <button ref={toggleRef} type="button" className="focus-ring grid size-11 place-items-center rounded-full border border-white/20 lg:hidden" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((value) => !value)}>
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      {open ? (
        <div ref={menuRef} id="mobile-menu" role="dialog" aria-modal="true" className="max-h-[calc(100svh-4rem)] overflow-y-auto border-t border-white/10 bg-forest-950 px-5 pb-7 pt-3 lg:hidden" aria-label="Mobile navigation">
          <div className="mx-auto max-w-xl">
            {navItems.map((item) => (
              <div key={item.href} className="border-b border-white/10">
                <Link href={item.href} onClick={() => setOpen(false)} className="focus-ring flex min-h-14 items-center text-lg font-semibold">{item.label}</Link>
                {item.children ? (
                  <div className="grid grid-cols-2 gap-2 pb-4">
                    {item.children.map((child) => (
                      <Link key={child.href} href={child.href} onClick={() => setOpen(false)} className="focus-ring rounded-lg bg-white/5 px-3 py-3 text-sm text-stone-200">{child.label}</Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
            <Link href="/contact" onClick={() => setOpen(false)} className="focus-ring mt-6 block rounded-full bg-amber-500 px-5 py-3 text-center font-bold text-forest-950">Request an enquiry</Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-forest-950 text-stone-300">
      <div className="contour-field pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="container-shell relative grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <BrandMark light />
          <p className="mt-6 max-w-md text-sm leading-7">Agricultural food products for wholesale, distribution, and business buyers—rooted in Maharashtra since 2013.</p>
          <div className="mt-6 space-y-3 text-sm">
            <a className="focus-ring flex min-h-11 w-fit items-center gap-3 rounded-sm hover:text-white" href={`tel:${company.contact.officialLandline.replaceAll(" ", "")}`}><Phone className="size-4 text-amber-400" aria-hidden="true" />{company.contact.officialLandline}</a>
            <a className="focus-ring flex min-h-11 w-fit items-center gap-3 rounded-sm hover:text-white" href={`mailto:${company.contact.primaryEmail}`}><Mail className="size-4 text-amber-400" aria-hidden="true" />{company.contact.primaryEmail}</a>
          </div>
        </div>
        <div>
          <h2 className="font-sans text-sm font-bold text-white">Navigate</h2>
          <ul className="mt-5 space-y-3 text-sm">{navItems.map((item) => <li key={item.href}><Link className="focus-ring rounded-sm hover:text-amber-400" href={item.href}>{item.label}</Link></li>)}</ul>
        </div>
        <div>
          <h2 className="font-sans text-sm font-bold text-white">Products</h2>
          <ul className="mt-5 space-y-3 text-sm">{navItems.find((item) => item.children)?.children?.map((item) => <li key={item.href}><Link className="focus-ring rounded-sm hover:text-amber-400" href={item.href}>{item.label}</Link></li>)}</ul>
        </div>
      </div>
      <div className="relative border-t border-white/10">
        <div className="container-shell flex flex-col gap-2 py-5 text-xs text-stone-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {company.legalName}</p>
          <p>CIN: {company.cin}</p>
        </div>
      </div>
    </footer>
  );
}
