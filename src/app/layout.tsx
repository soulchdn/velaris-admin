import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Velaris · Administración",
  description: "Sistema de gestión de Velaris, Tienda literaria",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className={`${dmSans.className} min-h-full flex flex-col`}>{children}</body>
    </html>
  );
}
