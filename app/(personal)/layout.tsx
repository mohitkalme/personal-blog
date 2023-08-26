"use client";
import "../globals.css";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

import { ThemeProvider } from "next-themes";
import SectionContainer from "../../components/SectionContainer";
import Header from "@/components/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased text-black bg-white dark:bg-black dark:text-white`}
      >
        <ThemeProvider attribute="class">
          <Header />
          <SectionContainer>
            <div className=" z-50flex flex-col justify-between">
              <main>{children}</main>
            </div>
          </SectionContainer>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
