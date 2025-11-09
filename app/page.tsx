import Header from "./components/Header";
import Hero from "./components/Hero";
import Steps from "./components/Steps";
import Features from "./components/Features";
import UseCases from "./components/UseCases";
import Cta from "./components/Cta";
import Footer from "./components/Footer";
import Testimonials from "./components/Testimontials";
import FaqSection from "./components/Faq";

export default function Page() {
  return (
    <>
    <div className="relative w-full flex flex-col items-center font-display bg-background-light text-white antialiased">
      <Header />
        <Hero />
      <main className="w-full max-w-[960px] flex flex-col">
        <Steps />
        <Features />
        <UseCases />
        <Testimonials />
        <FaqSection />
        <Cta />
      </main>
      <Footer />
    </div>
    </>
  );
}
