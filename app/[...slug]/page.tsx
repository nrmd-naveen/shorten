import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Form from "@/components/Form";

type Props = {
  params: { slug: string[] };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function RedirectPage({ params, searchParams }: Props) {
  const { slug } = await params; 
  console.log(slug);
  const isFullUrl = slug[0]?.startsWith("https%3A") || slug[0]?.startsWith("http%3A") || slug[0]?.startsWith("www.");
  
  if (isFullUrl) {
    slug[0] = slug[0]+"/";
    const rawSlug = slug?.join("/") ?? ""; // reconstruct full path
    const baseUrl = decodeURIComponent(rawSlug);
    console.log(baseUrl);
    const queries = await searchParams;
    //@ts-ignore
    const queryString = new URLSearchParams(queries).toString();
    console.log(queryString);
    const fullUrl = queryString ? `${baseUrl}?${queryString}` : baseUrl;
    
    return (
      <>
        <div className="px-5 flex gap-10 flex-col justify-center items-center min-w-[80%] min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 text-white">
          <h1 className="text-center text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Get Your <span className="text-green-400">Shortened Link</span>
            </h1>
          <Form receivedUrl={fullUrl} />
        </div>
      </>
    );
  }

  // It's a shortId, lookup in DB
  const data = await prisma.url.findFirst({
    where: { shortId: slug[0] },
  });
  console.log(data);
  
  if (!data) {
    return (
        <div className="px-5 flex gap-10 flex-col justify-center items-center min-w-[80%] min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 text-white">
          <div className="text-md text-neutral-400">Short URL not found</div>
        </div>
    )
  }

  // Redirect to actual URL
  redirect(data.url);
}







/*

https://www.godaddy.com/en-in/domains/domain-name-generator?isc=sem3year&countryview=1&currencyType=INR&cdtl=c_698247602.g_1245748020819955.k_kwd-77859631227441%3Aloc-90.a_.d_c.ctv_o&bnb=nb&msclkid=ccedcc2656b216d55d25a435420421a6&utm_source=bing&utm_medium=cpc&utm_campaign=en-in_dom-reg_sem_ni_nb_competitors-all-devices-test-aasplits-2025-05-01_aware-consider_x_pros_intl_exact-stag_001&utm_term=freenom&utm_content=%5Bcore-comp-freenom%5D

https://www.godaddy.com/en-in/domains/domain-name-generator?isc=sem3year&countryview=1&currencyType=INR&cdtl=c_698247602.g_1245748020819955.k_kwd-77859631227441:loc-90.a_.d_c.ctv_o&bnb=nb&msclkid=ccedcc2656b216d55d25a435420421a6&utm_source=bing&utm_medium=cpc&utm_campaign=en-in_dom-reg_sem_ni_nb_competitors-all-devices-test-aasplits-2025-05-01_aware-consider_x_pros_intl_exact-stag_001&utm_term=freenom&utm_content=%5Bcore-comp-freenom%5D
*/ 