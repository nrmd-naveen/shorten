"use client";
import { useState } from "react";
import { Copy, Zap } from "lucide-react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type arg = string | undefined
export default function Form({ receivedUrl }: { receivedUrl?: arg }) {
    const [url, setUrl] = useState(receivedUrl || "")
    const [keyword, setKeyword] = useState("")
    const [shortUrl, setShortUrl] = useState("")
    const [copied, setCopied] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    
    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        const id = await getShortUrl(url, keyword)
        setShortUrl(`http://nrmd.site/${id}`)

        setIsSubmitting(false)
    }

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(shortUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy: ", err);
            alert("Copy failed. Try manually copying the link.");
        }
    }

    //Math.random().toString(36).substring(2, 8)}
    const getShortUrl = async (url: arg, keyword: arg) => {
        
    const rand_str = () => [...Array(3)].map(() => String.fromCharCode(97 + Math.random() * 26 | 0)).join('');
    const response = await fetch("/api/v1/shortern", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: url || "https://www.google.com",
        keyword: keyword || rand_str(),
      }),
    });
    const data = await response.json();
    // console.log(data);
    return data.shortId;
    };

    return (
        <div className="my-[3%] w-full max-w-2xl mx-auto backdrop-blur-md bg-black/20 rounded-xl border border-white/10 p-6 shadow-xl animate-fade-in">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                <label htmlFor="url" className="block text-md font-medium text-gray-300 mb-1 text-left">
                    Enter your long URL
                </label>
                <Input
                    id="url"
                    type="text"
                    placeholder="https://example.com/very-long-url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-12 rounded-lg focus:ring-green-500 focus:border-green-500"
                />
                </div>
                <div>
                <label htmlFor="keyword" className="block text-md font-medium text-gray-300 mb-1 text-left">
                    Custom keyword (optional)
                </label>
                <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-white/10 bg-white/5 text-gray-200 font-medium tracking-wider text-md">
                    nrmd.site/
                    </span>
                    <Input
                    id="keyword"
                    placeholder="my-link"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="rounded-l-none bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-12 focus:ring-green-500 focus:border-green-500"
                    />
                </div>
                </div>
                <Button
                type="submit"
                disabled={isSubmitting || !url}
                className="w-full bg-green-500 hover:bg-green-600 text-md text-black font-bold h-12 rounded-lg transition-all duration-200"
                >
                {isSubmitting ? (
                    <div className="h-5 w-5 rounded-full border-2 border-black border-t-transparent animate-spin" />
                ) : (
                    "Shorten URL"
                )}
                </Button>
            </form>

            {shortUrl && (
                <div className="mt-6 p-4 rounded-lg bg-white/5 border border-white/10 animate-fade-in">
                <div className="flex items-center justify-between">
                    <div className="font-medium text-green-400 truncate mr-2">{shortUrl}</div>
                    <Button
                    onClick={async () => await copyToClipboard()}
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-lg hover:bg-white/10"
                    >
                    {copied ? <Zap className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                    <span className="sr-only">{copied ? "Copied" : "Copy to clipboard"}</span>
                    </Button>
                </div>
                {copied && <div className="text-xs text-green-400 mt-1 animate-fade-in">Copied to clipboard!</div>}
                </div>
            )}
            </div>
    )
}
            
            
//     return (
//     <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-pink-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
//       <div className="w-full max-w-md mx-auto">
//         <div className="backdrop-blur-sm bg-white/80 dark:bg-slate-800/80 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-slate-700">
//           <div className="space-y-6">
//             <div className="space-y-2 text-center">
//               <div className="inline-block p-3 bg-gradient-to-br from-pink-200 to-blue-200 dark:from-pink-600 dark:to-blue-600 rounded-2xl mb-2">
//                 <LinkIcon className="h-6 w-6 text-slate-800 dark:text-white" />
//               </div>
//               <h1 className="text-3xl font-bold tracking-tighter">Shorten Your Link</h1>
//               <p className="text-gray-500 dark:text-gray-400">Transform long URLs into short, shareable links</p>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-5">
//               <div className="space-y-2">
//                 <Label htmlFor="url" className="text-md font-medium">
//                   Enter Full URL
//                 </Label>
//                 <div className="relative">
//                   <Input
//                     id="url"
//                     type="url"
//                     placeholder="https://example.com/very-long-url"
//                     value={url}
//                     onChange={(e) => setUrl(e.target.value)}
//                     required
//                     className="pl-10 h-12 rounded-xl border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-pink-300 dark:focus:ring-blue-600"
//                   />
//                   <LinkIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="keyword" className="text-sm font-medium">
//                   Custom Keyword (Optional)
//                 </Label>
//                 <Input
//                   id="keyword"
//                   placeholder="my-cool-link"
//                   value={keyword}
//                   onChange={(e) => setKeyword(e.target.value)}
//                   required
//                   className="h-12 rounded-xl border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-pink-300 dark:focus:ring-blue-600"
//                 />
//               </div>

//               <Button
//                 type="submit"
//                 disabled={isSubmitting || !url}
//                 className={cn(
//                   "w-full h-12 rounded-xl text-base font-medium transition-all duration-200 bg-gradient-to-r",
//                   "from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600",
//                   "text-white shadow-lg hover:shadow-xl",
//                   "disabled:opacity-70 disabled:cursor-not-allowed",
//                   "flex items-center justify-center gap-2",
//                 )}
//               >
//                 {isSubmitting ? (
//                   <div className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
//                 ) : (
//                   <>
//                     Get Short URL
//                     <ArrowRight className="h-5 w-5" />
//                   </>
//                 )}
//               </Button>
//             </form>

//             {shortUrl && (
//               <div
//                 className="mt-6 p-4 rounded-xl bg-gradient-to-r from-pink-100 to-blue-100 dark:from-slate-700 dark:to-slate-700 animate-fade-in"
//                 style={{ animationDuration: "0.5s" }}
//               >
//                 <div className="flex items-center justify-between">
//                   <div className="font-medium text-slate-800 dark:text-white truncate mr-2">{shortUrl}</div>
//                   <Button
//                     onClick={copyToClipboard}
//                     variant="ghost"
//                     size="icon"
//                     className={cn(
//                       "h-8 w-8 rounded-lg transition-all duration-200",
//                       copied
//                         ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
//                         : "hover:bg-gray-100 dark:hover:bg-slate-700",
//                     )}
//                   >
//                     {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
//                     <span className="sr-only">{copied ? "Copied" : "Copy to clipboard"}</span>
//                   </Button>
//                 </div>
//                 {copied && (
//                   <div className="text-xs text-green-600 dark:text-green-400 mt-1 animate-fade-in">
//                     Copied to clipboard!
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// };
