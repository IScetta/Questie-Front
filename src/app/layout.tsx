import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { AuthProvider } from "@/context/AuthContext";
import { UserProvider as UserProviderClient } from "@/context/UserContext";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import Sidebar from "./components/side-bar";
import Chat from "./components/chat";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Questie",
  description:
    "El mejor lugar para aprender lo que quieras y mejorar tus habilidades.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="flex flex-col min-h-screen justify-between">
        <UserProvider>
          <AuthProvider>
            <UserProviderClient>
              <div className="hidden sm:flex">
                <Navbar />
              </div>

              <div className="flex sm:hidden md:hidden z-50 mb-10">
                {/* <Sidebar /> */}
              </div>
              
              <Chat />

              {children}

              <Footer />
            </UserProviderClient>
          </AuthProvider>
        </UserProvider>
        <script src="https://fw-cdn.com/11645116/4289780.js" defer></script>
      </body>
    </html>
  );
}
