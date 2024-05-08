import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import ColumnCurso from "./components/columnCurso";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Questie",
  description:
    "El mejor lugar para aprender programación y mejorar tus habilidades.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="flex flex-col min-h-screen justify-between">
        <Navbar />
        <ColumnCurso />
        {children}
        <Footer />
      </body>
    </html>
  );
}
