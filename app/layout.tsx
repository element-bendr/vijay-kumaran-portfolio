import type { Metadata } from "next";
import { MotionProvider } from "@/components/motion";
import "./globals.css";

const SITE_URL = "https://vijay-kumaran-portfolio-ask.pages.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Vijay Kumaran — AI Automation & Web Systems Consultant",
    template: "%s · Vijay Kumaran",
  },
  description: "Practical websites, business systems, and AI automations that reduce manual work and run reliably every day.",
  icons: { icon: "/icon.svg" },
  openGraph: {
    type: "website",
    url: "/",
    title: "Vijay Kumaran — AI Automation & Web Systems Consultant",
    description: "Practical websites, business systems, and AI automations that reduce manual work and run reliably every day.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Vijay Kumaran — AI Automation & Web Systems Consultant" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vijay Kumaran — AI Automation & Web Systems Consultant",
    description: "Practical websites, business systems, and AI automations that reduce manual work and run reliably every day.",
    images: ["/og.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Vijay Kumaran",
      url: SITE_URL,
      image: `${SITE_URL}/og.png`,
      jobTitle: "AI Automation & Web Systems Consultant",
      description: "Practical websites, business systems, and AI automations that reduce manual work and run reliably every day.",
      knowsAbout: ["Web development", "AI automation", "Business systems", "Cloudflare", "Next.js"],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#service`,
      name: "Vijay Kumaran — AI Automation & Web Systems Consulting",
      url: SITE_URL,
      image: `${SITE_URL}/og.png`,
      description: "Consulting for websites, business systems, and AI automations.",
      areaServed: "Worldwide",
      makesOffer: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Website design & development" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Business systems & admin workflows" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI automation" } },
      ],
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <MotionProvider>{children}</MotionProvider>
  </body></html>;
}
