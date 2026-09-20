import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

export const metadata: Metadata = {
  title: "Draft Gate - Enterprise Sales Outbound Control",
  description: "Score and review every outbound draft before you send. Built for enterprise sales teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
