import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://forensicinstitute.in/api/InvestigationServices/Website/front/",
      {
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: "External API failed" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}