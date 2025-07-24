import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; // <-- IMPORT NAVBAR
import Footer from "@/components/Footer"; // <-- IMPORT FOOTER

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AgreeWise.ai - Your Personal AI Legal Analyst", // <-- UPDATED TITLE
  description:
    "Understand any Terms & Conditions or Privacy Policy in seconds with our AI-powered analysis.", // <-- UPDATED DESCRIPTION
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark:" suppressHydrationWarning={true}>
      <body className={`${inter.className} bg-gray-900 text-white`}>
        <Navbar /> {/* <-- ADD NAVBAR HERE */}
        <main className="pt-16">
          {" "}
          {/* Add padding-top to prevent content from hiding under the fixed navbar */}
          {children}
        </main>
        <Footer /> {/* <-- ADD FOOTER HERE */}
      </body>
    </html>
  );
}
