import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const imageUrl = searchParams.get("url")

  if (!imageUrl) {
    return new NextResponse("Missing image URL", { status: 400 })
  }

  try {
    // Validate that the URL is from MangaDex
    const url = new URL(imageUrl)
    if (!url.hostname.includes("mangadex.org") && !url.hostname.includes("uploads.mangadex.org")) {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 })
    }

    const response = await fetch(imageUrl, {
      headers: {
        "User-Agent": "MangaReader/1.0",
        Referer: "https://mangadex.org/",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status}`)
    }

    const imageBuffer = await response.arrayBuffer()
    const contentType = response.headers.get("content-type") || "image/jpeg"

    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400", // Cache for 24 hours
        "Access-Control-Allow-Origin": "*",
      },
    })
  } catch (error) {
    console.error("Error proxying image:", error)
    return new NextResponse("Failed to fetch image", { status: 500 })
  }
}
