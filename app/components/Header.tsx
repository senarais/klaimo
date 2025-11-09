export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex w-full items-center justify-center border-b border-b-primary/20 bg-background-dark/80 px-4 py-3 backdrop-blur-sm sm:px-10">
    <div className="max-w-[960px] w-full flex items-center justify-between">
      <div className="flex items-center gap-4 text-white">
        <div className="size-8 text-primary">
          <img src="/logo.png" alt="klaimo logo" />
        </div>
        <h2 className="text-lg font-semibold">Klaimo</h2>
      </div>
      <a
        href="/analyze"
        className="flex h-10 px-4 items-center justify-center rounded-lg bg-primary text-background-dark text-sm font-bold hover:opacity-90 transition-opacity"
      >
        Mulai Analisis Gratis
      </a>
    </div>
    </header>
  );
}
