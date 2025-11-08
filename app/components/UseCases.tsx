export default function UseCases() {
  return (
    <section className="w-full px-4 py-16 sm:py-24 sm:px-10">
      <h2 className="text-3xl font-bold text-center mb-12">Satu Aplikasi, Dua Pengguna</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 bg-card-dark rounded-xl border border-primary/20">
          <h3 className="text-xl font-semibold mb-4">Untuk Peserta JKN</h3>
          <ul className="space-y-3 text-gray-400 list-disc list-inside font-normal">
            <li>Mengurangi kecemasan saat menunggu hasil klaim.</li>
            <li>Mendapat kepastian lebih awal sebelum pengajuan resmi.</li>
            <li>Memahami potensi masalah dan memperbaikinya.</li>
            <li>Meningkatkan peluang klaim diterima.</li>
          </ul>
        </div>
        <div className="p-8 bg-card-dark rounded-xl border border-primary/20">
          <h3 className="text-xl font-semibold mb-4">Untuk Fasilitas Kesehatan</h3>
          <ul className="space-y-3 text-gray-400 list-disc list-inside font-normal">
            <li>Mempercepat proses verifikasi internal.</li>
            <li>Mengurangi jumlah klaim yang ditolak (pending).</li>
            <li>Meningkatkan efisiensi administrasi klaim.</li>
            <li>Mengoptimalkan arus kas rumah sakit.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
