import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";
import { Providers } from "./providers"; // adjust path if providers.tsx is in /app

export const metadata: Metadata = {
  title: "Co-Mission",
  description: "Freelancing mini-app with leveling and crypto payments",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
