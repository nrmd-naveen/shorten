import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const getNewKeyword = (keyword: string) => {
    
    const lastCharValue = parseInt(keyword.slice(-1));

    if (lastCharValue.toString() === "NaN") {
        return keyword + 1;
    }
    return  keyword.slice(0, -1) + (lastCharValue + 1);
}

export const GET = async (req: NextRequest) => {
    const urlTerms = ["http://", "https://", "www."];
    const { searchParams } = new URL(req.url);
    // console.log("URL", req.url)
    const shortId = searchParams.get("shortId")|| "gpt";

    try {
        
        const result = await prisma.url.findFirst({
            where: {
                shortId: shortId
            }
        })

        return NextResponse.json({
            url: result?.url
        })
        
    } catch (err) {
        // console.log(err)

        return NextResponse.json({
            message: "Error in Getting URL",
            error: err
        })
    }
}


export const POST = async (req: NextRequest) => {

    // const session = await getServerSession()
    const body = await req.json();  
    const url = body.url?.trim();
    const keyword = body.keyword?.trim();
    // console.log(url,"------------",keyword)
    
    if (!url || !keyword) {
        return NextResponse.json({
            error: "Provide Valid URL and Keyword"
        })
    }

    let shortId = keyword;

    try {    
        const existingUrl = await prisma.url.findFirst({
            where: {
                url: url
            }
        })
        if (existingUrl) {
            return  NextResponse.json({ shortId:existingUrl.shortId });
        }
        
        const existingKeyword = await prisma.url.findFirst({
            where: {
                shortId: keyword
            }
        })
        if (existingKeyword) {
            
            shortId = getNewKeyword(existingKeyword.shortId);
        }
        
        await prisma.url.create({
            data: {
                url: url,
                shortId: shortId
            }
        })
        return NextResponse.json({ shortId });
    
    }  catch (error) {
        console.error("Caught error:", error instanceof Error ? error.message : JSON.stringify(error));
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }

    // return NextResponse.json({ shortUrl });
}