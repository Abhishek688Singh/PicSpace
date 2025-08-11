import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavbarDemo } from "@/components/navbar";
import { SessionProvider } from "next-auth/react";
import FeedbackOptions from "../components/FeedbackOptions";
import Footer from "@/components/footer";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pic-Space",
  description: "A private and shared space",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >


        <div className="sticky top-0 z-50 bg-transparent pt-[50] ">

          <SessionProvider>
            <NavbarDemo />
          </SessionProvider>
          <FeedbackOptions />

        </div>{children}
        <SessionProvider>
          <Footer />
        </SessionProvider>

        <Analytics />
        <SpeedInsights />

      </body>
    </html>
  );
}
