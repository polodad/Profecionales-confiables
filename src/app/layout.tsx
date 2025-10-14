import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Profesionales Confiables - Servicios del Hogar en México",
  description: "Contrata profesionales verificados para plomería, electricidad, pintura y más. Cotizaciones instantáneas y pago seguro.",
  keywords: "plomería, electricidad, albañilería, carpintería, pintura, servicios hogar, México",
  authors: [{ name: "Profesionales Confiables" }],
  openGraph: {
    type: "website",
    locale: "es_MX",
    title: "Profesionales Confiables",
    description: "Contrata profesionales verificados para tu hogar",
    siteName: "Profesionales Confiables",
  },
  twitter: {
    card: "summary_large_image",
    title: "Profesionales Confiables",
    description: "Contrata profesionales verificados para tu hogar",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}

