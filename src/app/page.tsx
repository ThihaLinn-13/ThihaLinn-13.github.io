import { Certifications } from "@/components/certifications";
import { Contact } from "@/components/contact";
import { Education } from "@/components/education";
import { Experience } from "@/components/experience";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Intro } from "@/components/intro";
import { Navbar } from "@/components/navbar";
import { ScrollBackdrop } from "@/components/scroll-backdrop";
import { Skills } from "@/components/skills";

export default function Page() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <Intro />
      <ScrollBackdrop />

      <div className="relative z-10">
        <Navbar />
        <main className="mx-auto w-full max-w-5xl px-6">
          <Hero />
          <Skills />
          <Experience />
          <Education />
          <Certifications />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
