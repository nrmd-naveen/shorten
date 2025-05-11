"use client";

import Form from "@/components/Form";
import { get } from "http";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import Link from "next/link"
import { ArrowRight, ChevronDown, Copy, ExternalLink, Github, Link2, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { redirect } from "next/navigation";

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
    setShortId(data.shortId);
  };
  return (
    <>
      {/* Hero Section */}
      <section className="relative z-10 pt-16 md:pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Now Shortening Links is as Easy as Typing <span className="text-green-400">Nrmd.site</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto py-2">
              Wherever you are — just add <span className="text-green-300 tracking-wide">' nrmd.site/ '</span> before any link and press Enter.
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
                    <span className="text-green-400 font-medium tracking-wide">nrmd.site/</span>
                    <span className="ml-1 opacity-70">youtube.com/watch?v=dQw4w9WgXcQ</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                      1
                    </div>
                    <p className="text-sm text-gray-300">Type nrmd.site/ before any URL in your browser</p>
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
              onClick={() =>redirect("shorten")}
              className="bg-green-500 hover:bg-green-600 text-black font-medium text-lg px-6 py-4 h-auto rounded-xl shadow-[0_0_15px_rgba(74,222,128,0.5)] hover:shadow-[0_0_20px_rgba(74,222,128,0.6)] transition-all duration-300"
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose <span className="text-green-400">Shortify</span> </h2>
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
                NRMD.site makes link shortening effortless with our innovative browser-based approach.
              </p>
            </div>

            <div className="space-y-12">
              {[
                {
                  number: "01",
                  title: "Type nrmd.site/ in your browser",
                  description:
                    "Simply add nrmd.site/ before any URL in your browser's address bar. No need to visit our website first.",
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
                Try Shortify Now
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
                </>

     
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
