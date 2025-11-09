"use client";

import { useRef, useState } from "react";

interface FaqItem {
  q: string;
  a: string;
}

const FaqsCard = ({ faqsList, idx }: { faqsList: FaqItem; idx: number }) => {
  const answerElRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [answerH, setAnswerH] = useState("0px");

  const handleOpenAnswer = () => {
    const answerElH = answerElRef.current?.childNodes[0] as HTMLElement;
    if (answerElH) setAnswerH(`${answerElH.offsetHeight + 20}px`);
    setOpen(!open);
  };

  return (
    <div
      className="space-y-3 mt-5 overflow-hidden border-b border-border"
      key={idx}
      onClick={handleOpenAnswer}
    >
      <h4 className="cursor-pointer pb-5 flex items-center justify-between text-lg text-foreground font-medium">
        {faqsList.q}
        {open ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-muted-foreground ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-muted-foreground ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        )}
      </h4>
      <div
        ref={answerElRef}
        className="duration-300"
        style={open ? { height: answerH } : { height: "0px" }}
      >
        <div>
          <p className="text-muted-foreground leading-relaxed">{faqsList.a}</p>
        </div>
      </div>
    </div>
  );
};

export default function FaqSection() {
  const faqsList: FaqItem[] = [
    {
      q: "Apa itu Klaimo?",
      a: "Klaimo adalah asisten AI yang membantu Anda menganalisis dan memprediksi akurasi klaim JKN untuk mengurangi risiko penolakan klaim.",
    },
    {
      q: "Bagaimana cara kerja prediksi di Klaimo?",
      a: "Klaimo menggunakan model pembelajaran mesin yang dilatih dari data historis klaim BPJS untuk mengidentifikasi pola dan memprediksi tingkat kemungkinan klaim disetujui.",
    },
    {
      q: "Apakah data saya aman digunakan di Klaimo?",
      a: "Ya. Klaimo hanya menggunakan data yang Anda berikan untuk keperluan analisis prediksi, dan tidak menyimpan atau membagikannya ke pihak ketiga.",
    },
    {
      q: "Apakah Klaimo terhubung langsung dengan sistem BPJS Kesehatan?",
      a: "Tidak. Klaimo berfungsi sebagai alat bantu analisis independen dan tidak terintegrasi langsung dengan sistem internal BPJS.",
    },
    {
      q: "Siapa yang bisa menggunakan Klaimo?",
      a: "Klaimo dapat digunakan oleh rumah sakit, klinik, maupun individu yang ingin mengevaluasi kelayakan klaim JKN mereka sebelum diajukan.",
    },
    {
      q: "Apakah Klaimo gratis digunakan?",
      a: "Versi dasar Klaimo bisa digunakan secara gratis, namun tersedia juga paket lanjutan dengan fitur tambahan seperti laporan detail dan prediksi batch.",
    },
  ];

  return (
    <section className="leading-relaxed max-w-7xl mt-20 mx-auto px-4 md:px-8">
      <div className="space-y-3 text-center">
        <h1 className="text-3xl font-semibold text-foreground">Pertanyaan yang Sering Diajukan</h1>
        <p className="text-muted-foreground max-w-lg mx-auto text-lg">
          Temukan jawaban dari pertanyaan umum tentang Klaimo. Jika masih ada yang ingin ditanyakan,
          jangan ragu untuk menghubungi kami.
        </p>
      </div>
      <div className="mt-14 max-w-2xl mx-auto bg-card p-6 rounded-2xl shadow-sm">
        {faqsList.map((item, idx) => (
          <FaqsCard key={idx} idx={idx} faqsList={item} />
        ))}
      </div>
    </section>
  );
}
