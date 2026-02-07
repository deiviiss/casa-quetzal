import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import "./globals.css";
import { TopMenu } from "@/components/TopMenu";
import { Footer } from "@/components/Footer";

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
        <TopMenu />
        {children}
        <Footer />
      </body>
    </html>
  );
}
