import { Navbar } from "@/components/sections/Navbar";
import { HeroBackdrop } from "@/components/sections/HeroBackdrop";
import { Hero } from "@/components/sections/Hero";
import { Partners } from "@/components/sections/Partners";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { Cta } from "@/components/sections/Cta";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="relative">
      {/* Flowing hero lines sit behind the navbar + hero, at the page top */}
      <HeroBackdrop />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Partners />
        <WhyChooseUs />
        <Services />
        <Process />
        <Testimonials />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
