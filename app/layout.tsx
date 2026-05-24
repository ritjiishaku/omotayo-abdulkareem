import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Omotayo Abdulkareem | AI Automation Engineer - Workflow & Business Automation Systems",
    template: "%s | Omotayo Abdulkareem",
  },
  description:
    "AI Automation Engineer helping businesses automate workflows, build AI agents, integrate systems, and scale operations using intelligent automation and integrations.",
  keywords: [
    "AI Automation Engineer",
    "Omotayo Abdulkareem",
    "Workflow Automation",
    "AI Agents",
    "Business Automation Specialist",
    "AI Automation Consultant",
    "CRM Automation",
    "AI Integrations",
    "Workflow Automation Systems",
    "Business Process Automation",
    "Make.com Expert",
    "Zapier Integration",
  ],
  authors: [{ name: "Omotayo Abdulkareem" }],
  creator: "Omotayo Abdulkareem",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://omotayo.dev",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://omotayo.dev",
    title: "Omotayo Abdulkareem | AI Automation Engineer - Workflow & Business Automation Systems",
    description:
      "AI Automation Engineer helping businesses automate workflows, build AI agents, integrate systems, and scale operations using intelligent automation.",
    siteName: "Omotayo Abdulkareem - AI Automation Engineering",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Omotayo Abdulkareem - AI Automation Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Omotayo Abdulkareem | AI Automation Engineer - Workflow & Business Automation Systems",
    description:
      "AI Automation Engineer helping businesses automate workflows, build AI agents, integrate systems, and scale operations using intelligent automation.",
    images: ["/og.png"],
  },
  metadataBase: new URL("https://omotayo.dev"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body className="bg-bg-primary text-text-primary antialiased selection:bg-gold/25 selection:text-white">
        {children}
      </body>
    </html>
  );
}
