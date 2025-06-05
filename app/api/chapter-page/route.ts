import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const baseUrl = searchParams.get("baseUrl")
  const hash = searchParams.get("hash")
  const filename = searchParams.get("filename")

  if (!baseUrl || !hash || !filename) {
    return new NextResponse("Missing parameters", { status: 400 })
  }

  try {
    const imageUrl = `${baseUrl}/data/${hash}/${filename}`

    const response = await fetch(imageUrl, {
      headers: {
        "User-Agent": "MangaReader/1.0",
        Referer: "https://mangadex.org/",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch page: ${response.status}`)
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
    console.error("Error fetching chapter page:", error)
    return new NextResponse("Failed to fetch page", { status: 500 })
  }
}
