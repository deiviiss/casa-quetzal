import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import "./globals.css";
import { TopMenu } from "@/components/landing/TopMenu";
import { Footer } from "@/components/landing/Footer";
import FloatingWhatsAppButton from "@/components/landing/FloatingWhatsAppButton";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Casa Quetzal Cannabis Seeds - Innovación en Genética y Sustentabilidad del Cáñamo",
  description:
    "Descubre semillas certificadas, productos derivados y un dispensario digital exclusivo. Únete a la revolución del cáñamo con Casa Quetzal Cannabis Seeds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${oswald.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
