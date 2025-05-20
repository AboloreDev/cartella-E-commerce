const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="nunito antialiased bg-white dark:bg-black text-black dark:text-white transition-all duration-300">
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
