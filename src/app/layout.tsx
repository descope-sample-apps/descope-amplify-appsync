"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@descope/react-sdk";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider projectId="P2PD8H2nZbPk5cSJfChsc00ZCi0w">
        <body className={inter.className}>{children}</body>
      </AuthProvider>
    </html>
  );
}
