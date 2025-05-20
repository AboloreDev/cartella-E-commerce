import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/code/Navbar/Header";
import Footer from "@/components/code/Footer/Footer";
import { ThemeProvider } from "next-themes";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Cartella Store",
  description: "The No 1 Online Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <ThemeProvider attribute="class" enableSystem defaultTheme="system">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </ThemeProvider>
    </ClerkProvider>
  );
}
