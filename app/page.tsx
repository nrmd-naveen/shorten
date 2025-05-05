"use client";

import Form from "@/components/Form";
import { get } from "http";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import Link from "next/link"
import { ArrowRight, ChevronDown, Copy, ExternalLink, Github, Link2, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Home() {
  const [showForm, setShowForm] = React.useState(false);
  const [shortId, setShortId] = React.useState(null);

  const getShortUrl = async () => {
    const response = await fetch("/api/v1/shortern", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: "https://www.google.com",
        keyword: "google",
      }),
    });
    const data = await response.json();
    console.log(data);
    setShortId(data.shortId);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 text-white">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.svg')] opacity-[0.02]" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 backdrop-blur-sm bg-black/20 border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link2 className="h-5 w-5 text-green-400" />
            <span className="font-bold text-xl">Shortly</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm text-gray-300 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm text-gray-300 hover:text-white transition-colors">
              How It Works
            </Link>
            <Link href="#pricing" className="text-sm text-gray-300 hover:text-white transition-colors">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
              Log in
            </Button>
            <Button size="sm" className="bg-green-500 hover:bg-green-600 text-black font-medium">
              Sign up
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-16 md:pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Now Shortening Links is as Easy as Typing <span className="text-green-400">Shortly.com</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Wherever you are — just add 'nrmd.site/' before any link and press Enter.
            </p>

            {/* Visual Representation */}
            <div className="relative mb-12 max-w-3xl mx-auto">
              <div className="backdrop-blur-md bg-black/30 rounded-xl border border-white/10 p-6 shadow-2xl">
                <div className="flex items-center mb-4 border-b border-white/10 pb-2">
                  <div className="flex gap-1.5 mr-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex-1 bg-white/5 rounded-md py-1.5 px-3 text-sm text-gray-300 flex items-center">
                    <span className="text-green-400 font-medium">shortly.com/</span>
                    <span className="ml-1 opacity-70">youtube.com/watch?v=dQw4w9WgXcQ</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                      1
                    </div>
                    <p className="text-sm text-gray-300">Type shortly.com/ before any URL in your browser</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                      2
                    </div>
                    <p className="text-sm text-gray-300">Press Enter and we'll instantly create a short link</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                      3
                    </div>
                    <p className="text-sm text-gray-300">Share your shortened link anywhere</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 w-24 h-12 bg-green-500/20 blur-2xl"></div>
            </div>

            {/* CTA Button */}
            <Button
              onClick={() => setShowForm(true)}
              className="bg-green-500 hover:bg-green-600 text-black font-medium text-lg px-8 py-6 h-auto rounded-xl shadow-[0_0_15px_rgba(74,222,128,0.5)] hover:shadow-[0_0_20px_rgba(74,222,128,0.6)] transition-all duration-300"
            >
              Try It Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            {/* Form Component (revealed on CTA click) */}
            {showForm && <Form />}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-20 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Shortly</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our platform offers more than just link shortening. Discover the features that make Shortly the preferred
              choice.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="h-6 w-6 text-green-400" />,
                title: "Lightning Fast",
                description: "Create short links instantly with our optimized infrastructure.",
              },
              {
                icon: <ExternalLink className="h-6 w-6 text-green-400" />,
                title: "Browser Integration",
                description: "Shorten links directly from your address bar without any extensions.",
              },
              {
                icon: <Copy className="h-6 w-6 text-green-400" />,
                title: "Analytics Dashboard",
                description: "Track clicks, geographic data, and referrers for all your links.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="backdrop-blur-md bg-black/20 rounded-xl border border-white/10 p-6 hover:bg-black/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative z-10 py-20 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Shortly.com makes link shortening effortless with our innovative browser-based approach.
              </p>
            </div>

            <div className="space-y-12">
              {[
                {
                  number: "01",
                  title: "Type shortly.com/ in your browser",
                  description:
                    "Simply add shortly.com/ before any URL in your browser's address bar. No need to visit our website first.",
                },
                {
                  number: "02",
                  title: "Press Enter to create your short link",
                  description:
                    "Our system instantly processes your request and generates a short, memorable link that's ready to share.",
                },
                {
                  number: "03",
                  title: "Share your shortened link",
                  description:
                    "Copy your new short URL and share it anywhere. Track clicks and analytics through your dashboard.",
                },
              ].map((step, index) => (
                <div key={index} className="flex gap-6">
                  <div className="text-4xl font-bold text-green-400/20">{step.number}</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-300">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <Button
                onClick={() => {
                  setShowForm(true)
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }}
                className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium px-6"
              >
                Try Shortly Now
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <Link2 className="h-5 w-5 text-green-400" />
              <span className="font-bold text-xl">Shortly</span>
            </div>
            <div className="flex gap-6 mb-6 md:mb-0">
              <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                About
              </Link>
              <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                Docs
              </Link>
              <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                API
              </Link>
              <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                Pricing
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="#"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <Github className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/5 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Shortly.com. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}




// export default function Home() {

//   const session = useSession();
//   return (
//     <div className="flex justify-center items-center h-screen w-screen ">
//       <div className=" ">
//         {
//           session.status === "authenticated" ? (
//             <div>
//               <h1>Welcome, {JSON.stringify(session.data)}</h1>
//               <button onClick={() => signOut()}>Sign Out</button>
//             </div>
//           ) : (
//               <button onClick={() => signIn("google")}>Sign In with Google</button>
//           )
//         }
//       </div>
//     </div>
//   );
// }
