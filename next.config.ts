import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/vision", destination: "/about", permanent: true },
      { source: "/raisins", destination: "/products/raisins", permanent: true },
      { source: "/turmeric", destination: "/products/turmeric", permanent: true },
      { source: "/jaggery", destination: "/products/jaggery", permanent: true },
      { source: "/rice", destination: "/products/rice", permanent: true },
      { source: "/qa", destination: "/quality", permanent: true },
      { source: "/certifications", destination: "/quality", permanent: true },
      { source: "/career", destination: "/contact", permanent: true },
      { source: "/wholesale", destination: "/business", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
    ];
  },
  async headers() {
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      "connect-src 'self' https://api.emailjs.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; ");

    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
