import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/Provider";
import { Toaster } from "sonner";
import { SidebarCart } from "@/components/landing/SidebarCart";

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
    <html lang="es">
      <body
        className={`${oswald.variable} antialiased`}
      >
        <Providers>
          <SidebarCart />
          {children}
          <Toaster
            position="top-right"
            expand={false}
            richColors
            toastOptions={{
              style: {
                borderRadius: '1rem',
              },
              className: 'font-sans',
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
