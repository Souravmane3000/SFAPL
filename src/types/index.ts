export type PublishStatus = "verified" | "pending" | "hidden";

export interface ContactInfo {
  officialLandline: string;
  primaryEmail: string;
  directorEmail: string;
  address: string | null;
  whatsapp: string | null;
  googleMapsUrl: string | null;
  linkedin: string | null;
}

export interface CompanyInfo {
  legalName: string;
  displayName: string;
  cin: string;
  gst: string;
  founded: string;
  foundingYear: number;
  founders: string[];
  tagline: string | null;
  description: string;
  manufacturingLocation: string;
  contact: ContactInfo;
}

export type ProductCategory = "raisins" | "turmeric" | "jaggery" | "rice";

export interface ProductVariant {
  id: string;
  label: string;
  image?: string;
  status: PublishStatus;
}

export interface Product {
  id: ProductCategory;
  slug: string;
  name: string;
  eyebrow: string;
  tagline: string;
  description: string;
  longDescription: string;
  heroImage: string;
  galleryImages: string[];
  variants: ProductVariant[];
  applications: string[];
  status: PublishStatus;
  featured: boolean;
  sortOrder: number;
}

export interface QualityStep {
  id: string;
  title: string;
  description: string;
  icon: "SearchCheck" | "Settings2" | "ShieldCheck" | "UserCheck" | "PackageCheck";
}

export interface Certification {
  id: string;
  name: string;
  status: PublishStatus;
  image: string | null;
}

export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export interface EnquiryFormData {
  name: string;
  company?: string;
  email: string;
  phone: string;
  country?: string;
  productInterest: string;
  approximateQuantity?: string;
  message?: string;
  website?: string;
}
