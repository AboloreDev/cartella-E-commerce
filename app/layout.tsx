"use client";

import { Toaster } from "sonner";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="nunito antialiased bg-white dark:bg-black text-black dark:text-white transition-all duration-300">
        <Toaster richColors position="top-right" />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
