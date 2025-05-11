"use client";
import {  Github, Link2 } from "lucide-react";
import { redirect } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Header() {
    return (
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div onClick={() => redirect("/")} className="flex items-center gap-2 cursor-pointer">
            <Link2 className="h-5 w-5 text-green-400" />
            <span className="font-bold text-xl">Shortify</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/#features" className="text-sm text-gray-300 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="/#how-it-works" className="text-sm text-gray-300 hover:text-white transition-colors">
              How It Works
            </Link>
            <Link href="/shorten" className="text-sm text-gray-300 hover:text-white transition-colors">
              Try Now
            </Link>
          </nav>
          <div className="flex items-center">
            {/* <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
              Log in
            </Button> */}
            <Button onClick={()=> window.open("https://github.com/nrmd-naveen/shorten", '_blank')} size="sm" className="rounded- bg-green-500 hover:bg-green-600 text-black font-medium">
               <Github />
            </Button>
          </div>
        </div>
    )
}