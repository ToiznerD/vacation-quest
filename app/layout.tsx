'use client';

import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/navbar";
import { Footer } from "./footer";
import SearchModal from "./components/modals/search-modal";
import { useState } from "react";


const font = Nunito({
  subsets: ["latin"],
})

// export const metadata: Metadata = {
//   title: "Vacation Quest",
//   description: "Created by Raz and Dor",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [searchValues, setSearchValues] = useState({
    destination: '',
    when: '',
    guestCount: 0,
  });
  return (
    <html lang="en">
      <body className={font.className}>
        <SearchModal searchValues={searchValues} setSearchValues={setSearchValues}/>
        <div className="min-h-screen flex flex-col">
          <Navbar searchValues={searchValues} />
          <main className="flex-1 m-5">
                    {children}
          </main>
          <Footer />
        </div>
        
        </body>
    </html>
  );
}
