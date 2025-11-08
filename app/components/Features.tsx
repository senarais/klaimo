export default function Features() {
  const features = [
    {
      icon: "psychology",
      title: "Prediksi Kelayakan",
      desc: "Analisis mendalam untuk memprediksi kemungkinan klaim Anda disetujui.",
    },
    {
      icon: "checklist",
      title: "Validator Dokumen",
      desc: "Memeriksa kelengkapan dan potensi kesalahan pada dokumen pendukung.",
    },
    {
      icon: "route",
      title: "Triase Jalur Layanan",
      desc: "Memberikan rekomendasi jalur layanan yang paling sesuai dengan kondisi Anda.",
    },
  ];

  return (
    <section className="w-full px-4 py-16 sm:py-24 sm:px-10">
      <h2 className="text-3xl font-bold text-center mb-12">Didukung oleh AI Cerdas</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((item) => (
          <div
            key={item.title}
            className="flex flex-col gap-4 p-6 bg-card-dark rounded-xl border border-primary/20"
          >
            <span className="material-symbols-outlined text-primary text-3xl">
              {item.icon}
            </span>
            <div>
              <p className="text-lg font-semibold">{item.title}</p>
              <p className="text-gray-400 text-sm font-normal">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
