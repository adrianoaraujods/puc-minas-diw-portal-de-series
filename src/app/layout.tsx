import type { Metadata } from "next";
import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "PUCorn",
  description: "Criado por Adriano Araújo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${GeistSans.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
