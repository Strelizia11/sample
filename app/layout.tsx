// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers"; // adjust path if needed

export const metadata: Metadata = {
  title: "Co-Mission",
  description: "Freelancing mini-app with leveling and crypto payments",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
