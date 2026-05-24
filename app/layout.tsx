import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "NovaCrystara AI Labs Ltd — Where AI Talent Meets Real Business Impact",
  description:
    "We build production AI systems for clients, develop world-class tech talent, and launch founders — one ecosystem. London, UK.",
  metadataBase: new URL("https://novacrystara.ai"),
  openGraph: {
    title: "NovaCrystara AI Labs Ltd",
    description:
      "Engineering that actually ships. AI consulting, innovation tracks, and a startup launchpad — one ecosystem.",
    type: "website",
    locale: "en_GB",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="bg-nc-base font-sans text-nc-body antialiased">
        {children}
      </body>
    </html>
  );
}
