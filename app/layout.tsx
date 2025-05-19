import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/code/Header";
import Footer from "@/components/code/Footer";
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
      <html lang="en" suppressHydrationWarning>
        <body className="nunito antialiased bg-white dark:bg-black text-black dark:text-white transition-all duration-300">
          <ThemeProvider attribute="class" enableSystem defaultTheme="system">
            <Header />
            {children}
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
