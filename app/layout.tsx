import type { Metadata } from "next";
import { MotionProvider } from "@/components/motion";
import "./globals.css";

const SITE_URL = "https://vijay-kumaran-portfolio-ask.pages.dev";

// ponytail: PostHog key + host — NEXT_PUBLIC_ vars are inlined at build time for static export; empty key disables analytics
const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY ?? "";
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Vijay Kumaran — AI Automation & Web Systems Consultant",
    template: "%s · Vijay Kumaran",
  },
  description: "Practical websites, business systems, and AI automations that reduce manual work and run reliably every day.",
  icons: { icon: "/icon.svg" },
  alternates: { canonical: "/" },
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
  other: {
    "geo.region": "IN-MH",
    "geo.placename": "Mumbai",
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
      location: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Mumbai",
          addressRegion: "Maharashtra",
          addressCountry: "IN",
        },
      },
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
    {POSTHOG_KEY ? <script dangerouslySetInnerHTML={{ __html: `!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);posthog.init('${POSTHOG_KEY}',{api_host:'${POSTHOG_HOST}'});` }} /> : null}
    <MotionProvider>{children}</MotionProvider>
  </body></html>;
}
