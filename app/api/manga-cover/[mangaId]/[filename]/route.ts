import { type NextRequest, NextResponse } from "next/server"

interface RouteParams {
  params: {
    mangaId: string
    filename: string
  }
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { mangaId, filename } = params

  if (!mangaId || !filename) {
    return new NextResponse("Missing parameters", { status: 400 })
  }

  try {
    const imageUrl = `https://uploads.mangadex.org/covers/${mangaId}/${filename}`

    const response = await fetch(imageUrl, {
      headers: {
        "User-Agent": "MangaReader/1.0",
        Referer: "https://mangadex.org/",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch cover: ${response.status}`)
    }

    const imageBuffer = await response.arrayBuffer()
    const contentType = response.headers.get("content-type") || "image/jpeg"

    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=604800", // Cache for 7 days
        "Access-Control-Allow-Origin": "*",
      },
    })
  } catch (error) {
    console.error("Error fetching manga cover:", error)
    return new NextResponse("Failed to fetch cover", { status: 500 })
  }
}
