
import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/navbar";
import { Footer } from "./footer";
import SearchModal from "./components/modals/search-modal";
import { useState } from "react";
import LoginModal from "./components/modals/LoginModal";
import RegisterModal from "./components/modals/RegisterModal";
import getCurrentUser from "./actions/getCurrentUser";
import FlightModal from "./components/modals/FlightModal";
import QuestionnaireModal from "./components/modals/QuestionnaireModal";
import GalleryModal from "./components/modals/GalleryModal";


const font = Nunito({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Vacation Quest",
  description: "Created by Raz and Dor",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <LoginModal />
        <RegisterModal />
        <SearchModal/>
        <FlightModal />
        <QuestionnaireModal />
        <GalleryModal />
        <div className="min-h-screen flex flex-col">
          <Navbar currentUser={currentUser}/>
          <main className="flex-1 m-5">
                    {children}
          </main>
          <Footer />
        </div>
        
        </body>
    </html>
  );
}
