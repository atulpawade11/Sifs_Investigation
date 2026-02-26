import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;  // Destructure after await

    const response = await fetch(
      `https://forensicinstitute.in/api/InvestigationServices/Website/front/${slug}`,
      { 
        headers: { Accept: "application/json" }, 
        cache: "no-store" 
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: `Backend returned ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (err) {
    console.error("API route error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" }, 
      { status: 500 }
    );
  }
}