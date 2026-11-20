export interface Project {
  title: string;
  /** Form ke dropdown ke liye GENERAL type — specific project ka naam
      nahi. Card ka button yahi type preselect karta hai. */
  type: string;
  description: string;
  benefit: string;
  tags: string[];
  gradient: string;
  /** Asal screenshot (public/ ke andar ka path) — ho to card par JSX mock
      ki jagah ye image lagti hai. */
  image?: string;
  /** Live demo aur GitHub repo ke links — sirf un projects ke liye jo
      publish ho chuke hain. */
  liveUrl?: string;
  repoUrl?: string;
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

/** Ahsan ka asal contact email (uske CV se) — inquiries isi par jati hain. */
export const contactEmail = "malikahsandevi@gmail.com";

/**
 * Web3Forms access key — form submit hone par inquiry seedha Ahsan ke
 * Gmail par jati hai. Ye key public hoti hai (site ke code mein lagti
 * hai), password nahi hai.
 */
export const web3formsAccessKey = "9618b3bb-f0e0-4a20-91b4-b83dbb382491";

/** Ahsan ke asal projects — uske CV se liye gaye, koi invented kaam nahi. */
export const projects: Project[] = [
  {
    title: "E-Commerce Platform",
    type: "E-Commerce Store",
    description: "Full-stack e-commerce platform with product management, authentication, cart, orders, reviews and an admin dashboard.",
    benefit: "A complete store, from browsing to orders",
    tags: ["MongoDB", "Express.js", "React.js", "Node.js"],
    gradient: "from-lime-400/30 via-emerald-500/10 to-transparent",
    image: "/images/projects/ecommerce-platform.jpg",
    liveUrl: "https://ecommerce-admin-teal.vercel.app",
    repoUrl: "https://github.com/malikahsandevi/ecommerce-platform",
  },
  {
    title: "Chrome Image Downloader",
    type: "Web Application",
    description: "Chrome extension for scanning, filtering, converting and downloading images from web pages.",
    benefit: "One-click image downloads from any page",
    tags: ["JavaScript", "HTML/CSS", "Chrome Extension"],
    gradient: "from-cyan-400/25 via-lime-500/10 to-transparent",
  },
  {
    title: "LeetCode User Finder",
    type: "Web Application",
    description: "Look up any LeetCode profile in a modern glass dashboard — solved progress ring, Easy/Medium/Hard bars, acceptance rate, ranking and reputation, with dark and light themes.",
    benefit: "Instant profiles and coding stats",
    tags: ["JavaScript", "REST API", "HTML/CSS"],
    gradient: "from-amber-400/25 via-lime-500/10 to-transparent",
    image: "/images/projects/leetcode-user-finder.jpg",
    liveUrl: "https://malikahsandevi.github.io/leetcode-user-finder/",
    repoUrl: "https://github.com/malikahsandevi/leetcode-user-finder",
  },
  {
    title: "Weather App",
    type: "Web Application",
    description: "Modern weather app with live data for any city — a sky theme that matches the actual weather, a °C/°F toggle and detailed wind, humidity, UV and pressure stats.",
    benefit: "Live weather, beautifully simple",
    tags: ["JavaScript", "REST API", "HTML/CSS"],
    gradient: "from-sky-400/25 via-lime-500/10 to-transparent",
    image: "/images/projects/weather-app.jpg",
    liveUrl: "https://malikahsandevi.github.io/weather-app/",
    repoUrl: "https://github.com/malikahsandevi/weather-app",
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

/**
 * Form ke dropdown ki GENERAL project types — koi specific project ya
 * niche nahi, aam categories jo har client samajhta hai.
 */
export const projectTypes: string[] = [
  "Business Website",
  "E-Commerce Store",
  "Portfolio Website",
  "Landing Page",
  "Web Application",
  "Dashboard / Admin Panel",
  "Blog / News Website",
  "Website Redesign",
  "Something Else",
];
