import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ContactModalLazy from "@/components/ContactModalLazy";
import ScrollProgress from "@/components/ScrollProgress";

// Perf (round 2): below-the-fold sections apni alag JS chunks mein
// split hain. SSR HTML bilkul waisa hi rehta hai (SEO + koi flash
// nahi), lekin client par in ki JS main bundle ke saath aik hi bare
// parse/hydrate task mein nahi aati — initial TBT kam hota hai.
// Upar wale (Header/Hero) eager rehte hain kyun ke wohi pehla paint
// aur LCP hain.
const Benefits = dynamic(() => import("@/components/Benefits"));
const Projects = dynamic(() => import("@/components/Projects"));
const Services = dynamic(() => import("@/components/Services"));
const About = dynamic(() => import("@/components/About"));
const TechStack = dynamic(() => import("@/components/TechStack"));
const Process = dynamic(() => import("@/components/Process"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const Contact = dynamic(() => import("@/components/Contact"));
const Footer = dynamic(() => import("@/components/Footer"));

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
