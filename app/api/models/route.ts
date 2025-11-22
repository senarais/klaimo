import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function GET() {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

    // ambil list model dari API
    const result = await genAI.listModels();

    return NextResponse.json(result, { status: 200 });
  } catch (err: any) {
    console.error("❌ Error listModels:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
