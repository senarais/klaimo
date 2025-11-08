export default function Cta() {
  return (
    <section className="w-full px-4 py-16 sm:py-24 sm:px-10" id="cta">
      <div className="bg-card-dark rounded-xl p-8 sm:p-12 text-center flex flex-col items-center gap-6 border border-primary/20">
        <h2 className="text-4xl font-bold leading-tight max-w-xl">
          Siap Mengurangi Risiko Klaim Ditolak?
        </h2>
        <p className="text-gray-400 max-w-2xl font-normal">
          Mulai analisis pertama Anda secara gratis dan rasakan kemudahan dalam mempersiapkan
          klaim JKN Anda. Tidak perlu kartu kredit.
        </p>
        <a
          href="#"
          className="flex h-12 px-5 items-center justify-center rounded-lg bg-primary text-background-dark text-base font-bold hover:opacity-90 transition-opacity"
        >
          Mulai Analisis Gratis
        </a>
      </div>
    </section>
  );
}
