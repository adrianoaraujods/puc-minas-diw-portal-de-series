import type { Metadata } from "next";

import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";

import Background from "@/components/layout/background";
import Navbar from "@/components/layout/navbar";

export const metadata: Metadata = {
  title: "PUCorn",
  description: "Criado por Adriano Araújo",
  icons: [
    {
      media: "(prefers-color-scheme: light)",
      url: "/favicon-light.ico",
      href: "/favicon-light.ico",
    },
    {
      media: "(prefers-color-scheme: dark)",
      url: "/favicon-dark.ico",
      href: "/favicon-dark.ico",
    },
  ],
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
          <Navbar />
          {children}

          <Background />
        </ThemeProvider>
      </body>
    </html>
  );
}
