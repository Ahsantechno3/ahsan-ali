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
import ContactModal from "@/components/ContactModal";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F7F9F4] font-body text-[#11150D] dark:bg-[#080A07] dark:text-[#F5F7F2]">
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
      <ContactModal />
    </div>
  );
}
