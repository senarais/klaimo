"use client";

import Squares from "@/components/Squares";

export default function Hero() {
  return (
    <section className="relative w-full h-screen px-4 sm:px-10 overflow-hidden">
      {/* 🟩 Background Squares */}
      <div className="absolute inset-0 z-0 opacity-50">
        <Squares 
          speed={0.5} 
          squareSize={100}
          direction="right"
          borderColor="#b5ff00"
          hoverFillColor="#222"
          fillColor="#0e0e0e"
        />
      </div>

      {/* 🧠 Hero Content */}
      <div className="relative h-full z-10 flex gap-12 lg:flex-cols-2 justify-center items-center">
        <div className="relative -top-12 flex flex-col justify-center items-center gap-6 text-center">
          <div className="flex flex-col max-w-[600px] gap-2">
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
              Prediksi Dengan Klaimo
            </h1>
            <h2 className="text-gray-400 text-base sm:text-lg font-normal">
              Klaimo adalah asisten AI yang membantu Anda menganalisis dan memprediksi
              akurasi klaim JKN Anda untuk mengurangi risiko penolakan.
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <a
              href="/analyze"
              className="flex w-full px-5 sm:w-auto h-12 max-w-[300px] items-center justify-center rounded-full bg-primary text-background-dark text-center font-bold hover:opacity-90 transition-opacity"
            >
              Mulai Analisis Gratis
            </a>

            <a
              href="#learn"
              className="flex w-full px-5 sm:w-auto h-12 max-w-[300px] items-center justify-center rounded-full border border-primary text-primary text-center font-bold hover:bg-primary/10 transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* 🌫 Fade bawah */}
      <div className="absolute bottom-0 left-0 w-full h-40 pointer-events-none bg-gradient-to-t from-background-dark to-transparent" />

      {/* 🌫 Fade atas */}
      <div className="absolute top-0 left-0 w-full h-40 pointer-events-none bg-gradient-to-b from-background-dark to-transparent" />

      {/* 🌫 Fade kiri */}
      <div className="absolute top-0 left-0 w-20 h-full pointer-events-none bg-gradient-to-r from-background-dark to-transparent" />

      {/* 🌫 Fade kanan */}
      <div className="absolute top-0 right-0 w-20 h-full pointer-events-none bg-gradient-to-l from-background-dark to-transparent" />
    </section>
  );
}
