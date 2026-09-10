import type { NavItem } from "@/types";

export const navItems: NavItem[] = [
  { label: "About", href: "/about" },
  {
    label: "Products",
    href: "/products",
    children: [
      { label: "Raisins", href: "/products/raisins" },
      { label: "Turmeric", href: "/products/turmeric" },
      { label: "Jaggery", href: "/products/jaggery" },
      { label: "Rice", href: "/products/rice" },
    ],
  },
  { label: "Quality", href: "/quality" },
  { label: "Business", href: "/business" },
  { label: "Contact", href: "/contact" },
];
