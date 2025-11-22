"use client";

import { useState } from "react";
import { ChevronLeft, Check } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const steps = [
  "Data Diri",
  "Kelengkapan Dokumen",
  "Jenis Penyakit",
  "Alur Rujukan",
  "Status Kepesertaan",
  "Jenis Pelayanan",
];

export default function KlaimFormPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<any>({});
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateFormData = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[field];
      return copy;
    });
  };

  // validasi per step (opsi A - ketat)
  const validateStep = (stepIndex: number) => {
    const e: Record<string, string> = {};

    // helper
    const isEmpty = (v: any) =>
      v === undefined || v === null || (typeof v === "string" && v.trim() === "");

    switch (stepIndex) {
      case 0: // Data Diri
        if (isEmpty(formData.namaLengkap)) e.namaLengkap = "Nama lengkap wajib diisi.";
        if (isEmpty(formData.nomorBpjs)) e.nomorBpjs = "Nomor BPJS wajib diisi.";
        if (isEmpty(formData.tanggalLahir)) e.tanggalLahir = "Tanggal lahir wajib diisi.";
        if (isEmpty(formData.jenisKelamin)) e.jenisKelamin = "Pilih jenis kelamin.";
        if (formData.nomorHp && !/^\+?\d{7,15}$/.test(formData.nomorHp))
          e.nomorHp = "Nomor HP tidak valid (masukkan nomor tanpa spasi).";
        break;

      case 1: // Kelengkapan Dokumen
        [
          "suratRujukan",
          "suratEligibilitas",
          "resumeMedis",
          "kwitansi",
          "sptm",
        ].forEach((k) => {
          if (isEmpty(formData[k])) e[k] = "Pilih ada/tidak ada.";
        });
        break;

      case 2: // Jenis Penyakit + tambahan input yang kita tambahkan
        if (isEmpty(formData.namaPenyakit)) e.namaPenyakit = "Isi nama penyakit atau keluhan.";
        if (isEmpty(formData.kondisiDarurat)) e.kondisiDarurat = "Pilih apakah ini darurat.";
        if (isEmpty(formData.penyebab)) e.penyebab = "Pilih penyebab.";
        // tambahan: kronologi singkat wajib sederhana
        if (isEmpty(formData.kronologi)) e.kronologi = "Tulis kronologi singkat (1-2 baris).";
        // riwayat penyakit: kalau pilih "Ya", wajib isi penjelasan singkat
        if (formData.riwayatPenyakit === undefined) e.riwayatPenyakit = "Pilih ya/tidak.";
        if (formData.riwayatPenyakit === "Ya" && isEmpty(formData.riwayatPenyakitDetail))
          e.riwayatPenyakitDetail = "Jelaskan singkat riwayat penyakit.";
        break;

      case 3: // Alur Rujukan
        if (isEmpty(formData.pertamaPeriksa)) e.pertamaPeriksa = "Pilih lokasi pemeriksaan pertama.";
        if (isEmpty(formData.punyaRujukan)) e.punyaRujukan = "Pilih apakah ada rujukan.";
        if (formData.punyaRujukan === "Ya" && isEmpty(formData.tanggalRujukan))
          e.tanggalRujukan = "Isi tanggal rujukan.";
        if (isEmpty(formData.tanggalPelayanan)) e.tanggalPelayanan = "Isi tanggal pelayanan.";
        if (isEmpty(formData.faskesSesuai)) e.faskesSesuai = "Pilih apakah faskes sesuai.";
        // jika punya rujukan: perlu nama faskes perujuk
        if (formData.punyaRujukan === "Ya" && isEmpty(formData.faskesPerujuk))
          e.faskesPerujuk = "Sebutkan nama faskes perujuk (opsional tapi dianjurkan).";
        break;

      case 4: // Status Kepesertaan
        if (isEmpty(formData.statusKepesertaan)) e.statusKepesertaan = "Pilih status kepesertaan.";
        if (formData.statusKepesertaan === "Ya" && formData.tanggalIuranTerakhir) {
          // pastikan tanggal iuran <= tanggal pelayanan jika ada
          if (formData.tanggalPelayanan && formData.tanggalIuranTerakhir > formData.tanggalPelayanan) {
            e.tanggalIuranTerakhir = "Tanggal iuran terakhir tidak bisa setelah tanggal pelayanan.";
          }
        }
        if (isEmpty(formData.kelasHak)) e.kelasHak = "Pilih kelas hak BPJS.";
        // biaya fields harus number jika diisi
        if (formData.totalBiaya !== undefined && formData.totalBiaya !== "") {
          if (Number.isNaN(Number(formData.totalBiaya))) e.totalBiaya = "Masukkan angka untuk total biaya.";
          if (Number(formData.totalBiaya) < 0) e.totalBiaya = "Total biaya harus >= 0.";
        }
        if (formData.jumlahDitagihkan !== undefined && formData.jumlahDitagihkan !== "") {
          if (Number.isNaN(Number(formData.jumlahDitagihkan))) e.jumlahDitagihkan = "Masukkan angka untuk jumlah ditagihkan.";
          if (Number(formData.jumlahDitagihkan) < 0) e.jumlahDitagihkan = "Jumlah ditagihkan harus >= 0.";
        }
        break;

      case 5: // Jenis Pelayanan
        if (isEmpty(formData.jenisPelayanan)) e.jenisPelayanan = "Pilih jenis pelayanan.";
        if (isEmpty(formData.tindakanBesar)) e.tindakanBesar = "Pilih apakah tindakan besar memerlukan approval.";
        if (isEmpty(formData.namaDokter)) e.namaDokter = "Masukkan nama dokter penanggung jawab.";
        if (isEmpty(formData.pernahDirawat)) e.pernahDirawat = "Pilih apakah pasien pernah dirawat sebelumnya.";
        break;

      default:
        break;
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = async () => {
    // check validation for current step
    const ok = validateStep(currentStep);
    if (!ok) {
      // jangan lanjut
      return;
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
      return;
    }

    // final submit (validasi full)
    // validate all steps quickly
    let allOk = true;
    for (let i = 0; i < steps.length; i++) {
      const valid = validateStep(i);
      if (!valid) {
        allOk = false;
        setCurrentStep(i);
        break;
      }
    }
    if (!allOk) return;

    // Submit ke backend
    try {
      setLoading(true);
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      // backend format: { result: {...} } or direct
      const got = data.result ?? data;
      setResult(got);
    } catch (err) {
      console.error(err);
      // gunakan inline error pada form jika perlu (tetap jangan alert)
      setErrors((prev) => ({ ...prev, submit: "Gagal mengirim data. Cek koneksi atau coba lagi." }));
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  // ======================================================
  //   JIKA SUDAH ADA HASIL
  // ======================================================
  if (result) {
    return (
      <>
        <Header />
        <section className="min-h-screen px-6 sm:px-10 py-16">
          <div className="max-w-2xl mx-auto bg-card border border-border rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6">Hasil Analisis Klaim</h2>

            {/* STATUS */}
            <p className="text-lg mb-2 font-medium">
              Status Prediksi:
              <span
                className={`font-bold ${
                  result.status === "Diterima"
                    ? "text-green-600"
                    : result.status === "Ditolak"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                {" "}
                {result.status}
              </span>
            </p>

            {/* SCORE */}
            <p className="text-sm text-muted-foreground mb-6">
              Tingkat Risiko Penolakan:
              <span className="font-semibold text-foreground"> {result.score}/100</span>
            </p>

            {/* FEEDBACK */}
            <h3 className="font-semibold mb-2">Alasan Penilaian:</h3>
            <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground mb-6">
              {(result.feedback || []).map((f: string, i: number) => (
                <li key={i}>{f}</li>
              ))}
            </ul>

            {/* SUGGESTIONS */}
            <h3 className="font-semibold mb-2">Saran Perbaikan:</h3>
            <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground mb-6">
              {(result.suggestions || []).map((s: string, i: number) => (
                <li key={i}>{s}</li>
              ))}
            </ul>

            <button
              onClick={() => {
                setResult(null);
                setCurrentStep(0);
                setFormData({});
                setErrors({});
              }}
              className="mt-8 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition"
            >
              Isi Form Baru
            </button>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  // ======================================================
  //   RENDER FORM
  // ======================================================
  return (
    <>
      <Header />

      <section className="relative w-full min-h-screen flex flex-col justify-between px-6 sm:px-10 py-10 text-left">
        <div className="flex flex-col lg:flex-row gap-12 flex-1">
          {/* Sidebar steps */}
          <aside className="lg:w-1/3">
            <h2 className="text-3xl font-bold text-foreground mb-8">Langkah Form</h2>

            <nav className="space-y-4">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-4 text-lg transition-colors ${
                    i === currentStep ? "text-primary font-semibold" : i < currentStep ? "text-green-500" : "text-muted-foreground"
                  }`}
                >
                  <div
                    className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium ${
                      i === currentStep ? "bg-primary text-primary-foreground" : i < currentStep ? "bg-green-500 text-white" : "bg-border text-muted-foreground"
                    }`}
                  >
                    {i < currentStep ? <Check size={18} /> : i + 1}
                  </div>
                  {step}
                </div>
              ))}
            </nav>
          </aside>

          {/* FORM */}
          <div className="flex-1 flex flex-col max-w-2xl">
            {currentStep > 0 && (
              <button onClick={handleBack} className="flex items-center gap-2 text-primary hover:text-primary/80 mb-8 transition-colors">
                <ChevronLeft size={20} />
                Kembali
              </button>
            )}

            <div className="flex flex-col space-y-5">
              {renderStep(currentStep, formData, updateFormData, errors)}
            </div>

            {/* Progress */}
            <div className="mt-10">
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                <span>Progress</span>
                <span>
                  {currentStep + 1} dari {steps.length}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div
                  className="bg-primary h-3 rounded-full transition-all duration-300"
                  style={{
                    width: `${((currentStep + 1) / steps.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            {errors.submit && <p className="text-sm text-red-500 mt-3">{errors.submit}</p>}

            <div className="mt-10 flex justify-end">
              <button
                disabled={loading}
                onClick={handleNext}
                className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors disabled:opacity-60"
              >
                {loading ? "Memproses..." : currentStep === steps.length - 1 ? "Submit" : "Lanjut"}
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

/* ====================================================
   FORM STEP RENDER
   - tambahin field baru: kronologi, riwayat penyakit, kontak, nama dokter,
     totalBiaya, jumlahDitagihkan, lamaPerawatan, komorbid, kelasHak, tanggalIuranTerakhir, dll.
   - jangan ubah styling
==================================================== */
function renderStep(
  step: number,
  formData: any,
  updateFormData: (field: string, value: any) => void,
  errors: Record<string, string>
) {
  const input = (label: string, field: string, type: string = "text", props: any = {}) => (
    <div>
      <label className="block text-sm text-muted-foreground mb-1">{label}</label>
      <input
        type={type}
        value={formData[field] ?? ""}
        onChange={(e) => updateFormData(field, type === "number" ? e.target.value : e.target.value)}
        className="w-full bg-card border border-border rounded-lg p-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        {...props}
      />
      {errors[field] && <p className="text-sm text-red-500 mt-1">{errors[field]}</p>}
    </div>
  );

  const textarea = (label: string, field: string, props: any = {}) => (
    <div>
      <label className="block text-sm text-muted-foreground mb-1">{label}</label>
      <textarea
        value={formData[field] ?? ""}
        onChange={(e) => updateFormData(field, e.target.value)}
        className="w-full bg-card border border-border rounded-lg p-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
        rows={4}
        {...props}
      />
      {errors[field] && <p className="text-sm text-red-500 mt-1">{errors[field]}</p>}
    </div>
  );

  const select = (label: string, field: string, options: string[]) => (
    <div>
      <label className="block text-sm text-muted-foreground mb-1">{label}</label>
      <select
        value={formData[field] ?? ""}
        onChange={(e) => updateFormData(field, e.target.value)}
        className="w-full bg-card border border-border rounded-lg p-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
      >
        <option value="">Pilih...</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {errors[field] && <p className="text-sm text-red-500 mt-1">{errors[field]}</p>}
    </div>
  );

  const radioGroup = (label: string, field: string, options: string[]) => (
    <div>
      <label className="block text-sm text-muted-foreground mb-1">{label}</label>
      <div className="flex gap-4 flex-wrap">
        {options.map((opt) => (
          <label key={opt} className="flex items-center p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <input
              type="radio"
              name={field}
              value={opt}
              checked={formData[field] === opt}
              onChange={(e) => updateFormData(field, e.target.value)}
              className="mr-2"
            />
            {opt}
          </label>
        ))}
      </div>
      {errors[field] && <p className="text-sm text-red-500 mt-1">{errors[field]}</p>}
    </div>
  );

  switch (step) {
    case 0:
      return (
        <>
          {input("Nama Lengkap", "namaLengkap")}
          {input("Nomor BPJS", "nomorBpjs")}
          {input("Tanggal Lahir", "tanggalLahir", "date")}
          {select("Jenis Kelamin", "jenisKelamin", ["Laki-laki", "Perempuan"])}
        </>
      );

    case 1:
      return (
        <>
          {select("Surat Rujukan", "suratRujukan", ["Ada", "Tidak Ada"])}
          {select("SEP (Surat Eligibilitas Peserta)", "suratEligibilitas", ["Ada", "Tidak Ada"])}
          {select("Resume Medis", "resumeMedis", ["Ada", "Tidak Ada"])}
          {select("Kwitansi Biaya", "kwitansi", ["Ada", "Tidak Ada"])}
          {select("SPTM", "sptm", ["Ada", "Tidak Ada"])}
        </>
      );

    case 2:
      return (
        <>
          {input("Nama Penyakit / Keluhan Utama", "namaPenyakit")}
          {radioGroup("Apakah Kondisi Darurat?", "kondisiDarurat", ["Ya", "Tidak"])}
          {select("Penyebab", "penyebab", ["Kecelakaan", "Penyakit Biasa", "Komplikasi"])}
          {textarea("Kronologi Singkat (jelaskan 1-3 kalimat)", "kronologi")}
          <div>
            <label className="block text-sm text-muted-foreground mb-1">Riwayat Penyakit Sebelumnya?</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="riwayatPenyakit"
                  value="Ya"
                  checked={formData.riwayatPenyakit === "Ya"}
                  onChange={(e) => updateFormData("riwayatPenyakit", e.target.value)}
                  className="mr-2"
                />
                Ya
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="riwayatPenyakit"
                  value="Tidak"
                  checked={formData.riwayatPenyakit === "Tidak"}
                  onChange={(e) => updateFormData("riwayatPenyakit", e.target.value)}
                  className="mr-2"
                />
                Tidak
              </label>
            </div>
            {errors.riwayatPenyakit && <p className="text-sm text-red-500 mt-1">{errors.riwayatPenyakit}</p>}
          </div>
          {formData.riwayatPenyakit === "Ya" && (
            <>
              {textarea("Jelaskan singkat riwayat penyakit", "riwayatPenyakitDetail")}
            </>
          )}
        </>
      );

    case 3:
      return (
        <>
          {select("Pertama kali periksa di FKTP?", "pertamaPeriksa", ["Ya", "Tidak"])}
          {select("Punya surat rujukan?", "punyaRujukan", ["Ya", "Tidak"])}
          {formData.punyaRujukan === "Ya" && input("Nama Faskes Perujuk (opsional tapi disarankan)", "faskesPerujuk")}
          {input("Tanggal Rujukan", "tanggalRujukan", "date")}
          {input("Tanggal Pelayanan", "tanggalPelayanan", "date")}
          {select("Faskes sesuai wilayah?", "faskesSesuai", ["Ya", "Tidak"])}
        </>
      );

    case 4:
      return (
        <>
          {select("Status Kepesertaan Aktif?", "statusKepesertaan", ["Ya", "Tidak", "Tidak Tahu"])}
          {select("Jenis Peserta (opsional)", "jenisPeserta", ["Mandiri", "PBI", "Perusahaan", "Lainnya"])}
          {input("Tanggal iuran terakhir (opsional)", "tanggalIuranTerakhir", "date")}
          {select("Kelas hak BPJS", "kelasHak", ["Kelas I", "Kelas II", "Kelas III"])}
          {input("Kelas kamar yang dipakai (opsional)", "kelasKamar")}
          {input("Total biaya (Rp) (opsional)", "totalBiaya", "number", { min: 0 })}
          {input("Jumlah yang ditagihkan ke BPJS (Rp) (opsional)", "jumlahDitagihkan", "number", { min: 0 })}
          {input("Lama perawatan (hari) (opsional)", "lamaPerawatan", "number", { min: 0 })}
          {textarea("Komplikasi / kondisi penyerta (opsional)", "komorbid")}
        </>
      );

    case 5:
      return (
        <>
          {select("Jenis Pelayanan", "jenisPelayanan", ["Rawat Jalan", "Rawat Inap", "Tindakan Operatif", "Persalinan", "Lainnya"])}
          {select("Apakah ada tindakan besar yang butuh approval?", "tindakanBesar", ["Ya", "Tidak"])}
          {input("Nama dokter penanggung jawab", "namaDokter")}
          <div>
            <label className="block text-sm text-muted-foreground mb-1">Pernah dirawat sebelumnya di fasilitas yang sama?</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="pernahDirawat"
                  value="Ya"
                  checked={formData.pernahDirawat === "Ya"}
                  onChange={(e) => updateFormData("pernahDirawat", e.target.value)}
                  className="mr-2"
                />
                Ya
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="pernahDirawat"
                  value="Tidak"
                  checked={formData.pernahDirawat === "Tidak"}
                  onChange={(e) => updateFormData("pernahDirawat", e.target.value)}
                  className="mr-2"
                />
                Tidak
              </label>
            </div>
            {errors.pernahDirawat && <p className="text-sm text-red-500 mt-1">{errors.pernahDirawat}</p>}
          </div>
        </>
      );

    default:
      return null;
  }
}
