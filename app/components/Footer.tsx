export default function Footer() {
  return (
    <footer className="w-full max-w-[960px] border-t border-primary/20 mt-16">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 px-4 py-8 sm:px-10">
        <div className="flex items-center gap-3">
          <div className="size-7 text-primary">
            <img src="/logo.png" alt="klaimo logo" />
          </div>
          <p className="text-gray-400 text-sm font-normal">
            © 2024 Klaimo. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-6 text-sm font-normal">
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            Terms
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            Privacy
          </a>
        </div>
      </div>
    </footer>
  );
}
