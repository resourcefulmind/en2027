import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import { content } from "@/content";
import "./globals.css";

// Display — names + section titles. Italic carries the brand ampersand "&".
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

// Body / labels / buttons.
const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hanken",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${content.couple.namesDisplay} · The Invitation`,
  description: `${content.event.framing} of ${content.couple.namesDisplay} — ${content.event.dateLine}, ${content.event.venueArea}.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${hanken.variable} antialiased`}
    >
      <body>
        {/* Shared gold-foil gradient — defined once so any Monogram/crest SVG
            on the page can fill text with url(#goldFoil). Hex lives here by
            design (see ui-tokens.md); components stay token-only. */}
        <svg
          aria-hidden="true"
          focusable="false"
          width="0"
          height="0"
          style={{ position: "absolute" }}
        >
          <defs>
            <linearGradient id="goldFoil" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#8A6526" />
              <stop offset="28%" stopColor="#C29B45" />
              <stop offset="50%" stopColor="#F3E2A8" />
              <stop offset="72%" stopColor="#C29B45" />
              <stop offset="100%" stopColor="#7C5A22" />
            </linearGradient>
          </defs>
        </svg>
        {children}
      </body>
    </html>
  );
}
