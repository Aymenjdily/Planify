import type { Metadata } from "next";
import { Inter, Jaldi, Poppins } from "next/font/google";
import "../globals.css";
import '@radix-ui/themes/styles.css';
import { Flex, Theme } from '@radix-ui/themes';
import AuthProvider from "@/context/AuthProvider";
import SideBar from "@/components/SideBar";

const inter = Inter({
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
            <Flex p="5" className="bg-blackColor min-h-screen" gap="5">
              <SideBar />
              <main className="w-full">
                {children}
              </main>
            </Flex>
          </Theme>
        </AuthProvider>
      </body>
    </html>
  );
}
