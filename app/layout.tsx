import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://delta.money"),
  title: "Delta: Every rupee leaves a trace",
  description:
    "Delta is not yet released. Join the waitlist. Delta connects your accounts, finds what actually changed each week, and explains it in plain language, with every figure checked against your real transactions before you see it.",
  keywords: [
    "personal finance India",
    "Account Aggregator",
    "spend tracking",
    "weekly financial digest",
    "credit card due dates",
    "investment goals",
  ],
  openGraph: {
    title: "Delta: Every rupee leaves a trace",
    description:
      "Connect every account with one consent. Delta computes what changed each week and explains it in plain language, with every number verified against your real transactions.",
    type: "website",
    locale: "en_IN",
    siteName: "Delta",
  },
  twitter: {
    card: "summary_large_image",
    title: "Delta: Every rupee leaves a trace",
    description:
      "The numbers are computed. The AI only narrates. Personal finance for India, built on the Account Aggregator framework.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#090a0f",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        {/* Cabinet Grotesk carries the display voice. If Fontshare is blocked the
            stack falls back to Geist, which is already self-hosted by Next. */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f%5B%5D=cabinet-grotesk@500,700,800,900&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
