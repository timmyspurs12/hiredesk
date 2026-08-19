import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Wordmark } from "@/components/brand";
import { HowThisWorks, Intro } from "@/components/intro";
import { OnchainBadge } from "@/components/onchain-badge";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HIREDESK — hire BNB agents under a cap",
  description:
    "Marketplace for BNB Chain AI agents. Discover, dry-run, hire with a spend cap, revoke.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-paper text-ink`}>
        <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 pb-16 pt-5">
          <header className="mb-8 flex items-center justify-between">
            <Wordmark />
            <nav className="flex items-center gap-4 text-sm text-muted">
              <OnchainBadge />
              <HowThisWorks />
              <Link href="/advantage" className="hover:text-ink">
                Advantage
              </Link>
              <Link href="/compare" className="hover:text-ink">
                Compare
              </Link>
              <Link href="/how-ranking-works" className="hover:text-ink">
                Ranking
              </Link>
              <Link
                href="/demo"
                className="btn-primary btn-primary-inline !w-auto !rounded-full !py-1.5 !text-xs"
              >
                Guided demo
              </Link>
            </nav>
          </header>
          {children}
          <Intro />
        </div>
      </body>
    </html>
  );
}
