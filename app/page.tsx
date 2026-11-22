import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import ContactModalLazy from "@/components/ContactModalLazy";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F7F9F4] font-body text-[#11150D] dark:bg-[#080A07] dark:text-[#F5F7F2]">
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <Benefits />
        <Projects />
        <Services />
        <About />
        <TechStack />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <ContactModalLazy />
    </div>
  );
}
