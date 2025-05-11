import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Form from "@/components/Form";

type Props = {
  params: { slug: string[] };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function RedirectPage({ params, searchParams }: Props) {
  const { slug } = await params; 
  // console.log(slug);
  let isUrl = false;
  
  if (slug[0]?.startsWith("https%3A") || slug[0]?.startsWith("http%3A")) {
    slug[0] = slug[0] + "/";
    isUrl = true;
  } else if (slug[0].includes(".")) {
    isUrl = true;
  }
  // const isFullUrl = slug.length>1 || slug[0]?.startsWith("https%3A") || slug[0]?.startsWith("http%3A") || slug[0]?.startsWith("www.");
  
  if (isUrl) {
    
    const rawSlug = slug?.join("/") ?? ""; // reconstruct full path
    const baseUrl = decodeURIComponent(rawSlug);
    const queries = await searchParams;
    //@ts-ignore
    const queryString = new URLSearchParams(queries).toString();
    const fullUrl = queryString ? `${baseUrl}?${queryString}` : baseUrl;
    
    return (
      <>
        <div className=" w-full flex items-center justify-center">
          <div className=" flex flex-col justify-center items-center w-full min-w-[80%] bg-gradient-to-br from-gray-950 to-gray-900 text-white">
          <h1 className="pt-16 text-center text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Get Your <span className="text-green-400">Shortened Link</span>
            </h1>
          <Form receivedUrl={fullUrl}/>
          </div>
        </div>
      </>
    );
  }

  // It's a shortId, lookup in DB
  const data = await prisma.url.findFirst({
    where: { shortId: slug[0] },
  });
  
  if (!data) {
    return (
        <div className="px-5 flex gap-10 flex-col justify-center items-center min-w-[80%] min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 text-white">
          <div className="text-md text-neutral-400">Short URL not found</div>
        </div>
    )
  }
  let destination = data.url;
  // Ensure the URL is absolute
  if (!destination.startsWith("http://") && !destination.startsWith("https://")) {
    destination = `http://${destination}`;
  }
  // Redirect to actual URL
  // console.log("redirecting to ", destination);
  redirect(destination);
}



