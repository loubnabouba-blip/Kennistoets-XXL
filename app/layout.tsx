import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kennistoets XXL – aspectenkennistoetsen",
  description: "Leerprogramma wetten voor de politie-organisatie, met bronverwijzingen.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
