export interface Project {
  title: string;
  description: string;
  benefit: string;
  tags: string[];
  gradient: string;
}

export interface Service {
  title: string;
  description: string;
  icon: string;
}

export interface TechItem {
  name: string;
  label: string;
  category: "frontend" | "animation" | "tools";
  categoryLabel: string;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export const navLinks: { label: string; href: string }[] = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export const standards: { title: string; description: string; icon: string }[] = [
  { title: "Clean, Type-Safe Code", description: "Typed, maintainable code that is easy to extend as your business grows.", icon: "Code2" },
  { title: "Performance First", description: "Fast load times and smooth interactions on every device.", icon: "Zap" },
  { title: "Fully Responsive", description: "A polished experience on phones, tablets and desktops alike.", icon: "Smartphone" },
  { title: "Clear Communication", description: "Simple, transparent updates from first discussion to launch.", icon: "MessagesSquare" },
];

export const projects: Project[] = [
  {
    title: "E-Commerce Store",
    description: "A modern storefront with product browsing, cart and a streamlined checkout flow.",
    benefit: "Built to turn visitors into customers",
    tags: ["Next.js", "Tailwind CSS", "TypeScript"],
    gradient: "from-lime-400/30 via-emerald-500/10 to-transparent",
  },
  {
    title: "Analytics Dashboard",
    description: "A data dashboard with clear charts and insights a business can act on quickly.",
    benefit: "Better insights, bigger growth",
    tags: ["Next.js", "Framer Motion", "TypeScript"],
    gradient: "from-cyan-400/25 via-lime-500/10 to-transparent",
  },
  {
    title: "Real Estate Platform",
    description: "A property platform with listings, search and enquiry flows for agents.",
    benefit: "More leads, more clients",
    tags: ["Next.js", "Tailwind CSS", "GSAP"],
    gradient: "from-amber-400/25 via-lime-500/10 to-transparent",
  },
];

export const services: Service[] = [
  { title: "Web Development", description: "Fast, scalable & secure websites built with Next.js and modern tooling.", icon: "Globe" },
  { title: "UI/UX Design", description: "Beautiful & user-friendly designs that keep visitors engaged.", icon: "PenTool" },
  { title: "Performance Optimization", description: "Lightning-fast websites that rank better and convert more.", icon: "Zap" },
  { title: "E-Commerce Solutions", description: "Online stores designed to turn visitors into customers.", icon: "ShoppingCart" },
  { title: "Web Applications", description: "Custom web apps tailored to exactly what your business needs.", icon: "Layers" },
  { title: "Maintenance & Support", description: "Keep your site secure, updated and always up-to-date.", icon: "Headphones" },
];

export const techStack: TechItem[] = [
  { name: "Next.js", label: "React framework", category: "frontend", categoryLabel: "Frontend" },
  { name: "Tailwind CSS", label: "Styling", category: "frontend", categoryLabel: "Frontend" },
  { name: "Framer Motion", label: "Animations", category: "animation", categoryLabel: "Animation & 3D" },
  { name: "GSAP", label: "Advanced animations", category: "animation", categoryLabel: "Animation & 3D" },
  { name: "Three.js", label: "3D visuals", category: "animation", categoryLabel: "Animation & 3D" },
  { name: "Lucide React", label: "Icons", category: "tools", categoryLabel: "Icons & Type Safety" },
  { name: "TypeScript", label: "Type safety", category: "tools", categoryLabel: "Icons & Type Safety" },
];

export const processSteps: ProcessStep[] = [
  { title: "Discuss", description: "Share your idea and goals" },
  { title: "Plan", description: "Get a tailored strategy and roadmap" },
  { title: "Design", description: "Review stunning designs" },
  { title: "Develop", description: "Bring it to life with clean code" },
  { title: "Launch", description: "Go live and grow together" },
];

export interface Testimonial {
  /** Quote split into the exact lines shown in Ahsan's reference design. */
  quoteLines: string[];
  name: string;
  role: string;
  initials: string;
}

/** Testimonials exactly as shown in Ahsan's reference design. */
export const testimonials: Testimonial[] = [
  {
    quoteLines: [
      "Working with this developer was an amazing experience!",
      "The website is fast, beautiful, and exactly what we needed.",
    ],
    name: "Sarah Johnson",
    role: "Business Owner",
    initials: "SJ",
  },
];

export const projectTypes: string[] = [
  "Business Website",
  "E-Commerce Store",
  "Analytics Dashboard",
  "Real Estate Platform",
  "Web Application",
  "Something Else",
];
