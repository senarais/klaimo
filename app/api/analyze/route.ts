import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY belum diset di .env" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // MODEL DIUBAH KE gemini-2.5-flash
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
Kamu adalah sistem analisis klaim BPJS Kesehatan.
Gunakan data berikut sebagai dasar analisis:

${JSON.stringify(body, null, 2)}

Tugas kamu:
1. Menilai apakah klaim kemungkinan DISETUJUI atau DITOLAK.
2. Beri penilaian tingkat risiko penolakan (0-100).
3. Jelaskan alasan utama.
4. Berikan saran perbaikan.

Format output JSON:

{
  "status": "Diterima | Ditolak | Berisiko Ditolak | Meragukan",
  "score": 0-100,
  "feedback": ["alasan 1", "alasan 2"],
  "suggestions": ["saran 1", "saran 2"]
}

WAJIB hanya balas JSON valid tanpa teks tambahan.
    `;

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    const output = result.response.text()
      .replace(/```json|```/g, "")
      .trim();

    const data = JSON.parse(output);

    return NextResponse.json({ result: data }, { status: 200 });

  } catch (error: any) {
    console.error("❌ Error di backend:", error);
    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}
