import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  const filename = searchParams.get("filename");

  if (!url || !filename) {
    return NextResponse.json({ error: "Missing url or filename" }, { status: 400 });
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch image");
    }

    const blob = await response.blob();
    const headers = new Headers();
    headers.set("Content-Disposition", `attachment; filename="${filename}"`);
    headers.set("Content-Type", blob.type);

    return new NextResponse(blob, { headers });
  } catch (error) {
    console.error("Download error:", error);
    return NextResponse.json({ error: "Failed to download image" }, { status: 500 });
  }
}
