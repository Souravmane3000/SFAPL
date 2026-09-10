import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { company } from "@/data/company";
import { Footer, Header } from "@/components/site-shell";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.souravfoodandagro.com"),
  title: {
    default: "Sourav Food & Agro — Indian Raisins & Agricultural Products",
    template: "%s | Sourav Food & Agro",
  },
  description:
    "Raisins, turmeric, jaggery, and rice for wholesale, distribution, and business enquiries from Maharashtra, India.",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: company.legalName,
    images: [{ url: "/images/products/raisins-hero.png", width: 1024, height: 576 }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.legalName,
  url: "https://www.souravfoodandagro.com",
  foundingDate: company.founded,
  founders: company.founders.map((name) => ({ "@type": "Person", name })),
  email: company.contact.primaryEmail,
  telephone: company.contact.officialLandline,
  sameAs: company.contact.linkedin ? [company.contact.linkedin] : [],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable}`}>
      <body>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
