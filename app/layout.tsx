import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Happy Eating",
  description: "Regional recipes with quantities that scale to your household",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}