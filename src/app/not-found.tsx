import Link from "next/link";

export default function NotFound() {
  return (
    <section className="grid min-h-[65vh] place-items-center bg-forest-50 px-5 py-20">
      <div className="max-w-xl text-left">
        <p className="eyebrow">404 · Page not found</p>
        <h1 className="display-title mt-5">This page has moved or does not exist.</h1>
        <p className="body-large mt-6">Return home or browse the current product portfolio.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="focus-ring rounded-full bg-forest-900 px-6 py-3 text-sm font-bold text-white">Return home</Link>
          <Link href="/products" className="focus-ring rounded-full border border-stone-300 px-6 py-3 text-sm font-bold text-stone-800">Browse products</Link>
        </div>
      </div>
    </section>
  );
}
