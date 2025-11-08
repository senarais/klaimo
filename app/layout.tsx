import "./globals.css";
import type { ReactNode } from "react";
import Head from "next/head";

export const metadata = {
  title: "Klaimo - Prediksi Akurasi Klaim BPJS Anda",
  description:
    "Klaimo adalah asisten AI yang membantu Anda memprediksi akurasi klaim JKN untuk mengurangi risiko penolakan.",
  icons: {
    icon: "/logo.png", // favicon utama
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" className="dark">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* ✅ Font Geist */}
        <link
          href="https://cdn.jsdelivr.net/npm/@fontsource/geist@5.0.0/index.min.css"
          rel="stylesheet"
        />
        {/* Material Icons */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
      </Head>

      <body className="font-[Geist,sans-serif] bg-[--color-background-light] text-white antialiased">
        <div className="relative flex flex-col items-center w-full">
          {children}
        </div>
      </body>
    </html>
  );
}
