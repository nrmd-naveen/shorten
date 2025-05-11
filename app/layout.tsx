import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React from "react";
import Link from "next/link"
import { Github, Link2, Linkedin } from "lucide-react";
import Header from "@/components/Header";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shortify",
  description: "Shorten Your Links with Shortify",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 text-white">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.svg')] opacity-[0.05]" />
        <div className="absolute -top-28 -right-28 w-80 h-80 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-56 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="md:px-10 sticky top-0 z-[100] backdrop-blur-xl bg-black/20 border-b border-white/10">
        <Header />
      </header>
      
            {children}
            
            {/* Footer */}

      <footer className="md:px-10 relative z-10 border-t border-white/10 pt-10 pb-4">
        <div className="container mx-auto px-4">
          <div className=" flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <Link2 className="h-5 w-5 text-green-400" />
              <span className="font-bold text-xl">Shortify</span>
            </div>
             <div className="pb-4 md:pb-0 border-white/5 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} nrmd.site. All rights reserved.
          </div>
            <div className="flex items-center gap-4">
              <Link
                href="https://github.com/nrmd-naveen"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                >
                <Github className="h-4 w-4" />
              </Link>
              <Link
                href="https://x.com/naveen_rajan_n"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </Link>
              <Link
                href="https://www.linkedin.com/in/nrmd-naveen"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                >
                <Linkedin className="h-4 w-4" />
              </Link>
            </div>
          </div>
         
        </div>
      </footer>
    </div>
      </body>
    </html>
  );
}
