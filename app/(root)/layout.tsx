import type { Metadata } from "next";
import { Inter, Jaldi, Poppins } from "next/font/google";
import "../globals.css";
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import AuthProvider from "@/context/AuthProvider";

const inter = Inter({
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Planify",
  description: "Planify: Your sleek and simple to-do app. Effortlessly organize tasks, set priorities, and boost productivity. Stay on top of your commitments with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Theme>
            <main>
              {children}
            </main>
          </Theme>
        </AuthProvider>
      </body>
    </html>
  );
}
