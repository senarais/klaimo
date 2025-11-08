export default function Steps() {
  const items = [
    {
      step: 1,
      title: "Upload Dokumen",
      desc: "Unggah dokumen klaim relevan yang Anda miliki dengan aman.",
    },
    {
      step: 2,
      title: "Isi Gejala & Tindakan",
      desc: "Masukkan informasi singkat mengenai gejala dan tindakan medis yang diterima.",
    },
    {
      step: 3,
      title: "Dapatkan Hasil Prediksi",
      desc: "AI kami akan menganalisis data dan memberikan skor akurasi klaim Anda.",
    },
  ];

  return (
    <section className="w-full px-4 py-16 sm:py-24 sm:px-10">
      <h2 className="text-3xl font-bold text-center mb-12">Semudah 3 Langkah</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {items.map((item) => (
          <div key={item.step} className="flex flex-col items-center text-center gap-4">
            <div className="flex items-center justify-center size-16 bg-primary rounded-full text-background-dark text-3xl font-bold">
              {item.step}
            </div>
            <p className="text-lg font-semibold">{item.title}</p>
            <p className="text-gray-400 text-sm font-normal">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
