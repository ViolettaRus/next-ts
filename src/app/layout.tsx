import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next App with Layouts",
  description: "App Router example with nested layouts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200`}
      >
        <Header />
        <main className="mx-auto max-w-5xl px-4 py-8">
          <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-lg backdrop-blur">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
