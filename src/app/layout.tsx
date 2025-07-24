import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AgreeWise.ai - Your Personal AI Legal Analyst",
  description:
    "Understand any Terms & Conditions or Privacy Policy in seconds with our AI-powered analysis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // We remove className="dark" from the <html> tag.
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${inter.className} bg-dark-bg text-gray-200`}>
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
