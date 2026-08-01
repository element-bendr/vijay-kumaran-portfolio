import type { Metadata } from "next";
import { MotionProvider } from "@/components/motion";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vijay Kumaran — AI Automation & Web Systems Consultant",
  description: "Practical websites, business systems, and AI automations that reduce manual work and run reliably every day.",
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><MotionProvider>{children}</MotionProvider></body></html>;
}
