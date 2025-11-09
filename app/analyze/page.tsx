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

  const updateFormData = (field: string, value: string) =>
    setFormData((prev: any) => ({ ...prev, [field]: value }));

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      console.log("✅ data form:", formData);
      alert("Form berhasil dikirim (cek console).");
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  return (
    <>
    <Header />
    <section className="relative w-full min-h-screen flex flex-col justify-between px-6 sm:px-10 py-10 text-left">
      {/* === Main Content === */}
      <div className="flex flex-col lg:flex-row gap-12 flex-1">
        {/* 🧭 Sidebar Step Indicator */}
        <aside className="lg:w-1/3">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            Langkah Form
          </h2>

          <nav className="space-y-4">
            {steps.map((step, i) => (
              <div
                key={i}
                className={`flex items-center gap-4 text-lg transition-colors ${
                  i === currentStep
                    ? "text-primary font-semibold"
                    : i < currentStep
                    ? "text-green-500"
                    : "text-muted-foreground"
                }`}
              >
                <div
                  className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium ${
                    i === currentStep
                      ? "bg-primary text-primary-foreground"
                      : i < currentStep
                      ? "bg-green-500 text-white"
                      : "bg-border text-muted-foreground"
                  }`}
                >
                  {i < currentStep ? <Check size={18} /> : i + 1}
                </div>
                {step}
              </div>
            ))}
          </nav>
        </aside>

        {/* 🧾 Form Section */}
        <div className="flex-1 flex flex-col max-w-2xl">
          {currentStep > 0 && (
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-primary hover:text-primary/80 mb-8 transition-colors"
            >
              <ChevronLeft size={20} />
              Kembali
            </button>
          )}

          <div className="flex flex-col space-y-5">
            {renderStep(currentStep, formData, updateFormData)}
          </div>

          {/* === Progress Bar (dibawah form aja) === */}
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
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="mt-10 flex justify-end">
            <button
              onClick={handleNext}
              className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              {currentStep === steps.length - 1 ? "Submit" : "Lanjut"}
            </button>
          </div>
        </div>
      </div>
    </section>
    <Footer />
    </>
  );
}

/* =======================
   Step Renderer Function
======================= */
function renderStep(
  step: number,
  formData: any,
  updateFormData: (field: string, value: string) => void
) {
  const input = (label: string, field: string, type = "text") => (
    <div>
      <label className="block text-sm text-muted-foreground mb-1">{label}</label>
      <input
        type={type}
        value={formData[field] || ""}
        onChange={(e) => updateFormData(field, e.target.value)}
        className="w-full bg-card border border-border rounded-lg p-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
      />
    </div>
  );

  const select = (label: string, field: string, options: string[]) => (
    <div>
      <label className="block text-sm text-muted-foreground mb-1">{label}</label>
      <select
        value={formData[field] || ""}
        onChange={(e) => updateFormData(field, e.target.value)}
        className="w-full bg-card border border-border rounded-lg p-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
      >
        <option value="">Pilih...</option>
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
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
          {select("Surat Eligibilitas Peserta (SEP)", "suratEligibilitas", [
            "Ada",
            "Tidak Ada",
          ])}
          {select("Resume Medis", "resumeMedis", ["Ada", "Tidak Ada"])}
          {select("Kwitansi Biaya", "kwitansi", ["Ada", "Tidak Ada"])}
          {select("SPTM", "sptm", ["Ada", "Tidak Ada"])}
        </>
      );

    case 2:
      return (
        <>
          {input("Nama Penyakit", "namaPenyakit")}
          {select("Kondisi Darurat", "kondisiDarurat", ["Ya", "Tidak"])}
          {select("Penyebab", "penyebab", ["Kecelakaan", "Penyakit Biasa"])}
        </>
      );

    case 3:
      return (
        <>
          {select("Pertama kali periksa di FKTP?", "pertamaPeriksa", [
            "Ya",
            "Tidak",
          ])}
          {select("Punya surat rujukan?", "punyaRujukan", ["Ya", "Tidak"])}
          {input("Tanggal Rujukan", "tanggalRujukan", "date")}
          {input("Tanggal Pelayanan", "tanggalPelayanan", "date")}
          {select("Faskes sesuai wilayah?", "faskesSesuai", ["Ya", "Tidak"])}
        </>
      );

    case 4:
      return (
        <>
          {select("Status Kepesertaan Aktif?", "statusKepesertaan", [
            "Ya",
            "Tidak",
          ])}
          {select("Kelas Rawat Sesuai?", "kelasRawat", ["Ya", "Tidak"])}
          {select("Biaya sesuai tarif INA-CBG?", "biayaSesuai", ["Ya", "Tidak"])}
        </>
      );

    case 5:
      return (
        <>
          {select("Jenis Pelayanan", "jenisPelayanan", [
            "Rawat Jalan",
            "Rawat Inap",
            "Tindakan Operatif",
          ])}
          {select("Tindakan besar membutuhkan approval?", "tindakanBesar", [
            "Ya",
            "Tidak",
          ])}
        </>
      );

    default:
      return null;
  }
}
